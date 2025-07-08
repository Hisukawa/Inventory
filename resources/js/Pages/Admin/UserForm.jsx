import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function UserForm() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "guest",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const passwordRules =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()#^+=])[A-Za-z\d@$!%*?&()#^+=]{8,}$/;

        if (data.name.trim().length < 3) {
            Swal.fire({
                icon: "warning",
                title: "Invalid Name",
                text: "Name must be at least 3 characters long.",
            });
            return;
        }

        if (!passwordRules.test(data.password)) {
            Swal.fire({
                icon: "error",
                title: "Weak Password",
                text: "Password must be at least 8 characters long and include uppercase (A), lowercase (a), number (1), and special character (#).",
            });
            return;
        }

        post("/admin/users", {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                Swal.fire({
                    icon: "success",
                    title: "User Created",
                    text: "User has been successfully added!",
                    timer: 2000,
                    showConfirmButton: false,
                });
            },
        });
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 items-center gap-2 px-4 border-b bg-white">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-6 mx-3" />
                    <h1 className="text-xl font-semibold">Create User</h1>
                </header>

                <main className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label>Name</label>
                            <input
                                type="text"
                                className="w-full border px-3 py-2"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="mb-3">
                            <label>Email</label>
                            <input
                                type="email"
                                className="w-full border px-3 py-2"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="mb-3">
                            <label>Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full border px-3 py-2"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                        </div>

                        <div className="mb-3">
                            <label>Confirm Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full border px-3 py-2"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* ✅ Show Password Toggle */}
                        <div className="mb-4">
                            <label className="inline-flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={showPassword}
                                    onChange={() =>
                                        setShowPassword(!showPassword)
                                    }
                                />
                                <span className="text-sm text-gray-700">
                                    Show Password
                                </span>
                            </label>
                        </div>

                        <div className="mb-3">
                            <label>Role</label>
                            <select
                                className="w-full border px-3 py-2"
                                value={data.role}
                                onChange={(e) =>
                                    setData("role", e.target.value)
                                }
                            >
                                <option value="admin">Admin</option>
                                <option value="faculty">Faculty</option>
                                <option value="technician">Technician</option>
                                <option value="guest">Guest</option>
                            </select>
                            {errors.role && (
                                <p className="text-red-500 text-sm">
                                    {errors.role}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        >
                            Create User
                        </button>
                    </form>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}

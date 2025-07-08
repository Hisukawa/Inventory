// resources/js/Pages/Admin/UserList.jsx

import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2"; // ✅ import SweetAlert2

import { AppSidebar } from "@/components/app-sidebar";
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
} from "@/components/ui/breadcrumb";

export default function UserList({ users, authUserId }) {
    const handleDelete = (id, name) => {
        Swal.fire({
            title: `Delete ${name}?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/admin/users/${id}`, {
                    onSuccess: () => {
                        Swal.fire(
                            "Deleted!",
                            "User has been deleted.",
                            "success"
                        );
                    },
                });
            }
        });
    };

    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset>
                <header className="flex h-16 items-center gap-2 px-4 border-b bg-white">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-6 mx-3" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/admin/users/list">
                                    User Accounts
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                <main className="w-full px-6 py-10 bg-white rounded shadow overflow-x-auto">
                    <h1 className="text-2xl font-bold mb-6">User Accounts</h1>

                    {users.length === 0 ? (
                        <p className="text-gray-600">No users found.</p>
                    ) : (
                        <table className="min-w-full border text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">Email</th>
                                    <th className="border px-4 py-2">Role</th>
                                    <th className="border px-4 py-2 text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr
                                        key={user.id}
                                        className={`hover:bg-gray-50 ${
                                            user.id === authUserId
                                                ? "bg-yellow-100 font-semibold"
                                                : ""
                                        }`}
                                    >
                                        <td className="border px-4 py-2">
                                            {index + 1}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {user.name}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {user.email}
                                        </td>
                                        <td className="border px-4 py-2 capitalize">
                                            {user.role}
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            <div className="flex justify-center items-center gap-10">
                                                <a
                                                    href={`/admin/users/${user.id}/edit`}
                                                    className="text-blue-600 hover:text-blue-800"
                                                    title="Edit"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </a>
                                                {user.id !== authUserId && (
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                user.id,
                                                                user.name
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-800"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}

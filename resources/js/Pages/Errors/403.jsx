import { useEffect } from "react";
import Swal from "sweetalert2";
import { router, usePage } from "@inertiajs/react";

export default function Error403() {
    const { errorMessage } = usePage().props;

    useEffect(() => {
        Swal.fire({
            icon: "error",
            title: "Access Denied",
            text: errorMessage || "You are not authorized to access this page.",
        }).then(() => {
            router.visit("/"); // Or redirect wherever you want
        });
    }, []);

    return null;
}

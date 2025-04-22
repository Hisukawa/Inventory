// ====================================================================
//                          DEFAULT DASHBOARD
// ====================================================================

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

// ====================================================================

export default function Page() {
    // export default function Dashboard() {
    return (
        // ============================================================
        //                  DEFAULT DASHBOARD
        // ============================================================

        <AuthenticatedLayout header={<h2> Dashboard </h2>}>
            <Head />
        </AuthenticatedLayout>

        // ============================================================
    );
}

import { checkSession } from "../../lib/auth-actions";
import AdminDashboard from "../../components/AdminDashboard";

export default async function AdminPage() {
    // This check runs ONLY on the server
    const isAuthenticated = await checkSession();

    return (
        <AdminDashboard initiallyAuthenticated={isAuthenticated} />
    );
}

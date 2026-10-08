import { getSessions } from "@/lib/api/sessions";

export default async function SessionsPage() {
    const response = await getSessions();

    console.log(response);

    return (
        <main>
            <h1>Sessions</h1>
        </main>
    );
}
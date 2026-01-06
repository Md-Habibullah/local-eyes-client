import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex h-screen items-center justify-center flex-col gap-4">
            <h1 className="text-3xl font-bold">404</h1>
            <p>Page not found</p>
            <Link href="/" className="text-primary underline">
                Go Home
            </Link>
        </div>
    );
}

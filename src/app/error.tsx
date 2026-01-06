"use client";

export default function GlobalError({ error }: { error: Error }) {
    return (
        <div className="flex h-screen items-center justify-center flex-col gap-2">
            <h2 className="text-xl font-semibold">Something went wrong</h2>
            <p className="text-muted-foreground">{error.message}</p>
        </div>
    );
}

export const dynamic = "force-dynamic";
export default function AccessDenied() {
    return (
        <div className="flex h-full items-center justify-center">
            <p className="text-red-500 font-medium">
                You are not allowed to access this page
            </p>
        </div>
    );
}
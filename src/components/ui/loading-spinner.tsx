// components/ui/loading-spinner.tsx

export default function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center min-h-50">
            <div className="relative">
                <div className="h-12 w-12 rounded-full border-4 border-primary/20"></div>
                <div className="absolute top-0 left-0 h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
        </div>
    );
}
export default function HeroSectionSkeleton() {
    return (
        <div className="relative min-h-[90vh] flex items-center justify-center bg-muted animate-pulse">
            <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/10 to-transparent" />
            <div className="relative z-10 container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="h-16 bg-white/20 rounded-lg mb-8 w-3/4 mx-auto" />
                    <div className="h-6 bg-white/20 rounded-lg mb-12 w-1/2 mx-auto" />
                    <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                        <div className="h-12 bg-white/20 rounded-lg mb-4" />
                        <div className="h-12 bg-white/20 rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
}
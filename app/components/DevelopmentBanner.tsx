export default function DevelopmentBanner() {
    return (
        <div className="bg-gradient-to-b from-amber-400 to-orange-400 px-4 py-3">
            <div className="mx-auto max-w-7xl">
                <div className="flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-amber-900 font-medium">
                            <span className="sm:hidden">
                                🚧 IS TimeTracker IS growing! New features are
                                coming soon.
                            </span>
                            <span className="hidden sm:inline lg:hidden">
                                🚧 IS TimeTracker IS still in development and
                                improving! New features are coming soon.
                            </span>
                            <span className="hidden lg:inline">
                                🚧 Welcome to IS TimeTracker! This app IS still
                                in development and actively improving. Exciting
                                new features are coming soon!
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

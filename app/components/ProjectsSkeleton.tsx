import ListContainer from "./ui/ListContainer";

export const ProjectsSkeleton = () => {
    return (
        <ListContainer>
            {[...Array(5)].map((_, index) => (
                <div
                    key={index}
                    className="flex items-center gap-2 pl-4 pr-2 py-2"
                >
                    <div className="flex animate-pulse items-center gap-3 w-full">
                        <div className="size-5 rounded bg-gray-200 dark:bg-gray-700">
                        </div>

                        <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-700">
                        </div>

                        <div className="ml-auto size-10 rounded-full bg-gray-200 dark:bg-gray-700">
                        </div>
                    </div>
                </div>
            ))}
        </ListContainer>
    );
};

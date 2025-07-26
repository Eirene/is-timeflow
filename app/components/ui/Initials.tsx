interface InitialsProps {
    name: string;
}

export default function Initials({ name }: InitialsProps) {
    const initials = name
        .split(" ")
        .slice(0, 2)
        .map((word) => word[0])
        .join("");

    return (
        <div className="size-10 rounded-full flex justify-center shrink-0 items-center bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200 uppercase">
            {initials}
        </div>
    );
}

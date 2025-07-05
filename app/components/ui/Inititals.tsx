export default function Initials({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="size-10 rounded-full flex justify-center shrink-0 items-center bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200 uppercase">
            {children}
        </div>
    );
}

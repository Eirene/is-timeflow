export default function ListItem({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex items-center gap-2 pl-4 pr-2 py-2 hover:bg-gray-50 dark:hover:bg-slate-700">
            {children}
        </div>
    );
}

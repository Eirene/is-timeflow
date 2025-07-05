export default function ListContainer({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-white dark:bg-slate-800 py-2 rounded-3xl space-y-2 overflow-hidden">
            {children}
        </div>
    );
}

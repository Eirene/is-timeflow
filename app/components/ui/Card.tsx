export default function Card({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="rounded-full p-2 bg-white dark:bg-slate-800">
            {children}
        </div>
    );
}

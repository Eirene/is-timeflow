"use client";

import React from "react";

type ButtonIconProps = {
    onClick?: () => void;
    children: React.ReactNode;
    color?: "gray" | "sky" | "red";
    title?: string;
    disabled?: boolean;
};

export const ButtonIcon = ({
    onClick,
    children,
    color = "sky",
    title,
    disabled = false,
}: ButtonIconProps) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            title={title}
            className={`cursor-pointer p-2 size-10 rounded-full flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent 
                ${
                color === "gray"
                    ? "text-gray-400 hover:bg-sky-50 dark:text-gray-500 dark:hover:bg-slate-700"
                    : color === "sky"
                    ? "text-sky-600 hover:text-sky-800 hover:bg-sky-50 dark:text-sky-400 dark:hover:text-sky-300 dark:hover:bg-slate-700"
                    : "text-gray-400 hover:bg-red-100 hover:text-red-600 dark:text-gray-500 dark:hover:bg-red-900/20 dark:hover:text-red-400"
            }`}
        >
            {children}
        </button>
    );
};

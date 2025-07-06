"use client";

import React from "react";

type ButtonIconProps = {
    onClick?: () => void;
    children: React.ReactNode;
};

export const ButtonIcon = ({
    onClick,
    children,
}: ButtonIconProps) => {
    return (
        <button
            onClick={onClick}
            className="cursor-pointer p-2 size-10 rounded-full flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent text-gray-400 hover:bg-red-100 hover:text-red-600 dark:text-gray-500 dark:hover:bg-red-900/20 dark:hover:text-red-400"
        >
            {children}
        </button>
    );
};

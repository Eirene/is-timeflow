"use client";
import React from "react";

type ButtonProps = {
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    children: React.ReactNode;
    disabled?: boolean;
};

export const Button = ({
    type = "button",
    onClick,
    children,
    disabled = false,
}: ButtonProps) => {
    return (
        <button
            disabled={disabled}
            type={type}
            onClick={onClick}
            className="cursor-pointer rounded-3xl bg-sky-600 hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400 px-5 py-2.5 text-base font-medium text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 dark:focus-visible:outline-sky-400
            transition-colors disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed"
        >
            {children}
        </button>
    );
};

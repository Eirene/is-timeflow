"use client";

import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ type = "text", placeholder, onChange, ...props }, ref) => {
        return (
            <input
                type={type}
                placeholder={placeholder}
                ref={ref}
                onChange={onChange}
                className="block w-full rounded-3xl bg-white dark:bg-slate-800 px-4 py-2.5 text-base text-gray-900 dark:text-gray-100 outline-1 -outline-offset-1 outline-gray-200 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 dark:focus:outline-sky-400 sm:text-sm/6"
                {...props}
            />
        );
    },
);

Input.displayName = "Input";

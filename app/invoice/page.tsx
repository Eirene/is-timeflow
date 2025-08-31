"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { generatePDF } from "../hooks/pdfGenerator";
import { Button } from "../components/ui/Button";
import { ButtonSecondary } from "../components/ui/ButtonSecondary";

export default function InvoiceForm() {
    const today = new Date().toISOString().split("T")[0];
    const twoWeeksLater =
        new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split(
            "T",
        )[0];

    const [isPreviewMode, setIsPreviewMode] = useState(true);
    const [formData] = useState({
        billTo: "Acme Corporation",
        address: "123 Main St, Springfield, USA",
        selectedDate: today,
        selectedDueDate: twoWeeksLater,
    });
    const [invoiceItems, setInvoiceItems] = useState([
        { description: "Web Design Services", quantity: 10, unitPrice: 50 },
        { description: "Logo Design", quantity: 2, unitPrice: 120 },
        { description: "Consulting", quantity: 5, unitPrice: 80 },
    ]);

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const formPDFRef = useRef<HTMLDivElement>(null);

    const formattedResult = invoiceItems
        .reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
        .toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        });

    const formattedAmount = (item: { quantity: number; unitPrice: number }) => {
        return (item.quantity * item.unitPrice).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        });
    };

    // Utility mapping for common Tailwind classes (expand as needed)
    const tailwindCSS: Record<string, string> = {
        block: "display: block;",
        "h-10": "height: 40px;",
        "p-8": "padding: 32px;",
        "px-6": "padding-left: 24px; padding-right: 24px;",
        "py-4": "padding-top: 16px; padding-bottom: 16px;",
        "mb-10": "margin-bottom: 40px;",
        "ml-10": "margin-left: 40px;",
        "m-4": "margin: 16px;",
        "mb-4": "margin-bottom: 16px;",
        "mb-2": "margin-bottom: 8px;",
        "rounded-lg": "border-radius: 8px;",
        "rounded-l-lg":
            "border-top-left-radius: 8px; border-bottom-left-radius: 8px;",
        "rounded-r-lg":
            "border-top-right-radius: 8px; border-bottom-right-radius: 8px;",
        shadow:
            "box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06);",
        "text-4xl": "font-size: 2.25rem; line-height: 2.5rem;",
        "text-base": "font-size: 16px; line-height: 24px;",
        "text-sm": "font-size: 14px; line-height: 20px;",
        "text-xs": "font-size: 12px; line-height: 20px;",
        "font-medium": "font-weight: 500;",
        "font-semibold": "font-weight: 600;",
        uppercase: "text-transform: uppercase;",
        "tracking-wide": "letter-spacing: 0.025em;",
        flex: "display: flex;",
        "items-center": "align-items: center;",
        "gap-10": "gap: 40px;",
        "justify-center": "justify-content: center;",
        "justify-between": "justify-content: space-between;",
        grid: "display: grid;",
        "grid-cols-2": "grid-template-columns: repeat(2, minmax(0, 1fr));",
        "min-w-full": "min-width: 100%;",
        "w-40": "width: 160px;",
        "w-200": "width: 800px;",
        "text-right": "text-align: right;",
        "text-left": "text-align: left;",
        "whitespace-nowrap": "white-space: nowrap;",
        "text-gray-400": "color: #a8a8c0;",
        "bg-white": "background-color: #fff;",
        "bg-gray-100": "background-color: #f3f4f6;",
        "opacity-100": "opacity: 1;",
        "opacity-0": "opacity: 0;",
        "h-full": "height: 100%;",
        "h-0": "height: 0;",
        "overflow-hidden": "overflow: hidden;",
        hidden: "display: none;",
    };

    const debounce = useCallback(
        <T extends (...args: unknown[]) => void>(fn: T, delay = 100) => {
            let timeout: NodeJS.Timeout;
            return function (this: unknown, ...args: Parameters<T>) {
                clearTimeout(timeout);
                timeout = setTimeout(() => fn.apply(this, args), delay);
            } as T;
        },
        [],
    );

    const applyTailwindStyles = (html: string) => {
        return html.replace(/class="([^"]+)"/g, (match, classNames) => {
            const styles = classNames
                .split(/\s+/)
                .map((cls: string) => tailwindCSS[cls] || "")
                .filter(Boolean)
                .join(" ");
            return styles ? `style="${styles}"` : "";
        });
    };

    const updateIframeContent = debounce(async () => {
        const iframe = iframeRef.current;
        if (!iframe) return;
        const iframeDoc = iframe.contentDocument ||
            iframe.contentWindow?.document;
        if (!iframeDoc) return;
        const formPDF = formPDFRef.current;
        if (!formPDF) return;

        const styledHTML = applyTailwindStyles(formPDF.innerHTML);
        iframeDoc.open();
        iframeDoc.write(`<!DOCTYPE html><html><head><meta charset="UTF-8">
      <link href="https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap" rel="stylesheet">
      <style>
        body { font-family: 'Poppins', sans-serif; }
        *, div, p, span, h1, h2, h3, h4, h5, h6, table, th, td {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html {
          line-height: 1.15;
          -webkit-text-size-adjust: 100%;
        }
        body {
          min-height: 100vh;
        }
        a {
          background-color: transparent;
        }
        img {
          border-style: none;
        }
        table {
          border-collapse: collapse;
        }
      </style>
    </head><body>${styledHTML}</body></html>`);
        iframeDoc.close();
    }, 100);

    const handleDownload = async (e: React.FormEvent) => {
        e.preventDefault();
        const iframe = iframeRef.current;
        if (!iframe) {
            console.error("Iframe not found");
            return;
        }
        const iframeDoc = iframe.contentDocument ||
            iframe.contentWindow?.document;
        if (!iframeDoc) {
            console.error("Iframe document not accessible");
            return;
        }
        const content = iframeDoc.body;
        if (!content) {
            console.error("Iframe body not found");
            return;
        }
        await generatePDF(content as HTMLElement);
    };

    useEffect(() => {
        updateIframeContent();
    }, [formData, invoiceItems, updateIframeContent]);

    return (
        <div>
            {/* Preview Mode */}
            <div
                className={`flex flex-col xl:flex-row gap-y-4 gap-x-10 justify-center ${
                    isPreviewMode ? "opacity-100 h-full" : "opacity-0 h-0"
                }`}
            >
                <div className="order-2 xl:order-1 w-full xl:w-[800px] h-[1000px] rounded-lg bg-white dark:bg-slate-800 shadow overflow-x-auto">
                    <div className="min-w-[800px]">
                        <div
                            id="formPDF"
                            ref={formPDFRef}
                            className="flex gap-10 justify-center"
                        >
                            <div className="text-sm tracking-wide">
                                {/* Header */}
                                <div className="p-8 mb-10">
                                    <div className="mb-10">
                                        <div className="text-4xl py-4">
                                            INVOICE
                                        </div>
                                        <div className="text-base">#123</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-10 mb-10">
                                        <div>
                                            <div className="text-xs text-gray-400 whitespace-nowrap mb-2">
                                                From:
                                            </div>
                                            <div>Irina Sorokina</div>
                                        </div>

                                        {/* Bill To */}
                                        <div className="text-right">
                                            <div className="text-xs text-gray-400 whitespace-nowrap mb-2">
                                                Bill To:
                                            </div>
                                            <div>
                                                <div>{formData.billTo}</div>
                                                <div>{formData.address}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-10">
                                        <div>
                                            <div className="text-xs text-gray-400 whitespace-nowrap mb-2">
                                                Issued Date:
                                            </div>
                                            <div>{formData.selectedDate}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-gray-400 whitespace-nowrap mb-2">
                                                Due Date:
                                            </div>
                                            <div>
                                                {formData.selectedDueDate}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Invoice Items */}
                                <div className="m-4 mb-10">
                                    <table className="min-w-full">
                                        <thead className="bg-gray-100 dark:bg-slate-700">
                                            <tr>
                                                <th className="px-6 h-10 text-left text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider rounded-l-lg">
                                                    Description
                                                </th>
                                                <th className="px-6 h-10 text-right text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                                                    Quantity
                                                </th>
                                                <th className="px-6 h-10 text-right text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                                                    Unit Price
                                                </th>
                                                <th className="px-6 h-10 text-right text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider rounded-r-lg">
                                                    Amount USD
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {invoiceItems.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <p>
                                                            {item.description}
                                                        </p>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                                                        {isPreviewMode
                                                            ? (
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    name={`quantity_${index}`}
                                                                    value={item
                                                                        .quantity}
                                                                    onChange={(
                                                                        e,
                                                                    ) => {
                                                                        const newItems =
                                                                            [...invoiceItems];
                                                                        newItems[
                                                                            index
                                                                        ].quantity =
                                                                            Number(
                                                                                e.target
                                                                                    .value,
                                                                            );
                                                                        setInvoiceItems(
                                                                            newItems,
                                                                        );
                                                                    }}
                                                                    className="w-20 text-right border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded px-2 py-1"
                                                                />
                                                            )
                                                            : (
                                                                <span>
                                                                    {item
                                                                        .quantity}
                                                                </span>
                                                            )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                                                        {isPreviewMode
                                                            ? (
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    step="0.01"
                                                                    name={`unitPrice_${index}`}
                                                                    value={item
                                                                        .unitPrice}
                                                                    onChange={(
                                                                        e,
                                                                    ) => {
                                                                        const newItems =
                                                                            [...invoiceItems];
                                                                        newItems[
                                                                            index
                                                                        ].unitPrice =
                                                                            Number(
                                                                                e.target
                                                                                    .value,
                                                                            );
                                                                        setInvoiceItems(
                                                                            newItems,
                                                                        );
                                                                    }}
                                                                    className="w-24 text-right border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded px-2 py-1"
                                                                />
                                                            )
                                                            : (
                                                                <span>
                                                                    {item
                                                                        .unitPrice}
                                                                </span>
                                                            )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                                                        {formattedAmount(item)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Totals */}
                                <div className="m-4 px-6 text-right">
                                    <span>Total</span>
                                    <span className="font-medium ml-10">
                                        {formattedResult}
                                    </span>
                                </div>

                                {/* Payment Info */}
                                <div className="p-8">
                                    <div className="text-base mb-4">
                                        Payment Information
                                    </div>
                                    <div className="grid grid-cols-2 gap-10">
                                        <div>
                                            <div className="text-sm mb-2">
                                                Bank Transfer
                                            </div>
                                            <div className="text-gray-400">
                                                <div className="text-xs">
                                                    Account holder: GLOBAL
                                                    INNOVATIONS LLC
                                                </div>
                                                <div className="text-xs">
                                                    Account number: 9876543210
                                                </div>
                                                <div className="text-xs">
                                                    Bank name: Chase Bank
                                                </div>
                                                <div className="text-xs">
                                                    Routing number: 021000021
                                                </div>
                                                <div className="text-xs">
                                                    Bank address: 270 Park
                                                    Avenue, New York, NY 10017
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm mb-2">
                                                Company Details
                                            </div>
                                            <div className="text-gray-400">
                                                <div className="text-xs">
                                                    EIN: 12-3456789
                                                </div>
                                                <div className="text-xs">
                                                    Registered Office: 123 Tech
                                                    Street, San Francisco, CA
                                                    94107
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`order-1 xl:order-2 flex flex-col items-center sm:items-end sm:pl-4 xl:p-0 xl:items-start justify-center xl:justify-start gap-4 w-full xl:max-w-[240px] ${
                        isPreviewMode ? "" : "overflow-hidden"
                    }`}
                >
                    <Button
                        type="button"
                        onClick={() => setIsPreviewMode(false)}
                    >
                        Preview PDF
                    </Button>
                </div>
            </div>

            {/* PDF Mode */}
            <form
                className={`flex flex-col xl:flex-row gap-10 justify-center ${
                    !isPreviewMode
                        ? "opacity-100 h-full"
                        : "opacity-0 h-0 overflow-hidden"
                }`}
                onSubmit={handleDownload}
            >
                <div className="order-2 xl:order-1 rounded-lg bg-white dark:bg-slate-800 shadow overflow-x-auto">
                    <div className="min-w-[800px] flex justify-center">
                        <iframe
                            ref={iframeRef}
                            src="/invoice-template.html"
                            width="800"
                            height="1100"
                        >
                        </iframe>
                    </div>
                </div>

                <div className="order-1 xl:order-2 flex flex-col justify-center xl:justify-start gap-4 w-full xl:max-w-[240px]">
                    <div className="flex flex-col sm:flex-row xl:flex-col gap-4">
                        <ButtonSecondary
                            onClick={() => setIsPreviewMode(true)}
                        >
                            Back To Form
                        </ButtonSecondary>
                        <Button type="submit">
                            Download PDF
                        </Button>
                    </div>

                    <div className="rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-slate-800 p-4">
                        <div className="flex">
                            <div className="shrink-0">
                                <InformationCircleIcon className="size-5 text-sky-400 dark:text-sky-300" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                    Download Tip
                                </h3>
                                <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                                    <p>
                                        If the download does not begin, click
                                        the Download PDF button once more.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

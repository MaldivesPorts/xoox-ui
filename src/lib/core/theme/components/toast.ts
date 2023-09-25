import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";

/**
 * Card **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, header, body, footer} = card({...})
 *
 * <div className={base()}>
 *    <div className={header()}>Header</div>
 *    <div className={body()}>Body</div>
 *    <div className={footer()}>Footer</div>
 * </div>
 * ```
 */
const toast = tv({
    slots: {
        region: "pointer-events-none fixed inset-0 flex flex-col gap-3 items-end px-4 py-6 sm:p-6 z-50",
        toast: "bg-background pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5",
        icon: "h-6 w-6",
        title: "text-sm font-medium text-gray-900",
        description: "mt-1 text-sm text-gray-500",
        actionButton: "rounded-md bg-white text-sm font-medium text-primary-600 hover:text-primary-500 outline-none p-1",
        dismissButton: "rounded-md bg-white text-sm font-medium text-gray-700 hover:text-gray-500 outline-none p-1",
        closeButton: "inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 outline-none p-1"
    },
    variants: {
        color: {
            default: {
                icon: "text-gray-400",
            },
            success: {
                icon: "text-success-500",
            },
            error: {
                icon: "text-danger-500",
            }
        },
    },
    defaultVariants: {
        color: "default",
    },
});
export type ToastVariantProps = VariantProps<typeof toast>;
export type ToastSlots = keyof ReturnType<typeof toast>;

export {toast};

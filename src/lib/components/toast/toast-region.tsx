import {AriaToastRegionProps, useToastRegion} from '@react-aria/toast';
import {ToastState} from '@react-stately/toast';
import React from 'react';
import Toast from './toast.tsx';
import {AnimatePresence} from 'framer-motion';

export interface ToastContent {
    title: string;
    description?: string;
    showCloseButton?: boolean;
    showDismissButton?: boolean;
    showActionButton?: boolean;
    actionButtonTitle?: string;
    dismissButtonTitle?: string;
    onAction?: (data: any) => void;
    onDismiss?: (data: any) => void;
    color?: "default" | "success" | "error";
    data?: any
}


interface ToastRegionProps extends AriaToastRegionProps {
    state: ToastState<ToastContent>;
}

function ToastRegion(
    { state, ...props }: ToastRegionProps
) {
    let ref = React.useRef(null);
    let { regionProps } = useToastRegion(props, state, ref);
    return (
        <AnimatePresence>
            <div
                {...regionProps}
                ref={ref}
                aria-live="assertive"
                className="pointer-events-none fixed inset-0 flex flex-col gap-3 items-end px-4 py-6 sm:p-6 z-50">
                {state.visibleToasts.map((toast) => (
                    <Toast key={toast.key} toast={toast} state={state} />
                ))}
            </div>
        </AnimatePresence>
    );
}

export default ToastRegion;

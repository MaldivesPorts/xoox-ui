import {useCallback, useMemo, useRef} from 'react';
import {mapPropsVariants, PropGetter} from '../../core/system';
import {SlotsToClasses, toast, ToastSlots, ToastVariantProps} from '../../core/theme';
import {AriaToastProps, useToast as useAriaToast} from '@react-aria/toast';
import {ToastState} from '@react-stately/toast';
import {useButton} from '@react-aria/button';
import {ToastContent} from './toast-region.tsx';

interface ToastProps<T> extends AriaToastProps<T> {
    state: ToastState<T>;
    classNames?: SlotsToClasses<ToastSlots>;
}

export type UseToastProps = ToastProps<ToastContent> & ToastVariantProps;

export function useToast(originalProps: UseToastProps) {
    const ref = useRef(null);
    const [props, variantProps] = mapPropsVariants(originalProps, toast.variantKeys);

    const {state, classNames, toast: content} = props;

    let {toastProps, titleProps, closeButtonProps} = useAriaToast(props, state, ref);

    const {buttonProps} = useButton(closeButtonProps, ref);

    const slots = useMemo(
        () =>
            toast({
                color: props.toast.content.color || 'default',
            }),
        [...Object.values(variantProps)],
    );

    const getToastProps = useCallback<PropGetter>(
        () => ({
            ...toastProps,
            ref: ref,
            // 'data-animation': props.toast.animation,
            className: slots.toast({class: classNames?.toast}),
            // onAnimationEnd: () => {
            //     // Remove the toast when the exiting animation completes.
            //     if (props.toast.animation === 'exiting') {
            //         state.remove(props.toast.key);
            //     }
            // }
        }),
        [slots, classNames, props.toast.animation],
    );

    const getIconProps = useMemo(
        () => ({
            ...titleProps,
            className: slots.icon({class: classNames?.icon}),
        }),
        [slots, classNames],
    );

    const getTitleProps = useMemo(
        () => ({
            ...titleProps,
            className: slots.title({class: classNames?.title}),
        }),
        [slots, classNames, titleProps],
    );

    const getDescriptionProps = useMemo(
        () => ({
            className: slots.description({class: classNames?.description}),
        }),
        [slots, classNames],
    );


    const getCloseButtonProps = useCallback<PropGetter>(
        () => ({
            ...buttonProps,
            type: 'button',
            className: slots.closeButton({class: classNames?.closeButton}),
        }),
        [slots, classNames],
    );

    const getDismissButtonProps = useCallback<PropGetter>(
        () => ({
            type: 'button',
            className: slots.dismissButton({class: classNames?.dismissButton}),
            onClick: () => {
                const {data, onDismiss} = props.toast.content;
                if (onDismiss) {
                    onDismiss(data);
                }
                state.close(props.toast.key);
            }
        }),
        [slots, classNames],
    );

    const getActionButtonProps = useCallback<PropGetter>(
        () => ({
            type: 'button',
            className: slots.actionButton({class: classNames?.actionButton}),
            onClick: () => {
                const {data, onAction} = props.toast.content;
                if (onAction) {
                    onAction(data);
                }
                state.close(props.toast.key);
            }
        }),
        [slots, classNames, props.toast.content],
    );

    return {
        getToastProps,
        getIconProps,
        getTitleProps,
        getDescriptionProps,
        getDismissButtonProps,
        getCloseButtonProps,
        getActionButtonProps,
        content
    }

}

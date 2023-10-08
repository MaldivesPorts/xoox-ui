import {ComboBoxState} from '@react-stately/combobox';
import * as React from 'react';
import {useCallback, useEffect, useMemo} from 'react';
import {DOMAttributes, PropGetter} from '../../core/system';
import {PopoverProps} from '../popover';
import {useComboBox as useAriaComboBox} from '@react-aria/combobox';
import {clsx} from '../../utilities/shared-utils';
import {mergeProps} from '@react-aria/utils';
import {combobox, InputVariantProps} from '../../core/theme';
import {InputProps} from '../input';
import {ComboBoxProps as AriaComboBoxProps} from '@react-types/combobox';


export type useComboBoxProps = AriaComboBoxProps<any> & {
    popoverProps: any;
    className: any;
    classNames: any;
    listBoxProps: any;
} & InputVariantProps


export function useComboBox(props: useComboBoxProps, state: ComboBoxState<any>) {
    // const [props, variantProps] = mapPropsVariants(originalProps, combobox.variantKeys);
    const {
        popoverProps,
        className,
        classNames,
        listBoxProps: userListBoxProps,
    } = props

    const inputRef = React.useRef<HTMLInputElement>(null);
    const triggerRef = React.useRef<HTMLDivElement>(null);
    const listBoxRef = React.useRef<HTMLUListElement>(null);
    const popoverRef = React.useRef(null);
    const scrollRef = React.useRef<HTMLDivElement | null>(null);

    let {
        inputProps,
        listBoxProps,
        labelProps,
        descriptionProps,
        errorMessageProps,
    } = useAriaComboBox(
        {
            ...props,
            inputRef,
            listBoxRef,
            popoverRef,
        },
        state
    );

    const isInvalid = props.validationState === "invalid";

    const slots = useMemo(
        () =>
            combobox({
                isInvalid,
                className,
            }),
        [isInvalid, className],
    );

    useEffect(() => {
        if (state.isOpen && popoverRef.current && triggerRef.current) {
            let selectRect = triggerRef.current?.getBoundingClientRect();
            let scroll = scrollRef.current;
            if (scroll) {
                scroll.style.width = (selectRect.width - 10) + 'px';
            }
        } else {
            // state.setOpen(true);
        }
    }, [state.isOpen]);

    const getPopoverProps = useCallback(
        (props: DOMAttributes = {}) => {
            return {
                state,
                triggerRef,
                ref: popoverRef,
                scrollRef: scrollRef,
                triggerType: "listbox",
                className: slots.popover({
                    class: clsx(classNames?.popover, props.className),
                }),
                ...mergeProps(popoverProps, props),
                offset: 5,
                placement: "bottom",
                triggerScaleOnOpen: false,
                disableAnimation: false,
            } as PopoverProps;
        },
        [slots, classNames?.popover, popoverProps, triggerRef, state, scrollRef, popoverRef],
    );

    const getInputProps = useCallback(
        (_ = {}) => {
            return {
                ...props,
                ref: inputRef,
                ...labelProps,
                ...inputProps,
                ...descriptionProps,
                ...errorMessageProps,
            } as InputProps;
        },
        [
            inputRef,
            state,
        ],
    );

    const getScrollProps: PropGetter = useCallback(
        (_ = {}) => {
            return {
                ref: scrollRef,
            };
        },
        [
            scrollRef,
            state,
        ],
    );

    const getListBoxProps = () => {
        return {
            ...userListBoxProps,
            ...listBoxProps,
            state,
            ref: listBoxRef,
        }
    };


    return {
        triggerRef,
        scrollRef,
        getListBoxProps,
        getInputProps,
        getScrollProps,
        getPopoverProps
    }
}

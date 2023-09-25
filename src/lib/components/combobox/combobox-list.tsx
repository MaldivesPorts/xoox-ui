import * as React from 'react';
import {useMemo} from 'react';
import type {AriaListBoxOptions} from '@react-aria/listbox';
import {useListBox, useOption} from '@react-aria/listbox';
import type {ListState} from '@react-stately/list';
import type {Node} from '@react-types/shared';
import {forwardRef, PropGetter} from '../../core/system';
import {mergeProps} from '@react-aria/utils';
import {clsx, dataAttr} from '../../utilities/shared-utils';
import {useHover} from '@react-aria/interactions';
import {useIsMobile} from '../../hooks/use-is-mobile';
import {listboxItem} from '../../core/theme';

interface ComboBoxListProps extends AriaListBoxOptions<unknown> {
    listBoxRef?: React.RefObject<HTMLUListElement>;
    state: ListState<unknown>;
}

interface ComboBoxListOptionProps {
    item: Node<unknown>;
    state: ListState<unknown>;
    className?: string;
    classNames?: { base: string }
    disableAnimation?: boolean
}

const ComboBoxList = forwardRef((props: ComboBoxListProps, ref) => {
    let { listBoxRef = ref, state } = props;
    // @ts-ignore
    let { listBoxProps } = useListBox(props, state, listBoxRef);

    return (
        <ul
            {...listBoxProps}
            ref={listBoxRef}
            className="w-full flex flex-col gap-0.5 p-1 outline-none"
        >
            {[...state.collection].map((item: any) =>  <ComboBoxListOption key={item.key} item={item} state={state} />)}
        </ul>
    );
});

const ComboBoxListOption = (originalProps: ComboBoxListOptionProps) => {
    let ref = React.useRef<HTMLLIElement>(null);

    const {item, state, className, classNames} = originalProps;

    let { optionProps, isDisabled, isSelected, isFocused, isPressed, isFocusVisible } = useOption(
        {
            key: item.key
        },
        state,
        ref
    );

    const disableAnimation = originalProps.disableAnimation;

    const {isHovered, hoverProps} = useHover({
        isDisabled,
    });

    const isMobile = useIsMobile();

    const baseStyles = clsx(classNames?.base, className);

    const slots = useMemo(
        () =>
            listboxItem({
                isDisabled,
                disableAnimation,
            }),
        [isDisabled, disableAnimation],
    );

    const getItemProps: PropGetter = (props = {}) => ({
        ref: ref,
        ...mergeProps(optionProps, hoverProps, props),
        "data-selectable": dataAttr(!isDisabled),
        "data-focus": dataAttr(isFocused),
        "data-hover": dataAttr(isMobile ? isHovered || isPressed : isHovered),
        "data-disabled": dataAttr(isDisabled),
        "data-selected": dataAttr(isSelected),
        "data-pressed": dataAttr(isPressed),
        "data-focus-visible": dataAttr(isFocusVisible),
        className: slots.base({class: clsx(baseStyles, props.className)}),
    });

    return (
        <li {...getItemProps()}>
            {item.rendered}
            {/*{isSelected && (*/}
            {/*    <span>v</span>*/}
            {/*)}*/}
        </li>
    );
}


export {ComboBoxList, ComboBoxListOption};

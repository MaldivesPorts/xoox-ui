import type {KeyboardDelegate} from "@react-types/shared";

import {AriaListBoxProps, useListBox as useAriaListbox} from "@react-aria/listbox";
import {HTMLXooxUIProps, PropGetter} from "../../core/system";
import {listbox, ListboxSlots, ListboxVariantProps, SlotsToClasses} from '../../core/theme';
import {ListState, useListState} from "@react-stately/list";
import {filterDOMProps, ReactRef, useDOMRef} from "../../utilities/react-utils";
import {useMemo} from "react";

import {ListboxItemProps} from "./listbox-item";
import {clsx} from '../../utilities/shared-utils';
import {createCollectionChildren} from '../../utilities/aria-utils';
import ListboxItemBase from './base/listbox-item-base.tsx';

interface AriaListBoxOptions<T> extends AriaListBoxProps<T> {
  /** Whether the listbox uses virtual scrolling. */
  isVirtualized?: boolean;
  /**
   * An optional keyboard delegate implementation for type to select,
   * to override the default.
   */
  keyboardDelegate?: KeyboardDelegate;
  /**
   * Whether the listbox items should use virtual focus instead of being focused directly.
   */
  shouldUseVirtualFocus?: boolean;
  /** Whether selection should occur on press up instead of press down. */
  shouldSelectOnPressUp?: boolean;
  /** Whether options should be focused when the user hovers over them. */
  shouldFocusOnHover?: boolean;
  /** Whether the item should display the same "hover" styles as when it is focused. */
  shouldHighlightOnFocus?: boolean;
}

interface Props<T> extends Omit<HTMLXooxUIProps<"ul">, "children"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The controlled state of the listbox.
   */
  state?: ListState<T>;
  /**
   * The listbox items variant.
   */
  variant?: ListboxItemProps["variant"];
  /**
   * The listbox items color.
   */
  color?: ListboxItemProps["color"];
  /**
   *  Provides content to display when there are no items.
   * @default "No items."
   */
  emptyContent?: React.ReactNode;
  /**
   * Whether to disable the items animation.
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Listbox classNames={{
   *    base:"base-classes",
   *    emptyContent: "empty-content-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<ListboxSlots>;
  /**
   * The menu items classNames.
   */
  itemClasses?: ListboxItemProps["classNames"];
}

export type UseListboxProps<T = object> = Props<T> & AriaListBoxOptions<T> & ListboxVariantProps;

export function useListbox<T extends object>(props: UseListboxProps<T>) {
  const {
    ref,
    as,
    state: propState,
    variant,
    color,
    onAction,
    children: childrenProp,
    onSelectionChange,
    disableAnimation,
    itemClasses,
    className,
    emptyContent = "No items.",
    shouldHighlightOnFocus,
    classNames,
    ...otherProps
  } = props;

  const children = createCollectionChildren(childrenProp, ListboxItemBase, props?.items);

  const Component = as || "ul";
  const shouldFilterDOMProps = typeof Component === "string";

  const domRef = useDOMRef(ref);

  const innerState = useListState({...props, children, onSelectionChange});
  const state = propState || innerState;

  const {listBoxProps} = useAriaListbox({...props, onAction}, state, domRef);

  const slots = useMemo(() => listbox({className}), [className]);

  const baseStyles = clsx(classNames?.base, className);

  const getBaseProps: PropGetter = (props = {}) => {
    return {
      ref: domRef,
      className: slots.base({class: baseStyles}),
      ...listBoxProps,
      ...filterDOMProps(otherProps, {
        enabled: shouldFilterDOMProps,
      }),
      ...props,
    };
  };

  const getEmptyContentProps: PropGetter = (props = {}) => {
    return {
      children: emptyContent,
      className: slots.emptyContent({class: classNames?.emptyContent}),
      ...props,
    };
  };

  return {
    Component,
    state,
    variant,
    color,
    emptyContent,
    shouldHighlightOnFocus,
    disableAnimation,
    className,
    itemClasses,
    getBaseProps,
    getEmptyContentProps,
  };
}

export type UseListboxReturn = ReturnType<typeof useListbox>;

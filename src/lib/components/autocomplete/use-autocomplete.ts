import type {SelectSlots, SelectVariantProps, SlotsToClasses} from '../../core/theme';
import {autocomplete} from '../../core/theme';
import type {HiddenSelectProps} from './hidden-select';

import {DOMAttributes, HTMLMplUIProps, mapPropsVariants, PropGetter} from '../../core/system';
import {ReactRef, useDOMRef} from '../../utilities/react-utils';
import {Key, ReactNode, useCallback, useEffect, useMemo, useRef} from 'react';
import {ListboxProps} from '../listbox';
import {useFocusRing} from '@react-aria/focus';
import {clsx, dataAttr} from '../../utilities/shared-utils';
import {mergeProps} from '@react-aria/utils';
import {useHover} from '@react-aria/interactions';
import {PopoverProps} from '../popover';
import {CollectionProps} from '../../utilities/aria-utils';
import {CollectionChildren} from '@react-types/shared';
import {ScrollShadowProps} from '../scroll-shadow';
import {MultiSelectProps, useMultiSelect, useMultiSelectState,} from '../../hooks/use-aria-multiselect';
import {SpinnerProps} from '../spinner';
import {InputProps} from '../input';
import {useTextField} from '@react-aria/textfield';

export type AutocompleteSelectedItemProps<T = object> = {
  /** A unique key for the item. */
  key?: Key;
  /** The props passed to the item. */
  props?: Record<string, any>;
  /** The item data. */
  data?: T | null;
  /** An accessibility label for this item. */
  "aria-label"?: string;
  /** The rendered contents of this item (e.g. JSX). */
  rendered?: ReactNode;
  /** A string value for this item, used for features like typeahead. */
  textValue?: string;
  /** The type of item this item represents. */
  type?: string;
};

export type AutocompleteSelectedItems<T = object> = Array<AutocompleteSelectedItemProps<T>>;

interface Props<T> extends Omit<HTMLMplUIProps<"select">, keyof SelectVariantProps> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLSelectElement | null>;
  /**
   * The ref to the scroll element. Useful when having async loading of items.
   */
  scrollRef?: ReactRef<HTMLElement | null>;
  /**
   * The ref to the spinner element.
   */
  spinnerRef?: ReactRef<HTMLElement | null>;
  /**
   * Whether the select is required.
   * @default false
   */
  isRequired?: boolean;
  /**
   * The icon that represents the select open state. Usually a chevron icon.
   */
  selectorIcon?: ReactNode;
  /**
   * Element to be rendered in the left side of the select.
   */
  startContent?: React.ReactNode;
  /**
   * Element to be rendered in the right side of the select.
   */
  endContent?: ReactNode;
  /**
   * The placeholder for the select to display when no option is selected.
   * @default "Select an option"
   */
  placeholder?: string;
  /**
   * Whether to display a top and bottom arrow indicators when the listbox is scrollable.
   * @default true
   */
  showScrollIndicators?: boolean;
  /**
   * Props to be passed to the popover component.
   *
   * @default { placement: "bottom", triggerScaleOnOpen: false, offset: 5 }
   */
  popoverProps?: Partial<PopoverProps>;
  /**
   * Props to be passed to the listbox component.
   *
   * @default { disableAnimation: false }
   */
  listboxProps?: Partial<ListboxProps>;
  /**
   * Props to be passed to the scroll shadow component. This component
   * adds a shadow to the top and bottom of the listbox when it is scrollable.
   *
   * @default { hideScrollBar: true, offset: 15 }
   */
  scrollShadowProps?: Partial<ScrollShadowProps>;
  /**
   * Props to be passed to the spinner component.
   *
   * @default { size: "sm" , color: "current" }
   */
  spinnerProps?: Partial<SpinnerProps>;
  /**
   * Function to render the value of the select. It renders the selected item by default.
   * @param value
   * @returns
   */
  renderValue?: (items: AutocompleteSelectedItems<T>) => ReactNode;
  /**
   * Callback fired when the select menu is closed.
   */
  onClose?: () => void;
  /**
   * Classes object to style the select and its children.
   */
  classNames?: SlotsToClasses<SelectSlots>;
}

export type UseSelectProps<T> = Omit<Props<T>, keyof MultiSelectProps<T>> &
    MultiSelectProps<T> &
    CollectionProps<T> &
    SelectVariantProps & InputProps;

export function useAutocomplete<T extends object>(originalProps: UseSelectProps<T>) {
  const [props, variantProps] = mapPropsVariants(originalProps, autocomplete.variantKeys);
  const disableAnimation = originalProps.disableAnimation ?? false;

  let {
    ref,
    as,
    isOpen,
    label,
    name,
    children,
    isLoading,
    selectorIcon,
    defaultOpen,
    onOpenChange,
    startContent,
    endContent,
    description,
    errorMessage,
    renderValue,
    onSelectionChange,
    placeholder,
    disallowEmptySelection = false,
    selectionMode = "single",
    spinnerRef,
    scrollRef: scrollRefProp,
    popoverProps: userPopoverProps,
    scrollShadowProps: userScrollShadowProps,
    listboxProps: userListboxProps,
    spinnerProps,
    onChange,
    onClose,
    className,
    classNames,
    ...otherProps
  } = props;

  const scrollShadowRef = useDOMRef(scrollRefProp);

  const defaultRelatedComponentsProps: {
    popoverProps: UseSelectProps<T>["popoverProps"];
    scrollShadowProps: UseSelectProps<T>["scrollShadowProps"];
    listboxProps: UseSelectProps<T>["listboxProps"];
  } = {
    popoverProps: {
      placement: "bottom",
      triggerScaleOnOpen: false,
      offset: 5,
      disableAnimation,
    },
    scrollShadowProps: {
      ref: scrollShadowRef,
      isEnabled: originalProps.showScrollIndicators ?? true,
      hideScrollBar: true,
      offset: 15,
    },
    listboxProps: {
      disableAnimation,
    },
  };

  userPopoverProps = {...defaultRelatedComponentsProps.popoverProps, ...userPopoverProps};
  userScrollShadowProps = {
    ...defaultRelatedComponentsProps.scrollShadowProps,
    ...userScrollShadowProps,
  };
  userListboxProps = {...defaultRelatedComponentsProps.listboxProps, ...userListboxProps};

  const Component = as || "button";
  const shouldFilterDOMProps = typeof Component === "string";

  const domRef = useDOMRef(ref);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const state = useMultiSelectState<T>({
    ...props,
    isOpen,
    selectionMode,
    disallowEmptySelection,
    children: children as CollectionChildren<T>,
    isRequired: originalProps?.isRequired,
    isDisabled: originalProps?.isDisabled,
    defaultOpen,
    onOpenChange: (open) => {
      onOpenChange?.(open);
      if (!open) {
        onClose?.();
      }
    },
    onSelectionChange: (keys) => {
      onSelectionChange?.(keys);
      if (onChange && typeof onChange === "function" && domRef.current) {
        const event = {
          target: {
            ...domRef.current,
            value: Array.from(keys).join(","),
            name: domRef.current.name,
          },
        } as React.ChangeEvent<HTMLSelectElement>;

        onChange(event);
      }
    },
  });
  const {labelProps, triggerProps, valueProps, menuProps, descriptionProps, errorMessageProps} =
      useMultiSelect(
          {...props, disallowEmptySelection, isDisabled: originalProps?.isDisabled},
          state,
          inputRef,
      );

  // console.log(triggerProps);
  const inputProps = useTextField(triggerProps, inputRef);

  const {focusProps, isFocused, isFocusVisible} = useFocusRing();
  const {isHovered, hoverProps} = useHover({isDisabled: originalProps?.isDisabled});

  // const labelPlacement = useMemo<SelectVariantProps["labelPlacement"]>(() => {
  //   if ((!originalProps.labelPlacement || originalProps.labelPlacement === "inside") && !label) {
  //     return "outside";
  //   }
  //
  //   return originalProps.labelPlacement ?? "outside";
  // }, [originalProps.labelPlacement, label]);

  // const hasHelper = !!description || !!errorMessage;
  // const hasPlaceholder = !!placeholder;
  const isInvalid = props.validationState === "invalid";

  // const baseStyles = clsx(classNames?.base, className);

  const slots = useMemo(
      () =>
          autocomplete({
            ...variantProps,
            isInvalid,
            className,
          }),
      [...Object.values(variantProps), isInvalid, className],
  );

  // scroll the listbox to the selected item
  useEffect(() => {
    if (state.isOpen && popoverRef.current && listboxRef.current) {
      let selectedItem = listboxRef.current.querySelector("[aria-selected=true] [data-label=true]");
      let scrollShadow = scrollShadowRef.current;

      // scroll the listbox to the selected item
      if (selectedItem && scrollShadow && selectedItem.parentElement) {
        let scrollShadowRect = scrollShadow?.getBoundingClientRect();
        let scrollShadowHeight = scrollShadowRect.height;

        scrollShadow.scrollTop =
            selectedItem.parentElement.offsetTop -
            scrollShadowHeight / 2 +
            selectedItem.parentElement.clientHeight / 2;
      }
    }
  }, [state.isOpen, disableAnimation]);

  // apply the same with to the popover as the select
  useEffect(() => {
    // console.log(popoverRef.current);
    if (state.isOpen && popoverRef.current && triggerRef.current) {
      let selectRect = triggerRef.current.getBoundingClientRect();
      let popover = popoverRef.current;
      popover.style.width = selectRect.width + "px";
    }
  }, [state.isOpen]);

  // const getBaseProps: PropGetter = useCallback(
  //   (props = {}) => ({
  //     className: slots.base({
  //       class: clsx(baseStyles, props.className),
  //     }),
  //     ...props,
  //   }),
  //   [slots, baseStyles],
  // );

  const getHiddenSelectProps = useCallback(
      (props = {}) =>
          ({
            state,
            triggerRef,
            selectRef: domRef,
            selectionMode,
            label: originalProps?.label,
            name: originalProps?.name,
            isRequired: originalProps?.isRequired,
            autoComplete: originalProps?.autoComplete,
            isDisabled: originalProps?.isDisabled,
            onChange,
            ...props,
          } as HiddenSelectProps<T>),
      [
        state,
        selectionMode,
        originalProps?.label,
        originalProps?.autoComplete,
        originalProps?.name,
        originalProps?.isDisabled,
        triggerRef,
      ],
  );


  const getListboxWrapperProps: PropGetter = useCallback(
      (props = {}) => ({
        className: slots.listboxWrapper({
          class: clsx(classNames?.listboxWrapper, props?.className),
        }),
        ...mergeProps(userScrollShadowProps, props),
      }),
      [slots.listboxWrapper, classNames?.listboxWrapper, userScrollShadowProps],
  );

  const getListboxProps = (props: any = {}) => {
    return {
      state,
      ref: listboxRef,
      className: slots.listbox({
        class: clsx(classNames?.listbox, props?.className),
      }),
      ...mergeProps(userListboxProps, props, menuProps),
    } as ListboxProps;
  };

  const getPopoverProps = useCallback(
      (props: DOMAttributes = {}) => {
        return {
          state,
          triggerRef,
          ref: popoverRef,
          scrollRef: listboxRef,
          triggerType: "listbox",
          className: slots.popover({
            class: clsx(classNames?.popover, props.className),
          }),
          ...mergeProps(userPopoverProps, props),
          offset:
              state.selectedItems && state.selectedItems.length > 0
                  ? // forces the popover to update its position when the selected items change
                  state.selectedItems.length * 0.00000001 + (userPopoverProps?.offset || 0)
                  : userPopoverProps?.offset,
        } as PopoverProps;
      },
      [slots, classNames?.popover, userPopoverProps, triggerRef, state, state.selectedItems],
  );
  const getInputProps: PropGetter = useCallback(
      (props = {}) => {
        delete triggerProps.onPressStart;
        delete triggerProps.onPress;
        return {
          ref: inputRef,
          ...triggerProps,
          onInput: (e: any) => {
            if (!('continuePropagation' in e)) {
              e.stopPropagation();
            }
            // if (props.onInput) {
            //   props.onInput(e);
            // }
            if (state.isOpen) {
              return;
            }
            state.open();
            state.setOpen(true);
            state.setFocused(true);

            setTimeout(() => {
              inputRef.current?.focus();
            })
          },
          // label: 'Name',
          // placeholder: 'Enter Name',
        };
      },
      [
        inputRef,
        state,
      ],
  );

  const getSelectorIconProps = useCallback(
      () => ({
        "aria-hidden": dataAttr(true),
        "data-open": dataAttr(state.isOpen),
        className: slots.selectorIcon({class: classNames?.selectorIcon}),
      }),
      [slots, classNames?.selectorIcon, state?.isOpen],
  );

  const getSpinnerProps: PropGetter = useCallback(
      (props = {}) => {
        return {
          "aria-hidden": dataAttr(true),
          color: "current",
          size: "sm",
          ...spinnerProps,
          ...props,
          ref: spinnerRef,
          className: slots.spinner({class: clsx(classNames?.spinner, props?.className)}),
        };
      },
      [slots, spinnerRef, spinnerProps, classNames?.spinner],
  );

  return {
    Component,
    domRef,
    state,
    label,
    name,
    inputRef,
    triggerRef,
    listboxRef,
    isLoading,
    placeholder,
    startContent,
    endContent,
    description,
    selectorIcon,
    errorMessage,
    renderValue,
    selectionMode,
    disableAnimation,
    inputProps,
    labelProps,
    // getBaseProps,
    // getTriggerProps,
    // getLabelProps,
    getInputProps,
    getListboxProps,
    getPopoverProps,
    getSpinnerProps,
    // getMainWrapperProps,
    getListboxWrapperProps,
    getHiddenSelectProps,
    // getInnerWrapperProps,
    // getHelperWrapperProps,
    // getDescriptionProps,
    // getErrorMessageProps,
    getSelectorIconProps,
  };
}

export type UseAutocompleteReturn = ReturnType<typeof useAutocomplete>;

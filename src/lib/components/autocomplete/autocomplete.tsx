import {Listbox} from "../listbox";
import {FreeSoloPopover} from "../popover";
import {ChevronDownIcon} from "../../utilities/shared-icons";
import {Spinner} from "../spinner";
import {forwardRef} from "../../core/system";
import {ScrollShadow} from "../scroll-shadow";
import {
  cloneElement,
  FormEvent,
  FormEventHandler,
  ForwardedRef,
  Fragment,
  KeyboardEventHandler,
  ReactElement,
  Ref,
  useMemo
} from 'react';
import {VisuallyHidden} from "@react-aria/visually-hidden";
import {AnimatePresence} from "framer-motion";

import {HiddenSelect} from "./hidden-select";
import {UseSelectProps, useAutocomplete} from "./use-autocomplete.ts";
import {Input} from '../input';

interface Props<T> extends Omit<UseSelectProps<T>, "isLabelPlaceholder"> {}

function Autocomplete<T extends object>(props: Props<T>, ref: ForwardedRef<HTMLSelectElement>) {
  const {
    Component,
    state,
    label,
    isLoading,
    listboxRef,
    triggerRef,
    inputRef,
    selectorIcon = <ChevronDownIcon />,
    description,
    errorMessage,
    startContent,
    endContent,
    placeholder,
    renderValue,
    disableAnimation,
    // getBaseProps,
    // getLabelProps,
    // getTriggerProps,
    // getValueProps,
    getInputProps,
    getListboxProps,
    getPopoverProps,
    getSpinnerProps,
    // getMainWrapperProps,
    getHiddenSelectProps,
    getListboxWrapperProps,
    getSelectorIconProps,
  } = useAutocomplete<T>({...props, ref});

  // const labelContent = label ? <label {...getLabelProps()}>{label}</label> : null;

  // const clonedIcon = cloneElement(selectorIcon as ReactElement, getSelectorIconProps());

  // const helperWrapper = useMemo(() => {
  //   if (!hasHelper) return null;
  //
  //   return (
  //     <div {...getHelperWrapperProps()}>
  //       {errorMessage ? (
  //         <div {...getErrorMessageProps()}>{errorMessage}</div>
  //       ) : description ? (
  //         <div {...getDescriptionProps()}>{description}</div>
  //       ) : null}
  //     </div>
  //   );
  // }, [
  //   hasHelper,
  //   errorMessage,
  //   description,
  //   getHelperWrapperProps,
  //   getErrorMessageProps,
  //   getDescriptionProps,
  // ]);

  // const renderSelectedItem = useMemo(() => {
  //   if (!state.selectedItems) return placeholder;
  //
  //   if (renderValue && typeof renderValue === "function") {
  //     const mappedItems = [...state.selectedItems].map((item) => ({
  //       key: item.key,
  //       data: item.value,
  //       type: item.type,
  //       props: item.props,
  //       textValue: item.textValue,
  //       rendered: item.rendered,
  //       "aria-label": item["aria-label"],
  //     }));
  //
  //     return renderValue(mappedItems);
  //   }
  //
  //   return state.selectedItems.map((item: any) => item.textValue).join(", ");
  // }, [state.selectedItems, renderValue]);

  // const renderIndicator = useMemo(() => {
  //   if (isLoading) {
  //     return <Spinner {...getSpinnerProps()} />;
  //   }
  //
  //   return clonedIcon;
  // }, [isLoading, clonedIcon, getSpinnerProps]);

  const popoverContent = useMemo(
      () =>
          state.isOpen ? (
              <FreeSoloPopover {...getPopoverProps()} state={state} triggerRef={triggerRef}>
                <ScrollShadow {...getListboxWrapperProps()}>
                  <Listbox {...getListboxProps()} />
                </ScrollShadow>
              </FreeSoloPopover>
          ) : null,
      [state.isOpen, getPopoverProps, state, triggerRef, getListboxWrapperProps, getListboxProps],
  );

  const openOptions = ($event: KeyboardEventHandler<HTMLInputElement>): void => {
    if (!state.isOpen) {
      state.open();
      setTimeout(()=> {
        inputRef.current?.focus();
      }, 100);
      props.onKeyUp && props.onKeyUp($event);
    }

  }

  // console.log(triggerProps);

  return (
    <Fragment>
      <HiddenSelect {...getHiddenSelectProps()} />
      {/*{shouldLabelBeOutside ? labelContent : null}*/}
      {/*<div id='main' {...getMainWrapperProps()}>*/}
      {/*  <Component {...getTriggerProps()}/>*/}
      {/*<div style={{zIndex: 12, position: 'relative'}}>*/}
      {/*  <Input/>*/}
      {/*</div>*/}
      {/*<div {...getTriggerProps()} style={{position: 'absolute', top: 30, left: 0, right: 0, width: '100%', height: '100%', backgroundColor: 'red', zIndex: 1}}>*/}
      {/*</div>*/}
      <div ref={triggerRef}>
        <Input {...getInputProps()}/>
      </div>

      {/*{...getTriggerProps()}*/}
          {/*{!shouldLabelBeOutside ? labelContent : null}*/}
          {/*<div {...getInnerWrapperProps()}>*/}
          {/*  {startContent}*/}
          {/*  <span {...getValueProps()}>*/}
          {/*    {renderSelectedItem}*/}
          {/*    {state.selectedItems && <VisuallyHidden>,</VisuallyHidden>}*/}
          {/*  </span>*/}
          {/*  {endContent}*/}
          {/*</div>*/}
          {/*{renderIndicator}*/}
        {/*</Component>*/}
        {/*{helperWrapper}*/}
      {/*</div>*/}
      {disableAnimation ? popoverContent : <AnimatePresence>{popoverContent}</AnimatePresence>}
    </Fragment>
  );
}

export type AutocompleteProps<T = object> = Props<T> & {ref?: Ref<HTMLElement>};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(Autocomplete); // as <T = object>(props: AutocompleteProps<T>) => ReactElement;

Autocomplete.displayName = "MplUI.Autocomplete";

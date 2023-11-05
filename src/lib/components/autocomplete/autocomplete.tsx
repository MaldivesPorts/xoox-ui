import {forwardRef} from "../../core/system";
import {FreeSoloPopover} from "../popover";
import {ScrollShadow} from "../scroll-shadow";
import {ChevronDownIcon, CloseIcon} from "../../utilities/shared-icons";
import {Listbox} from "../listbox";
import {Button} from "../button";
import {Input} from "../input";
import {ForwardedRef, ReactElement, Ref} from "react";

import {UseAutocompleteProps, useAutocomplete} from "./use-autocomplete";
import {AnimatePresence} from 'framer-motion';

interface Props<T> extends UseAutocompleteProps<T> {}

function Autocomplete<T extends object>(props: Props<T>, ref: ForwardedRef<HTMLInputElement>) {
    const {
        Component,
        state,
        isOpen,
        disableAnimation,
        selectorIcon = <ChevronDownIcon />,
        clearIcon = <CloseIcon />,
        getBaseProps,
        getSelectorButtonProps,
        getInputProps,
        getListBoxProps,
        getPopoverProps,
        getClearButtonProps,
        getListBoxWrapperProps,
        getEndContentWrapperProps,
    } = useAutocomplete<T>({...props, ref});

    const popoverContent = isOpen ? (
        <FreeSoloPopover {...getPopoverProps()} state={state}>
            <ScrollShadow {...getListBoxWrapperProps()}>
                <Listbox {...getListBoxProps()} />
            </ScrollShadow>
        </FreeSoloPopover>
    ) : null;

    return (
        <Component {...getBaseProps()}>
            <Input
                {...getInputProps()}
                endContent={
                    <div {...getEndContentWrapperProps()}>
                        <Button {...getClearButtonProps()}>{clearIcon}</Button>
                        <Button {...getSelectorButtonProps()}>{selectorIcon}</Button>
                    </div>
                }
            />
            {disableAnimation ? popoverContent : <AnimatePresence>{popoverContent}</AnimatePresence>}
        </Component>
    );
}

export type AutocompleteProps<T = object> = Props<T> & {ref?: Ref<HTMLElement>};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(Autocomplete) as <T = object>(
    props: AutocompleteProps<T>,
) => ReactElement;

Autocomplete.displayName = "XooxUI.Autocomplete";

import {forwardRef} from "../../core/system";
import {FreeSoloPopover} from "../popover";
import {ScrollShadow} from "../scroll-shadow";
import {ChevronDownIcon, CloseIcon} from "../../utilities/shared-icons";
import {Listbox} from "../listbox";
import {Button} from "../button";
import {Input} from "../input";
import {ForwardedRef, ReactElement, Ref} from "react";

import {UseAutocompleteProps, useAutocomplete} from "./use-autocomplete";

interface Props<T> extends UseAutocompleteProps<T> {}

function Autocomplete<T extends object>(props: Props<T>, ref: ForwardedRef<HTMLSelectElement>) {
    const {
        Component,
        state,
        triggerRef,
        getBaseProps,
        getSelectorButtonProps,
        getInputProps,
        getListBoxProps,
        getPopoverProps,
        getClearButtonProps,
        getListBoxWrapperProps,
        getEndContentWrapperProps,
    } = useAutocomplete({...props, ref});

    const popoverContent = state.isOpen ? (
        <FreeSoloPopover {...getPopoverProps()} state={state} triggerRef={triggerRef}>
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
                        <Button isIconOnly radius="full" size="sm" variant="light" {...getClearButtonProps()}>
                            <CloseIcon />
                        </Button>
                        <Button
                            isIconOnly
                            radius="full"
                            size="sm"
                            variant="light"
                            {...getSelectorButtonProps()}
                        >
                            <ChevronDownIcon />
                        </Button>
                    </div>
                }
            />
            {popoverContent}
            {/* <FreeSoloPopover {...getPopoverProps()} state={state} triggerRef={triggerRef}>
        <ScrollShadow {...getListBoxWrapperProps()}>
          <Listbox {...getListBoxProps()} />
        </ScrollShadow>
      </FreeSoloPopover> */}
        </Component>
    );
}

export type AutocompleteProps<T = object> = Props<T> & {ref?: Ref<HTMLElement>};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(Autocomplete) as <T = object>(
    props: AutocompleteProps<T>,
) => ReactElement;

Autocomplete.displayName = "NextUI.Autocomplete";

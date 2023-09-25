import * as React from 'react';
import type {ComboBoxProps} from '@react-types/combobox';
import {useComboBoxState} from '@react-stately/combobox';
// import {useComboBox} from '@react-aria/combobox';
import {useFilter} from '@react-aria/i18n';
import {DOMAttributes, FreeSoloPopover, Input, ListboxItem, PopoverProps, PropGetter, ScrollShadow} from '../lib';
import {ListBox} from './ListBox';
import {useCallback, useEffect} from 'react';
import {Popover} from './Popover';
import {useButton} from '@react-aria/button';
import {clsx} from '../lib/utilities/shared-utils';
import {mergeProps} from '@react-aria/utils';
import {BaseEvent} from '@react-types/shared';
import {useComboBox} from './useComboBox';

function ComboBox<T extends object>(props: ComboBoxProps<T>) {
    const { contains } = useFilter({ sensitivity: "base" });
    const state = useComboBoxState({ ...props, defaultFilter: contains });

    // let buttonRef = React.useRef(null);
    const inputRef = React.useRef<typeof Input>(null);
    const listBoxRef = React.useRef(null);
    const popoverRef = React.useRef(null);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    let {
        inputProps,
        listBoxProps,
        labelProps
    } = useComboBox(
        {
            ...props,
            inputRef,
            listBoxRef,
            popoverRef,
        },
        state
    );

    useEffect(() => {
        if (state.isOpen && popoverRef.current && inputRef.current) {
            let selectRect = inputRef.current?.getBoundingClientRect();
            let scroll = scrollRef.current;
            scroll.style.width = selectRect.width + 'px';
        }
    }, [state.isOpen]);

    const getPopoverProps = useCallback(
        (props: DOMAttributes = {}) => {
            return {
                state,
                triggerRef: inputRef,
                ref: popoverRef,
                scrollRef: listBoxRef,
                triggerType: "listbox",
            } as PopoverProps;
        },
        [state],
    );

    const getInputProps: PropGetter = useCallback(
        (props = {}) => {
            return {
                ref: inputRef,
                ...labelProps,
                ...inputProps,
            };
        },
        [
            inputRef,
            state,
        ],
    );

    return (
        <div>
            <Input {...getInputProps()}/>
            {state.isOpen && (
                // <Popover
                //     popoverRef={popoverRef}
                //     triggerRef={triggerRef}
                //     state={state}
                //     isNonModal
                // >
                //     <ListBox {...listBoxProps} listBoxRef={listBoxRef} state={state} />
                // </Popover>
                <FreeSoloPopover {...getPopoverProps()}>
                    <ScrollShadow ref={scrollRef}>
                        <ListBox {...listBoxProps} listBoxRef={listBoxRef} state={state}/>
                    </ScrollShadow>
                </FreeSoloPopover>
            )}

        </div>
    );
}

export {ListboxItem as Item, ComboBox}

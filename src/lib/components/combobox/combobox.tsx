import {FreeSoloPopover,} from '../popover';
import {Input} from '../input';
import {ListboxItem} from '../listbox';
import {ScrollShadow} from '../scroll-shadow';
import {useComboBox} from './use-combobox';
import {forwardRef} from '../../core/system';
import {useFilter} from '@react-aria/i18n';
import {useComboBoxState} from '@react-stately/combobox';
import {ComboBoxList} from './combobox-list.tsx';

const ComboBox = forwardRef((props, _) => {
    const { contains } = useFilter({ sensitivity: "base" });
    const state = useComboBoxState({ ...props, defaultFilter: contains });
    const {
        getListBoxProps,
        getInputProps,
        getPopoverProps,
        scrollRef,
        triggerRef
    } = useComboBox(props, state);

    return (
        <div ref={triggerRef}>
            <Input {...getInputProps()}/>
            {state.isOpen && (
                <FreeSoloPopover {...getPopoverProps()}>
                    <ScrollShadow ref={scrollRef}>
                        <ComboBoxList {...getListBoxProps()}/>
                    </ScrollShadow>
                </FreeSoloPopover>
            )}

        </div>
    );
});

export {ListboxItem as Item, ComboBox}

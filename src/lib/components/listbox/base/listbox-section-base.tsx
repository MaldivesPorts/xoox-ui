import type {ListboxSectionSlots, SlotsToClasses} from "../../../core/theme";

import {BaseSection, SectionProps} from "../../../utilities/aria-utils";
import {DividerProps} from "../../divider";

import {ListboxItemProps} from "../listbox-item";

export interface ListboxSectionBaseProps<T extends object = {}> extends SectionProps<"ul", T> {
  /**
   * The listbox section classNames.
   */
  classNames?: SlotsToClasses<ListboxSectionSlots>;
  /**
   * The listbox items classNames.
   */
  itemClasses?: ListboxItemProps["classNames"];
  /**
   * Shows a divider between sections
   * @default false
   */
  showDivider?: boolean;
  /**
   * The divider props
   */
  dividerProps?: DividerProps;
}

const ListboxSectionBase = BaseSection as <T extends object>(
    props: ListboxSectionBaseProps<T>,
) => JSX.Element;

export default ListboxSectionBase;

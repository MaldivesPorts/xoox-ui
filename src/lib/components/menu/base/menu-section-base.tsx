import type {MenuSectionSlots, SlotsToClasses} from "../../../core/theme";

import {BaseSection, SectionProps} from "../../../utilities/aria-utils";
import {DividerProps} from "../../divider";

import {MenuItemProps} from "../menu-item";
export interface MenuSectionBaseProps<T extends object = {}> extends SectionProps<"ul", T> {
  /**
   * The menu section classNames.
   */
  classNames?: SlotsToClasses<MenuSectionSlots>;
  /**
   * The menu items classNames.
   */
  itemClasses?: MenuItemProps["classNames"];
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

const MenuSectionBase = BaseSection as <T extends object>(
  props: MenuSectionBaseProps<T>,
) => JSX.Element;

export default MenuSectionBase;

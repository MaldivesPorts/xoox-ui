import {PopoverContent} from "../popover";
import {FocusScope} from "@react-aria/focus";
import {forwardRef} from "../../core/system";
import {Menu, MenuProps} from "../menu";

import {useDropdownContext} from "./dropdown-context";

export interface DropdownMenuProps extends Omit<MenuProps, "menuProps"> {}

const DropdownMenu = forwardRef<"ul", DropdownMenuProps>((props, ref) => {
  const {getMenuProps} = useDropdownContext();

  return (
    <PopoverContent>
      <FocusScope contain restoreFocus>
        <Menu {...getMenuProps(props, ref)} />
      </FocusScope>
    </PopoverContent>
  );
});

DropdownMenu.displayName = "MplUI.DropdownMenu";

export default DropdownMenu;

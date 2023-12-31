import {forwardRef, HTMLXooxUIProps} from "../../core/system";
import {useDOMRef} from "../../utilities/react-utils";
import {clsx} from "../../utilities/shared-utils";

import {useModalContext} from "./modal-context";

export interface ModalFooterProps extends HTMLXooxUIProps<"footer"> {}

const ModalFooter = forwardRef<"footer", ModalFooterProps>((props, ref) => {
  const {as, children, className, ...otherProps} = props;

  const {slots, classNames} = useModalContext();

  const domRef = useDOMRef(ref);

  const Component = as || "footer";

  return (
    <Component
      ref={domRef}
      className={slots.footer({class: clsx(classNames?.footer, className)})}
      {...otherProps}
    >
      {children}
    </Component>
  );
});

ModalFooter.displayName = "XooxUI.ModalFooter";

export default ModalFooter;

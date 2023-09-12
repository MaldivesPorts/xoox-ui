import {useEffect} from "react";
import {forwardRef, HTMLMplUIProps} from "../../core/system";
import {useDOMRef} from "../../utilities/react-utils";
import {clsx} from "../../utilities/shared-utils";

import {useModalContext} from "./modal-context";

export interface ModalBodyProps extends HTMLMplUIProps<"div"> {}

const ModalBody = forwardRef<"div", ModalBodyProps>((props, ref) => {
  const {as, children, className, ...otherProps} = props;

  const {slots, classNames, bodyId, setBodyMounted} = useModalContext();

  const domRef = useDOMRef(ref);

  const Component = as || "div";

  /**
   * Notify us if this component was rendered or used,
   * so we can append `aria-labelledby` automatically
   */
  useEffect(() => {
    setBodyMounted(true);

    return () => setBodyMounted(false);
  }, [setBodyMounted]);

  return (
    <Component
      ref={domRef}
      className={slots.body({class: clsx(classNames?.body, className)})}
      id={bodyId}
      {...otherProps}
    >
      {children}
    </Component>
  );
});

ModalBody.displayName = "MplUI.ModalBody";

export default ModalBody;

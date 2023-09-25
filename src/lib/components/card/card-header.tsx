import {forwardRef, HTMLXooxUIProps} from "../../core/system";
import {useDOMRef} from "../../utilities/react-utils";
import {clsx} from "../../utilities/shared-utils";

import {useCardContext} from "./card-context";

const CardHeader = forwardRef<"div", HTMLXooxUIProps<"div">>((props, ref) => {
  const {as, className, children, ...otherProps} = props;
  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const {slots, classNames} = useCardContext();

  const headerStyles = clsx(classNames?.header, className);

  return (
    <Component ref={domRef} className={slots.header?.({class: headerStyles})} {...otherProps}>
      {children}
    </Component>
  );
});

CardHeader.displayName = "XooxUI.CardHeader";

export default CardHeader;

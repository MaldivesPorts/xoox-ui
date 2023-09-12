import {forwardRef, HTMLMplUIProps} from "../../core/system";
import {useDOMRef} from "../../utilities/react-utils";
import {clsx} from "../../utilities/shared-utils";

import {useCardContext} from "./card-context";

const CardBody = forwardRef<"div", HTMLMplUIProps<"div">>((props, ref) => {
  const {as, className, children, ...otherProps} = props;

  const Component = as || "div";
  const domRef = useDOMRef(ref);

  const {slots, classNames} = useCardContext();

  const bodyStyles = clsx(classNames?.body, className);

  return (
    <Component ref={domRef} className={slots.body?.({class: bodyStyles})} {...otherProps}>
      {children}
    </Component>
  );
});

CardBody.displayName = "MplUI.CardBody";

export default CardBody;

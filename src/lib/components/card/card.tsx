import {forwardRef} from "../../core/system";
// import {Ripple} from "@nextui-org/ripple";

import {CardProvider} from "./card-context";
import {useCard, UseCardProps} from "./use-card";

export interface CardProps extends UseCardProps {}

const Card = forwardRef<"div", CardProps>((props, ref) => {
  const {
    children,
    context,
    Component,
    // ripples,
    // isPressable,
    // disableAnimation,
    // disableRipple,
    getCardProps,
  } = useCard({
    ...props,
    ref,
  });

  return (
    <Component {...getCardProps()}>
      <CardProvider value={context}>{children}</CardProvider>
      {/*{isPressable && !disableAnimation && !disableRipple && <Ripple ripples={ripples} />}*/}
    </Component>
  );
});

Card.displayName = "XooxUI.Card";

export default Card;

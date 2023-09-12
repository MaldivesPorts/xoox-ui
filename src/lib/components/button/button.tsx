import {Spinner} from "../spinner";
// import {Ripple} from "@nextui-org/ripple";
import {forwardRef} from "../../core/system";

import {UseButtonProps, useButton} from "./use-button";

export interface ButtonProps extends UseButtonProps {}

const Button = forwardRef<"button", ButtonProps>((props, ref) => {
  const {
    Component,
    domRef,
    children,
    styles,
    // ripples,
    spinnerSize,
    spinner = <Spinner color="current" size={spinnerSize} />,
    spinnerPlacement,
    startContent,
    endContent,
    isLoading,
    // disableRipple,
    getButtonProps,
  } = useButton({
    ...props,
    ref,
  });

  return (
    <Component ref={domRef} className={styles} {...getButtonProps()}>
      {startContent}
      {isLoading && spinnerPlacement === "start" && spinner}
      {children}
      {isLoading && spinnerPlacement === "end" && spinner}
      {endContent}
    </Component>
  );
});

Button.displayName = "MplUI.Button";

export default Button;

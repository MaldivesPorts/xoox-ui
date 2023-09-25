import {forwardRef} from "../../core/system";

import {UseScrollShadowProps, useScrollShadow} from "./use-scroll-shadow";

export interface ScrollShadowProps extends UseScrollShadowProps {}

const ScrollShadow = forwardRef<"div", ScrollShadowProps>((props, ref) => {
  const {Component, children, getBaseProps} = useScrollShadow({...props, ref});
  return <Component {...getBaseProps()}>{children}</Component>;
});

ScrollShadow.displayName = "XooxUI.ScrollShadow";

export default ScrollShadow;

import {forwardRef} from "../../core/system";
import {LinkIcon} from "../../utilities/shared-icons";
import {linkAnchorClasses} from "../../core/theme";

import {UseLinkProps, useLink} from "./use-link.ts";

export interface LinkProps extends UseLinkProps {}

const Link = forwardRef<"a", LinkProps>((props, ref) => {
  const {
    Component,
    children,
    showAnchorIcon,
    anchorIcon = <LinkIcon className={linkAnchorClasses} />,
    getLinkProps,
  } = useLink({
    ref,
    ...props,
  });

  return (
    <Component {...getLinkProps()}>
      <>
        {children}
        {showAnchorIcon && anchorIcon}
      </>
    </Component>
  );
});

Link.displayName = "XooxUI.Link";

export default Link;

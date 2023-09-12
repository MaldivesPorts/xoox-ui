import {forwardRef, HTMLMplUIProps} from "../../core/system";
import {useDOMRef} from "../../utilities/react-utils";

export interface PaginationCursorProps extends HTMLMplUIProps<"span"> {
  /**
   * The current active page.
   */
  activePage?: number;
}

const PaginationCursor = forwardRef<"span", PaginationCursorProps>((props, ref) => {
  const {as, activePage, ...otherProps} = props;

  const Component = as || "span";
  const domRef = useDOMRef(ref);

  return (
    <Component ref={domRef} aria-hidden={true} {...otherProps}>
      {activePage}
    </Component>
  );
});

PaginationCursor.displayName = "MplUI.PaginationCursor";

export default PaginationCursor;

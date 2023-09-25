import type {SpacerVariantProps} from "../../core/theme";
import type {HTMLXooxUIProps, PropGetter} from "../../core/system";

import {mapPropsVariants} from "../../core/system";
import {spacer} from "../../core/theme";
import {clsx, dataAttr} from "../../utilities/shared-utils";
import {ReactRef} from "../../utilities/react-utils";
import {useMemo} from "react";

import {spacing, Space} from "./utils";

interface Props extends HTMLXooxUIProps<"span"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The x-axis margin.
   * @default 1
   *
   * @see https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
   */
  x?: Space;
  /**
   * The y-axis margin.
   * @default 1
   *
   * @see https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
   */
  y?: Space;
}

export type UseSpacerProps = Props & SpacerVariantProps;

export const getMargin = (value: Space) => {
  return spacing[value] ?? value;
};

export function useSpacer(originalProps: UseSpacerProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, spacer.variantKeys);

  const {as, className, x = 1, y = 1, ...otherProps} = props;

  const Component = as || "span";

  const styles = useMemo(
    () =>
      spacer({
        ...variantProps,
        className,
      }),
    [...Object.values(variantProps), className],
  );

  const marginLeft = getMargin(x);
  const marginTop = getMargin(y);

  const getSpacerProps: PropGetter = (props = {}) => ({
    ...props,
    ...otherProps,
    "aria-hidden": dataAttr(true),
    className: clsx(styles, props.className),
    style: {
      ...props.style,
      ...otherProps.style,
      marginLeft,
      marginTop,
    },
  });

  return {Component, getSpacerProps};
}

export type UseSpacerReturn = ReturnType<typeof useSpacer>;

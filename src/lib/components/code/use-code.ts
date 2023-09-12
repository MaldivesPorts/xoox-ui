import type {CodeVariantProps} from "../../core/theme";
import type {HTMLMplUIProps, PropGetter} from "../../core/system";

import {code} from "../../core/theme";
import {mapPropsVariants} from "../../core/system";
import {ReactRef} from "../../utilities/react-utils";
import {useMemo} from "react";

export interface UseCodeProps extends HTMLMplUIProps<"code">, CodeVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
}

export function useCode(originalProps: UseCodeProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, code.variantKeys);

  const {as, children, className, ...otherProps} = props;

  const Component = as || "code";

  const classNames = useMemo(
    () =>
      code({
        ...variantProps,
        className,
      }),
    [...Object.values(variantProps), className],
  );

  const getCodeProps: PropGetter = () => {
    return {
      className: classNames,
      ...otherProps,
    };
  };

  return {Component, children, getCodeProps};
}

export type UseCodeReturn = ReturnType<typeof useCode>;

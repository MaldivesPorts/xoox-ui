import {useMemo} from "react";
import {forwardRef} from "../../core/system";

import {UseKbdProps, useKbd} from "./use-kbd.ts";
import {kbdKeysLabelMap, kbdKeysMap} from "./utils.ts";

export interface KbdProps extends UseKbdProps {}

const Kbd = forwardRef<"kbd", KbdProps>((props, ref) => {
  const {Component, children, slots, classNames, keysToRender, getKbdProps} = useKbd({
    ...props,
  });

  const keysContent = useMemo(() => {
    return keysToRender.map((key) => (
      <abbr
        key={key}
        className={slots.abbr({class: classNames?.abbr})}
        title={kbdKeysLabelMap[key]}
      >
        {kbdKeysMap[key]}
      </abbr>
    ));
  }, [keysToRender]);

  return (
    <Component ref={ref} {...getKbdProps()}>
      {keysContent}
      {children && <span className={slots.content({class: classNames?.content})}>{children}</span>}
    </Component>
  );
});

Kbd.displayName = "XooxUI.Kbd";

export default Kbd;

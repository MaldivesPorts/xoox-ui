import type {ForwardedRef, ReactElement, Ref} from "react";

import {forwardRef} from "../../core/system";

import {UseListboxProps, useListbox} from "./use-listbox";
import ListboxSection from "./listbox-section";
import ListboxItem from "./listbox-item";

interface Props<T> extends UseListboxProps<T> {}

function Listbox<T extends object>(props: Props<T>, ref: ForwardedRef<HTMLUListElement>) {
  const {Component, state, getBaseProps, color, disableAnimation, variant, itemClasses} =
    useListbox<T>({...props, ref});

  return (
    <Component {...getBaseProps()}>
      {[...state.collection].map((item) => {
        const itemProps = {
          color,
          disableAnimation,
          item,
          state,
          variant,
          ...item.props,
        };

        if (item.type === "section") {
          return <ListboxSection key={item.key} {...itemProps} itemClasses={itemClasses} />;
        }
        let listboxItem = <ListboxItem key={item.key} {...itemProps} classNames={itemClasses} />;

        if (item.wrapper) {
          listboxItem = item.wrapper(listboxItem);
        }

        return listboxItem;
      })}
    </Component>
  );
}

Listbox.displayName = "MplUI.Listbox";

export type ListboxProps<T = object> = Props<T> & {ref?: Ref<HTMLElement>};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(Listbox) as unknown as <T = object>(props: ListboxProps<T>) => ReactElement;

Listbox.displayName = "MplUI.Listbox";

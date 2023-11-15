import {
    Context,
    createContext,
    CSSProperties,
    ForwardedRef,
    ReactNode,
    RefObject,
    useContext,
    useEffect,
    useMemo
} from 'react';
import {DropOptions} from '@react-aria/dnd';
import {AriaLabelingProps, HoverEvents} from '@react-types/shared';
import {mergeProps, mergeRefs, useObjectRef} from '@react-aria/utils';
import {DOMProps as SharedDOMProps} from '@react-types/shared/src/dom';

export const slotCallbackSymbol = Symbol('callback');
export const defaultSlot = Symbol('default');
interface SlottedValue<T> {
    slots?: Record<string | symbol, T>,
    [slotCallbackSymbol]?: (value: T) => void
}
export interface StyleProps {
    /** The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. */
    className?: string,
    /** The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. */
    style?: CSSProperties
}

export interface DOMProps extends StyleProps {
    /** The children of the component. */
    children?: ReactNode
}

export interface StyleRenderProps<T> {
    /** The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. */
    className?: string | ((values: T) => string),
    /** The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. */
    style?: CSSProperties | ((values: T) => CSSProperties)
}
export interface DropZoneRenderProps {
    /**
     * Whether the dropzone is currently hovered with a mouse.
     * @selector [data-hovered]
     */
    isHovered: boolean,
    /**
     * Whether the dropzone is focused, either via a mouse or keyboard.
     * @selector [data-focused]
     */
    isFocused: boolean,
    /**
     * Whether the dropzone is keyboard focused.
     * @selector [data-focus-visible]
     */
    isFocusVisible: boolean,
    /**
     * Whether the dropzone is the drop target.
     * @selector [data-drop-target]
     */
    isDropTarget: boolean
}

export interface RenderProps<T> extends StyleRenderProps<T> {
    /** The children of the component. A function may be provided to alter the children based on component state. */
    children?: ReactNode | ((values: T) => ReactNode)
}
export type WithRef<T, E> = T & {ref?: ForwardedRef<E>};
export type SlottedContextValue<T> = SlottedValue<T> | T | null | undefined;
export type ContextValue<T, E extends Element> = SlottedContextValue<WithRef<T, E>>;
export interface DropZoneProps extends Omit<DropOptions, 'getDropOperationForPoint' | 'ref' | 'hasDropButton'>, HoverEvents, RenderProps<DropZoneRenderProps>, AriaLabelingProps {}

export function useSlottedContext<T>(context: Context<SlottedContextValue<T>>, slot?: string | null): T | null | undefined {
    let ctx = useContext(context);
    if (slot === null) {
        // An explicit `null` slot means don't use context.
        return null;
    }
    if (ctx && typeof ctx === 'object' && 'slots' in ctx && ctx.slots) {
        // @ts-ignore
        let availableSlots = new Intl.ListFormat().format(Object.keys(ctx.slots).map(p => `"${p}"`));

        if (!slot && !ctx.slots[defaultSlot]) {
            throw new Error(`A slot prop is required. Valid slot names are ${availableSlots}.`);
        }
        let slotKey = slot || defaultSlot;
        if (!ctx.slots[slotKey]) {
            // @ts-ignore
            throw new Error(`Invalid slot "${slot}". Valid slot names are ${availableSlots}.`);
        }
        return ctx.slots[slotKey];
    }
    // @ts-ignore
    return ctx;
}
export interface SlotProps {
    /**
     * A slot name for the component. Slots allow the component to receive props from a parent component.
     * An explicit `null` value indicates that the local props completely override all props received from a parent.
     */
    slot?: string | null
}
export function useContextProps<T, U extends SlotProps, E extends Element>(props: T & SlotProps, ref: ForwardedRef<E>, context: Context<ContextValue<U, E>>): [T, RefObject<E>] {
    let ctx = useSlottedContext(context, props.slot) || {};
    // @ts-ignore - TS says "Type 'unique symbol' cannot be used as an index type." but not sure why.
    let {ref: contextRef, [slotCallbackSymbol]: callback, ...contextProps} = ctx;
    let mergedRef = useObjectRef(useMemo(() => mergeRefs(ref, contextRef), [ref, contextRef]));
    let mergedProps = mergeProps(contextProps, props) as unknown as T;

    // mergeProps does not merge `style`. Adding this there might be a breaking change.
    if (
        'style' in contextProps &&
        contextProps.style &&
        typeof contextProps.style === 'object' &&
        'style' in props &&
        props.style &&
        typeof props.style === 'object'
    ) {
        // @ts-ignore
        mergedProps.style = {...contextProps.style, ...props.style};
    }

    // A parent component might need the props from a child, so call slot callback if needed.
    useEffect(() => {
        if (callback) {
            callback(props);
        }
    }, [callback, props]);

    return [mergedProps, mergedRef];
}

interface RenderPropsHookOptions<T> extends RenderProps<T>, SharedDOMProps, AriaLabelingProps {
    values: T,
    defaultChildren?: ReactNode,
    defaultClassName?: string
}

export function useRenderProps<T>(props: RenderPropsHookOptions<T>) {
    let {
        className,
        style,
        children,
        defaultClassName,
        defaultChildren,
        values
    } = props;

    return useMemo(() => {
        let computedClassName: string | undefined;
        let computedStyle: React.CSSProperties | undefined;
        let computedChildren: React.ReactNode | undefined;

        if (typeof className === 'function') {
            computedClassName = className(values);
        } else {
            computedClassName = className;
        }

        if (typeof style === 'function') {
            computedStyle = style(values);
        } else {
            computedStyle = style;
        }

        if (typeof children === 'function') {
            computedChildren = children(values);
        } else if (children == null) {
            computedChildren = defaultChildren;
        } else {
            computedChildren = children;
        }

        return {
            className: computedClassName ?? defaultClassName,
            style: computedStyle,
            children: computedChildren,
            'data-rac': ''
        };
    }, [className, style, children, defaultClassName, defaultChildren, values]);
}


export const DropZoneContext = createContext<ContextValue<DropZoneProps, HTMLDivElement>>(null);

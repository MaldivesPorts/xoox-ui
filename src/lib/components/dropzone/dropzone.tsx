/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {filterDOMProps, mergeProps, useLabels, useSlotId} from '@react-aria/utils';
// @ts-ignore
import {
    ForwardedRef,
    forwardRef,
    useRef
} from 'react';
import {useClipboard, useDrop} from '@react-aria/dnd';
import {useFocusRing} from '@react-aria/focus';
import {useHover} from '@react-aria/interactions';
import Provider from '../provider/provider.tsx';
import {VisuallyHidden} from '@react-aria/visually-hidden';
import {DropZoneContext, DropZoneProps, useContextProps, useRenderProps} from './utils.ts';


function Dropzone(props: DropZoneProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, DropZoneContext);
    let buttonRef = useRef<HTMLButtonElement>(null);
    let {dropProps, dropButtonProps, isDropTarget} = useDrop({...props, ref: buttonRef, hasDropButton: true});
    let {hoverProps, isHovered} = useHover(props);
    let {focusProps, isFocused, isFocusVisible} = useFocusRing();
    // let stringFormatter = useLocalizedStringFormatter(intlMessages);

    let textId = useSlotId();
    let dropzoneId = useSlotId();
    let ariaLabel = props['aria-label']; // || stringFormatter.format('dropzoneLabel');
    let messageId = props['aria-labelledby'];
    // Chrome + VO will not announce the drop zone's accessible name if useLabels combines an aria-label and aria-labelledby
    let ariaLabelledby = [dropzoneId, textId, messageId].filter(Boolean).join(' ');
    let labelProps = useLabels({'aria-labelledby': ariaLabelledby});

    let {clipboardProps} = useClipboard({
        onPaste: (items) => props.onDrop?.({
            type: 'drop',
            items,
            x: 0,
            y: 0,
            dropOperation: 'copy'
        })
    });

    let renderProps = useRenderProps({
        ...props,
        values: {isHovered, isFocused, isFocusVisible, isDropTarget},
        defaultClassName: 'react-aria-DropZone'
    });
    let DOMProps = filterDOMProps(props);
    delete DOMProps.id;

    return (
        <Provider>
            {/* eslint-disable-next-line */}
            <div
                {...mergeProps(dropProps, hoverProps, DOMProps)}
                {...renderProps}
                ref={ref}
                onClick={() => buttonRef.current?.focus()}
                data-hovered={isHovered || undefined}
                data-focused={isFocused || undefined}
                data-focus-visible={isFocusVisible || undefined}
                data-drop-target={isDropTarget || undefined} >
                <VisuallyHidden>
                    {/* Added as a workaround for a Chrome + VO bug where it will not announce the aria label */}
                    <div id={dropzoneId} aria-hidden="true">
                        {ariaLabel}
                    </div>
                    <button
                        {...mergeProps(dropButtonProps, focusProps, clipboardProps, labelProps)}
                        ref={buttonRef} />
                </VisuallyHidden>
                {renderProps.children}
            </div>
        </Provider>
    );
}

/**
 * A drop zone is an area into which one or multiple objects can be dragged and dropped.
 */
const _DropZone = forwardRef(Dropzone);
export {_DropZone as DropZone};

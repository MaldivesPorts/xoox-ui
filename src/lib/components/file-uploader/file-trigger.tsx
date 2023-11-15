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

import {filterDOMProps, useObjectRef} from '@react-aria/utils';
import {PressResponder} from '@react-aria/interactions';
import {ForwardedRef, forwardRef, ReactNode} from 'react';

export interface FileTriggerProps {
    /**
     * Specifies what mime type of files are allowed.
     */
    acceptedFileTypes?: Array<string>,
    /**
     * Whether multiple files can be selected.
     */
    allowsMultiple?: boolean,
    /**
     * Specifies the use of a media capture mechanism to capture the media on the spot.
     */
    defaultCamera?: 'user' | 'environment',
    /**
     * Handler when a user selects a file.
     */
    onSelect?: (files: File[]) => void,
    /**
     * The children of the component.
     */
    children?: ReactNode
}

function FileTrigger(props: FileTriggerProps, ref: ForwardedRef<HTMLInputElement>) {
    let {onSelect, acceptedFileTypes, allowsMultiple, defaultCamera, children, ...rest} = props;
    let inputRef = useObjectRef(ref);
    let domProps = filterDOMProps(rest);

    const onFileSelect = (fileList: FileList | null) => {
        if (!fileList) {
            return;
        }
        const length = fileList?.length || 0;
        const files: File[] = [];
        for (let i = 0; i < length || 0; i++) {
            const file: File | null = fileList?.item(i);
            if (file) {
                files.push(file);
            }
        }
        onSelect?.(files);
    }

    return (
        <>
            <PressResponder
                onPress={() => {
                    if (inputRef.current.value) {
                        inputRef.current.value = '';
                    }
                    inputRef.current?.click();
                }}>
                {children}
            </PressResponder>
            <input
                {...domProps}
                type="file"
                ref={inputRef}
                style={{display: 'none'}}
                accept={acceptedFileTypes?.toString()}
                onChange={(e) => onFileSelect(e.target.files)}
                capture={defaultCamera}
                multiple={allowsMultiple} />
        </>
    );
}

/**
 * A FileTrigger allows a user to access the file system with any pressable React Aria or React Spectrum component, or custom components built with usePress.
 */
const _FileTrigger = forwardRef(FileTrigger);
export {_FileTrigger  as FileTrigger};

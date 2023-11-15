import {FileTrigger} from './file-trigger.tsx';
import {Button} from '../button';
import {DropZone} from '../dropzone/dropzone.tsx';
import {FileDropItem} from '@react-types/shared';
import {useState} from 'react';
import {CloseIcon} from '../../utilities/shared-icons';

export interface FileUploaderProps {
    onSelect?: (files: File[]) => void,
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
}

const FileUploader = ({onSelect, acceptedFileTypes, allowsMultiple, defaultCamera}: FileUploaderProps) => {
    let [files, setFiles] = useState<File[]>([]);

    const onFileSelect = (fileList: File[]) => {
        onSelect?.(fileList);
        setFiles(fileList);
    }

    const remove = (index: number) => {
        files = files.filter((_, i: number) => i != index);
        onFileSelect(files);
    }

    return (
        <DropZone
            onDropEnter={console.log}
            className={'flex flex-col gap-3 border-2 border-dotted border-gray-300 rounded-md p-3 transition duration-300 data-[drop-target=true]:border-gray-400'}
            onDrop={async (e) => {
                let files = e.items.filter((file) =>
                    file.kind === 'file'
                ) as FileDropItem[];
                const filesArray = await Promise.all(files.map((file) => file.getFile()));
                onFileSelect(filesArray);
            }}
        >
            <div className="flex flex-row justify-center gap-3 items-center">
                <p className="text-xs">Drag & Drop your files or </p>
                <FileTrigger
                    onSelect={onFileSelect}
                    allowsMultiple={allowsMultiple}
                    acceptedFileTypes={acceptedFileTypes}
                    defaultCamera={defaultCamera}
                >
                    <Button variant={'bordered'} size={'sm'}>Browse</Button>
                </FileTrigger>
            </div>

            {
                files.length ?
                    <div className="flex flex-col gap-2">
                        {
                            files.map((file: File, index: number) => (
                                <div className="flex flex-row bg-gray-50 border text-xs p-2 px-3 rounded-md">
                                    <div className="flex flex-col flex-auto">
                                        <p>{file.name}</p>
                                        <small className="text-gray-700">{(file.size / 1000000).toFixed(2)} MB</small>
                                    </div>
                                    <div>
                                        <Button onClick={() => remove(index)} isIconOnly variant={'bordered'} radius={'full'} size={'sm'} aria-label="Take a photo">
                                            <CloseIcon/>
                                        </Button>
                                    </div>
                                </div>
                            ))
                        }
                    </div> : null
            }

        </DropZone>
    )
}

export {FileUploader};

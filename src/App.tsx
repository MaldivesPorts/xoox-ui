import './App.css';
import {
    Accordion, AccordionItem,
    Autocomplete,
    AutocompleteItem, BreadcrumbItem,
    Breadcrumbs,
    Button,
    ComboBox,
    ComboBoxItem,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Listbox,
    ListboxItem,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Select,
    SelectItem, Slider, Tooltip,
    useDisclosure
} from './lib';
import {useEffect, useState} from 'react';
import {FileUploader} from './lib/components/file-uploader';
import AllComponent from './AllComponents';
// const {Divider} = require('../dist/xoox-ui.js');

const DATA = [
    {key: 1,  value: 'Red Panda'},
    {key: 2,  value: 'Cats'},
    {key: 3,  value: 'Dog'},
    {key: 4,  value: 'Aardvark'},
    {key: 5,  value: 'Kangaroo'},
    {key: 6,  value: 'Snake'},
]

function App() {
    const [data, setData] = useState([]);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [valid, setInvalid] = useState(true);

    const defaultContent = 'lorem add new fields to trackingStock report'
    // useEffect(() => {
    //     fetch(
    //         // `${props.api}=${filterText}`,
    //         `https://hr-api.test/api/test`,
    //     ).then(res => res.json()).then(result => setData(result));
    // },[]);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setInvalid(false);
    //     }, 3000)
    // }, []);

    const selectFiles = (files) => {
        console.log(files);
        files.map(console.log)
    }

    return (
        <div>
            {/*<Slider*/}
            {/*    label="Temperature"*/}
            {/*    step={0.01}*/}
            {/*    maxValue={1}*/}
            {/*    minValue={0}*/}
            {/*    defaultValue={0.4}*/}
            {/*    className="max-w-md"*/}
            {/*/>*/}

            {/*<Tooltip content="I am a tooltip">*/}
            {/*    <Button>Hover me</Button>*/}
            {/*</Tooltip>*/}

            <AllComponent/>
            {/*<FileUploader allowsMultiple={true} onSelect={selectFiles}/>*/}
            {/*<Breadcrumbs>*/}
            {/*    <BreadcrumbItem>Home</BreadcrumbItem>*/}
            {/*    <BreadcrumbItem>Music</BreadcrumbItem>*/}
            {/*    <BreadcrumbItem>Artist</BreadcrumbItem>*/}
            {/*    <BreadcrumbItem>Album</BreadcrumbItem>*/}
            {/*    <BreadcrumbItem>Song</BreadcrumbItem>*/}
            {/*</Breadcrumbs>*/}
            {/*<br/><br/>*/}
            {/*<Input*/}
            {/*    type="email"*/}
            {/*    label="Email"*/}
            {/*    // placeholder={'Enter email'}*/}
            {/*    // isInvalid={true}*/}
            {/*    description={'New description'}*/}
            {/*    // errorMessage={'Please enter a valid email'}*/}
            {/*/>*/}

            {/*<br/><br/>*/}
            {/*<Input*/}
            {/*    type="email"*/}
            {/*    label="Email"*/}
            {/*    placeholder={'Enter email'}*/}
            {/*    isInvalid={!valid}*/}
            {/*    // description={'New description'}*/}
            {/*    errorMessage={valid ? '' : 'Please enter a valid email'}*/}
            {/*/>*/}


            {/*<Input*/}
            {/*    type="email"*/}
            {/*    label="Email"*/}
            {/*    placeholder={'Enter email'}/>*/}
            {/*<div className="flex flex-row">*/}
            {/*    /!*<div className="flex-auto">*!/*/}
            {/*    /!*                 <Select*!/*/}
            {/*    /!*                     items={DATA}*!/*/}
            {/*    /!*                     label="Favorite Animal"*!/*/}
            {/*    /!*                     placeholder="Select an animal"*!/*/}
            {/*    /!*                     className="max-w-xs"*!/*/}
            {/*    /!*                 >*!/*/}
            {/*    /!*                     {(animal: any) => <SelectItem key={animal.key}>{animal.name}</SelectItem>}*!/*/}
            {/*    /!*                 </Select>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*<div className="flex-auto">*/}
            {/*    <Autocomplete*/}
            {/*        // items={DATA}*/}
            {/*        placeholder="Select animal"*/}
            {/*        // onInputChange={(value: any) => setSearch(value)}*/}
            {/*        label="Favorite Animal">*/}
            {/*        /!*{*!/*/}
            {/*        /!*    (animal: any) => <AutocompleteItem key={animal.value}>{animal.value}</AutocompleteItem>*!/*/}
            {/*        /!*}*!/*/}
            {/*        <AutocompleteItem key="red">Red Panda</AutocompleteItem>*/}
            {/*        <AutocompleteItem key="cat">Cat</AutocompleteItem>*/}
            {/*        <AutocompleteItem key="dog">Dog</AutocompleteItem>*/}
            {/*        <AutocompleteItem key="aardvark">Aardvark</AutocompleteItem>*/}
            {/*        <AutocompleteItem key="kangaroo">Kangaroo</AutocompleteItem>*/}
            {/*        <AutocompleteItem key="snake">Snake</AutocompleteItem>*/}
            {/*    </Autocomplete>*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*<br/>*/}
            {/*<br/>*/}
            {/*<br/>*/}

            {/*<Select*/}
            {/*    // labelPlacement={'outside'}*/}
            {/*    items={DATA}*/}
            {/*    label="Favorite Animal"*/}
            {/*    // placeholder="Select an animal"*/}
            {/*    // isInvalid={true}*/}
            {/*    // errorMessage={'Please enter a valid email'}*/}
            {/*>*/}
            {/*    {(animal: any) => <SelectItem key={animal.key}>{animal.value}</SelectItem>}*/}
            {/*</Select>*/}


            {/*<Popover placement="right">*/}
            {/*    <PopoverTrigger>*/}
            {/*        <Button>Open Popover</Button>*/}
            {/*    </PopoverTrigger>*/}
            {/*    <PopoverContent>*/}
            {/*        <div className="px-1 py-2">*/}
            {/*            <div className="text-small font-bold">Popover Content</div>*/}
            {/*            <div className="text-tiny">This is the popover content</div>*/}
            {/*        </div>*/}
            {/*    </PopoverContent>*/}
            {/*</Popover>*/}

            {/*<Dropdown>*/}
            {/*    <DropdownTrigger>*/}
            {/*        <Button*/}
            {/*            variant="bordered"*/}
            {/*            color={'secondary'}*/}
            {/*        >*/}
            {/*            Open Menu*/}
            {/*        </Button>*/}
            {/*    </DropdownTrigger>*/}
            {/*    <DropdownMenu aria-label="Static Actions">*/}
            {/*        <DropdownItem key="new">New file</DropdownItem>*/}
            {/*        <DropdownItem key="copy">Copy link</DropdownItem>*/}
            {/*        <DropdownItem key="edit">Edit file</DropdownItem>*/}
            {/*        <DropdownItem key="delete" className="text-danger" color="danger">*/}
            {/*            Delete file*/}
            {/*        </DropdownItem>*/}
            {/*    </DropdownMenu>*/}
            {/*</Dropdown>*/}

        </div>
    )
}

export default App

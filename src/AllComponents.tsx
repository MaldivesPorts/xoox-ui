import './App.css';
import {
    Accordion, AccordionItem,
    Autocomplete,
    AutocompleteItem,
    Avatar,
    Badge, BreadcrumbItem, Breadcrumbs,
    Button,
    Card,
    CardBody,
    Checkbox,
    Chip,
    Code,
    Divider,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input, Kbd,
    Link,
    Listbox,
    ListboxItem,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Pagination,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Progress,
    Radio,
    RadioGroup,
    ScrollShadow,
    Select,
    SelectItem,
    Skeleton, Slider,
    Snippet,
    Switch,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tabs,
    Toastify, Tooltip,
    useDisclosure,
    User
} from './lib';
import {useRef, useState} from 'react';

const DATA = [
    {key: 1,  value: 'Red Panda'},
    {key: 2,  value: 'Cats'},
    {key: 3,  value: 'Dog'},
    {key: 4,  value: 'Aardvark'},
    {key: 5,  value: 'Kangaroo'},
    {key: 6,  value: 'Snake'},
]

function AllComponent() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const defaultContent =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";


    const placements: string[] = [
        "inside",
        "outside",
        "outside-left",
    ];

    const animals: any = [
        {label: "Cat", value: "cat", description: "The second most popular pet in the world"},
        {label: "Dog", value: "dog", description: "The most popular pet in the world"},
        {label: "Elephant", value: "elephant", description: "The largest land animal"},
        {label: "Lion", value: "lion", description: "The king of the jungle"},
        {label: "Tiger", value: "tiger", description: "The largest cat species"},
        {label: "Giraffe", value: "giraffe", description: "The tallest land animal"},
    ];
    return (
        <div className="flex flex-col gap-6">

            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Accordion</h1>
                <Accordion>
                    <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
                        {defaultContent}
                    </AccordionItem>
                    <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
                        {defaultContent}
                    </AccordionItem>
                    <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
                        {defaultContent}
                    </AccordionItem>
                </Accordion>
            </div>
            <Divider className="my-4" />

            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Toast</h1>
                <Button onPress={() => Toastify.add({
                    color: 'error',
                    title: 'hello',
                    description: 'Description',
                    showActionButton: true,
                    showDismissButton: true,
                    onAction: (data) => console.log('action'),
                    onDismiss: (data) => console.log('dismiss')
                }, {
                    timeout: 4000
                })}>Show Toast</Button>
            </div>
            <Divider className="my-4" />


            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Autocomplete</h1>
                <Autocomplete
                    // items={DATA}
                    placeholder="Select animal"
                    // onInputChange={(value: any) => setSearch(value)}
                    label="Favorite Animal">
                    {/*{*/}
                    {/*    (animal: any) => <AutocompleteItem key={animal.value}>{animal.value}</AutocompleteItem>*/}
                    {/*}*/}
                    <AutocompleteItem key="red">Red Panda</AutocompleteItem>
                    <AutocompleteItem key="cat">Cat</AutocompleteItem>
                    <AutocompleteItem key="dog">Dog</AutocompleteItem>
                    <AutocompleteItem key="aardvark">Aardvark</AutocompleteItem>
                    <AutocompleteItem key="kangaroo">Kangaroo</AutocompleteItem>
                    <AutocompleteItem key="snake">Snake</AutocompleteItem>
                </Autocomplete>
            </div>
            <Divider className="my-4" />
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Select</h1>
                <Select
                    items={animals}
                    label="Favorite Animal"
                    placeholder="Select an animal"
                >
                    {(animal: any) => <SelectItem key={animal.value}>{animal.label}</SelectItem>}
                </Select>
            </div>


            <Divider className="my-4" />
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Divider</h1>
                <div className="max-w-md">
                    <div className="space-y-1">
                        <h4 className="text-medium font-medium">NextUI Components</h4>
                        <p className="text-small text-default-400">Beautiful, fast and modern React UI library.</p>
                    </div>

                    <div className="flex h-5 items-center space-x-4 text-small">
                        <div>Blog</div>
                        <Divider orientation="vertical" />
                        <div>Docs</div>
                        <Divider orientation="vertical" />
                        <div>Source</div>
                    </div>
                </div>
            </div>

            <Divider className="my-4" />
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Avatar</h1>
                <div className="flex gap-3 items-center">
                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                    <Avatar name="Junior" />
                </div>
            </div>

            <Divider className="my-4" />
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Badge</h1>
                <div className="flex gap-5 items-center">
                    <Badge content="5" color="danger">
                        <Avatar
                            radius="md"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                        />
                    </Badge>
                    <Badge content="" color="success" shape="circle" placement="bottom-right">
                        <Avatar
                            radius="full"
                            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                        />
                    </Badge>
                    <Badge content="new" color="danger" size="sm">
                        <Avatar
                            isBordered
                            radius="md"
                            color="danger"
                            src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
                        />
                    </Badge>
                </div>
            </div>
            <Divider className="my-4" />
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Button</h1>
                <div className="flex flex-wrap gap-4 items-center">
                    <Button color="primary" variant="solid">
                        Solid
                    </Button>
                    <Button color="primary" variant="faded">
                        Faded
                    </Button>
                    <Button color="primary" variant="bordered">
                        Bordered
                    </Button>
                    <Button color="primary" variant="light">
                        Light
                    </Button>
                    <Button color="primary" variant="flat">
                        Flat
                    </Button>
                    <Button color="primary" variant="ghost">
                        Ghost
                    </Button>
                    <Button color="primary" variant="shadow">
                        Shadow
                    </Button>
                </div>
            </div>
            <Divider className="my-4" />
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Card</h1>
                <Card>
                    <CardBody>
                        <p>Make beautiful websites regardless of your design experience.</p>
                    </CardBody>
                </Card>
            </div>

            <Divider className="my-4" />
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Checkbox</h1>
                <div className="flex gap-4">
                    <Checkbox defaultSelected color="default">Default</Checkbox>
                    <Checkbox defaultSelected color="primary">Primary</Checkbox>
                    <Checkbox defaultSelected color="secondary">Secondary</Checkbox>
                    <Checkbox defaultSelected color="success">Success</Checkbox>
                    <Checkbox defaultSelected color="warning">Warning</Checkbox>
                    <Checkbox defaultSelected color="danger">Danger</Checkbox>
                </div>
            </div>

            <Divider className="my-4" />
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Chip</h1>
                <div className="flex gap-4">
                    <Chip color="default">Default</Chip>
                    <Chip color="primary">Primary</Chip>
                    <Chip color="secondary">Secondary</Chip>
                    <Chip color="success">Success</Chip>
                    <Chip color="warning">Warning</Chip>
                    <Chip color="danger">Danger</Chip>
                </div>
            </div>

            <Divider className="my-4" />
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Code</h1>
                <Code>npm install @nextui-org/react</Code>
            </div>

            <Divider className="my-4" />
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Dropdown</h1>
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                        >
                            Open Menu
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem key="new">New file</DropdownItem>
                        <DropdownItem key="copy">Copy link</DropdownItem>
                        <DropdownItem key="edit">Edit file</DropdownItem>
                        <DropdownItem key="delete" className="text-danger" color="danger">
                            Delete file
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>

            <Divider className="my-4" />
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Input</h1>
                <div className="flex flex-col gap-2">
                    <h3 className="text-default-500 text-small">Without placeholder</h3>
                    <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                        {placements.map((placement: string) => (
                            <Input
                                key={placement}
                                type="email"
                                label="Email"
                                labelPlacement={placement}
                                description={placement}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-default-500 text-small">With placeholder</h3>
                    <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                        {placements.map((placement: string) => (
                            <Input
                                key={placement}
                                type="email"
                                label="Email"
                                labelPlacement={placement}
                                placeholder="Enter your email"
                                description={placement}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-default-500 text-small">With placeholder</h3>
                    <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                            type="email"
                            label="Email"
                            placeholder="Enter your email"
                            description={'No description'}
                        />
                    </div>
                </div>
            </div>
            <Divider className="my-4" />
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Link</h1>
                <Link href="#">Default Link</Link>
            </div>

            <Divider className="my-4" />
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Listbox</h1>
                <Listbox
                    aria-label="Actions"
                    onAction={(key: string) => alert(key)}
                >
                    <ListboxItem key="new">New file</ListboxItem>
                    <ListboxItem key="copy">Copy link</ListboxItem>
                    <ListboxItem key="edit">Edit file</ListboxItem>
                    <ListboxItem key="delete" className="text-danger" color="danger">
                        Delete file
                    </ListboxItem>
                </Listbox>
            </div>

            <Divider className="my-4" />
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Modal</h1>
                <Button onPress={onOpen}>Open Modal</Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose: any) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                                <ModalBody>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Nullam pulvinar risus non risus hendrerit venenatis.
                                        Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Nullam pulvinar risus non risus hendrerit venenatis.
                                        Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                    </p>
                                    <p>
                                        Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                                        dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                                        Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                        Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                                        proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={onClose}>
                                        Action
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>

            <Divider className="my-4" />
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Pagination</h1>
                <Pagination total={10} initialPage={1} />
            </div>

            <Divider className="my-4" />
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Popover</h1>
                <Popover placement="bottom" showArrow={true}>
                    <PopoverTrigger>
                        <Button>Open Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="px-1 py-2">
                            <div className="text-small font-bold">Popover Content</div>
                            <div className="text-tiny">This is the popover content</div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            <Divider className="my-4" />
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Progress</h1>
                <Progress
                    size="sm"
                    isIndeterminate
                    aria-label="Loading..."
                    className="max-w-md"
                />
            </div>

            <Divider className="my-4" />
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">RadioGroup</h1>
                <RadioGroup
                    label="Select your favorite city"
                >
                    <Radio value="buenos-aires">Buenos Aires</Radio>
                    <Radio value="sydney">Sydney</Radio>
                </RadioGroup>
            </div>

            <Divider className="my-4" />
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">ScrollShadow</h1>
                <ScrollShadow className="w-[300px] h-[400px]">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem cupiditate ducimus error ipsam ipsum maiores similique sint tenetur. Dolorem est facere maiores voluptates. Accusantium ea impedit nesciunt nobis porro rerum.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem cupiditate ducimus error ipsam ipsum maiores similique sint tenetur. Dolorem est facere maiores voluptates. Accusantium ea impedit nesciunt nobis porro rerum.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem cupiditate ducimus error ipsam ipsum maiores similique sint tenetur. Dolorem est facere maiores voluptates. Accusantium ea impedit nesciunt nobis porro rerum.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem cupiditate ducimus error ipsam ipsum maiores similique sint tenetur. Dolorem est facere maiores voluptates. Accusantium ea impedit nesciunt nobis porro rerum.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem cupiditate ducimus error ipsam ipsum maiores similique sint tenetur. Dolorem est facere maiores voluptates. Accusantium ea impedit nesciunt nobis porro rerum.
                </ScrollShadow>
            </div>

            <Divider className="my-4" />
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Skeleton</h1>
                <div className="max-w-[300px] w-full flex items-center gap-3">
                    <div>
                        <Skeleton className="flex rounded-full w-12 h-12"/>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Skeleton className="h-3 w-3/5 rounded-lg"/>
                        <Skeleton className="h-3 w-4/5 rounded-lg"/>
                    </div>
                </div>
            </div>

            <Divider className="my-4" />
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Snippet</h1>
                <Snippet>npm install @nextui-org/react</Snippet>
            </div>

            <Divider className="my-4" />
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Switch</h1>
                <Switch defaultSelected aria-label="Automatic updates"/>
            </div>

            <Divider className="my-4" />
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Table</h1>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>ROLE</TableColumn>
                        <TableColumn>STATUS</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell>Tony Reichert</TableCell>
                            <TableCell>CEO</TableCell>
                            <TableCell>Active</TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell>Zoey Lang</TableCell>
                            <TableCell>Technical Lead</TableCell>
                            <TableCell>Paused</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell>Jane Fisher</TableCell>
                            <TableCell>Senior Developer</TableCell>
                            <TableCell>Active</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell>William Howard</TableCell>
                            <TableCell>Community Manager</TableCell>
                            <TableCell>Vacation</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <Divider className="my-4" />
            <div className="flex flex-col gap-3">
                <div className="flex w-full flex-col">
                    <h1 className="text-xl">Tabs</h1>
                    <Tabs aria-label="Options">
                        <Tab key="photos" title="Photos">
                            <Card>
                                <CardBody>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="music" title="Music">
                            <Card>
                                <CardBody>
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="videos" title="Videos">
                            <Card>
                                <CardBody>
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </CardBody>
                            </Card>
                        </Tab>
                    </Tabs>
                </div>
            </div>

            <Divider className="my-4" />
            <div className="flex flex-col gap-3 items-start">
                <h1 className="text-xl">User</h1>
                <User
                    name="Jane Doe"
                    description="Product Designer"
                    avatarProps={{
                        src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                    }}
                />
            </div>

            <Divider className="my-4" />
            <div className="flex flex-col gap-3 items-start">
                <h1 className="text-xl">Breadcrumbs</h1>
                <Breadcrumbs>
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Music</BreadcrumbItem>
                    <BreadcrumbItem>Artist</BreadcrumbItem>
                    <BreadcrumbItem>Album</BreadcrumbItem>
                    <BreadcrumbItem>Song</BreadcrumbItem>
                </Breadcrumbs>
            </div>

            <Divider className="my-4" />
            <div className="flex flex-col gap-3 items-start">
                <h1 className="text-xl">Slider</h1>
                <Slider
                    label="Temperature"
                    step={0.01}
                    maxValue={1}
                    minValue={0}
                    defaultValue={0.4}
                    className="max-w-md"
                />
            </div>

            <Divider className="my-4" />
            <div className="flex flex-col gap-3 items-start">
                <h1 className="text-xl">Tooltip</h1>
                <Tooltip content="I am a tooltip">
                    <Button>Hover me</Button>
                </Tooltip>
            </div>

            <Divider className="my-4" />
            <div className="flex flex-col gap-3 items-start">
                <h1 className="text-xl">Kbd</h1>
                <Kbd keys={["command"]}>K</Kbd>
            </div>

        </div>
    )
}

export default AllComponent

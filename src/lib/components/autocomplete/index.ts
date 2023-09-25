import type {ListboxItemProps, ListboxSectionProps} from "../listbox";

import {ListboxItem, ListboxSection} from "../listbox";

import Autocomplete from "./autocomplete.tsx";

// export types
export type {AutocompleteProps} from "./autocomplete.tsx";
export type {ListboxItemProps as AutocompleteItemProps};
export type {ListboxSectionProps as SelectSectionProps};
export type {AutocompleteSelectedItemProps, AutocompleteSelectedItems} from "./use-autocomplete.ts";

// export hooks
export {useAutocomplete} from "./use-autocomplete.ts";

// export component
export {Autocomplete, ListboxItem as AutocompleteItem, ListboxSection as AutocompleteSection};

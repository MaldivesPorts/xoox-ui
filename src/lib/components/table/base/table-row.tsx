import {HTMLMplUIProps} from "../../../core/system";
import {Row} from "@react-stately/table";
import {RowProps} from "@react-types/table";

export type TableRowProps<T = object> = RowProps<T> &
  Omit<HTMLMplUIProps<"tr">, keyof RowProps<T>>;

const TableRow = Row as (props: TableRowProps) => JSX.Element;

export default TableRow;

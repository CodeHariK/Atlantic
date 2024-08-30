import { type JSX } from 'solid-js';

export type TableProps = {
    heading: JSX.Element[];
    rows: JSX.Element[][];
}

export function Table(props: TableProps) {
    return <>
        <table class="w-full mt-2 text-left table-auto min-w-max over">
            <thead>
                <tr>
                    {props.heading.map((e) => (
                        <th
                            class="p-4 cursor-pointer border-y border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600">
                            <p
                                class="flex items-center justify-between font-sans text-sm  font-normal leading-none text-slate-500 dark:text-slate-100"
                            >
                                {e}
                            </p>
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {props.rows.map((row) => (
                    <tr>
                        {row.map((item) => (
                            <td class="p-4 border-b border-slate-200 dark:border-slate-600">
                                {item}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </>;
}

export type SuperTableProps = {
    table: TableProps;
    headerstart?: JSX.Element;
    headerend?: JSX.Element;
    footerstart?: JSX.Element;
    footerend?: JSX.Element;
}

export function SuperTable(props: SuperTableProps) {
    return <div class="max-w-[720px] mx-auto">
        <div class="relative flex flex-col w-full h-full bg-white dark:bg-gray-800 shadow-md rounded-xl bg-clip-border">
            {!(props.headerstart || props.headerend) ? <></> :
                <div class="relative mx-4 mt-4 overflow-hidden rounded-none bg-clip-border">
                    <div class="flex items-center justify-between ">

                        {props.headerstart}

                        {props.headerend}
                    </div>
                </div>
            }

            <Table heading={props.table.heading} rows={props.table.rows} >
            </Table>

            {!(props.footerstart || props.footerend) ? <></> :
                <div class="flex items-center justify-between p-3">
                    {props.footerstart}
                    {props.footerend}
                </div>
            }
        </div>
    </div>;
}

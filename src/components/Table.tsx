import React, { useMemo } from "react";
import { Column, useTable, useSortBy } from "react-table";
import { Table } from "reactstrap";

type TableProps = {
  data: readonly object[];
  headers: readonly Column<object>[];
  headerClassName?: string;
  tableClassName?: string;
};

const GridTable = (props: TableProps) => {
  const { headerClassName, tableClassName } = props;
  const data = useMemo(() => props.data, [props.data]);
  const columns = useMemo(() => [...props.headers], [props.headers]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy); // Add useSortBy hook here

  return (
    <div className={tableClassName ? tableClassName : "grid-table"}>
      <Table {...getTableProps()}>
        <thead className={`thead ${headerClassName}`}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={`table-row ${
                  tableClassName !== "config-grp-table" && "table-hover"
                }`}
              >
                {row.cells.map((cell: any, cellIndex) => (
                  <td
                    key={`row-${rowIndex}-cell-${cellIndex}`}
                    className={
                      cell.column?.dataClassName
                        ? cell.column?.dataClassName
                        : "cell"
                    }
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default GridTable;
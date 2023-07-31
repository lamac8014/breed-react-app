import React from "react";
import { render, screen } from "@testing-library/react";
import GridTable from "../../components/Table";

describe("GridTable component", () => {
  const sampleData: any = [
    { id: 1, name: "Bulldog", life_span: "10-12 years" },
    { id: 2, name: "Labrador", life_span: "12-14 years" },
  ];

  const sampleHeaders = [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Life Span",
      accessor: "life_span",
    },
  ];

  test("renders table headers correctly", () => {
    render(<GridTable data={sampleData} headers={sampleHeaders} />);

    for (const header of sampleHeaders) {
      const headerElement = screen.getByText(header.Header);
      expect(headerElement).toBeInTheDocument();
    }
  });

  test("renders table body rows and cell data correctly", () => {
    render(<GridTable data={sampleData} headers={sampleHeaders} />);

    for (const row of sampleData) {
      for (const header of sampleHeaders) {
        const cellElement = screen.getByText(row[header.accessor]);
        expect(cellElement).toBeInTheDocument();
      }
    }
  });

  test("applies the given headerClassName and tableClassName", () => {
    const headerClassName = "custom-header";
    const tableClassName = "custom-table";

    render(
      <GridTable
        data={sampleData}
        headers={sampleHeaders}
        headerClassName={headerClassName}
        tableClassName={tableClassName}
      />
    );

    const headerElement = screen.getByRole("table").querySelector("thead");
    expect(headerElement).toHaveClass(headerClassName);

    const tableElement = screen.getByRole("table").parentElement;
    expect(tableElement).toHaveClass(tableClassName);
  });
});

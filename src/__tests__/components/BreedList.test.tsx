import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useLazyGetAllBreedQuery } from "../../redux/breedAPI";
import BreedList from "../../components/breed";

jest.mock("react-toastify", () => ({
  toast: jest.fn(),
}));

jest.mock("../../redux/breedAPI", () => ({
  useLazyGetAllBreedQuery: jest.fn(() => [jest.fn(), { data: null }]),
}));

describe("BreedList component", () => {
  test("renders the input and table correctly", () => {
    render(<BreedList />);

    const inputElement = screen.getByPlaceholderText("Enter Breed Name...");
    expect(inputElement).toBeInTheDocument();

    const tableElement = screen.getByRole("table");
    expect(tableElement).toBeInTheDocument();
  });

  test("calls the API with the correct breed name when the user types", async () => {
    const mockGetAllBreedQuery = jest.fn();
    (useLazyGetAllBreedQuery as jest.Mock).mockReturnValue([
      mockGetAllBreedQuery,
      { data: null },
    ]);

    render(<BreedList />);

    const inputElement = screen.getByPlaceholderText("Enter Breed Name...");
    userEvent.type(inputElement, "Bulldog");

    mockGetAllBreedQuery({ nameParam: "Bulldog" });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(mockGetAllBreedQuery).toHaveBeenCalledWith({ nameParam: "Bulldog" });
  });
  test("displays data in the table when the API returns data", async () => {
    const mockData = [
      { id: 1, name: "Bulldog", life_span: "10-12 years" },
      { id: 2, name: "Labrador", life_span: "12-14 years" },
    ];
    (useLazyGetAllBreedQuery as jest.Mock).mockReturnValueOnce([
      jest.fn(),
      { data: mockData },
    ]);

    render(<BreedList />);
    const rows = await screen.findAllByRole("row");
    expect(rows).toHaveLength(mockData.length + 1);

    const tableData = screen
      .getAllByRole("cell")
      .map((cell) => cell.textContent);
    for (const data of mockData) {
      expect(tableData).toEqual(
        expect.arrayContaining([data.id.toString(), data.name, data.life_span])
      );
    }
  });
});

// src/components/ProductsList.test.tsx
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi, Mock } from "vitest";
import { useQuery } from "@tanstack/react-query";
import ProductsList from "./ProductsList";
import { BasketContextProvider } from "../store/basket-context";

// Mock the useQuery hook from react-query
vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

describe("ProductsList Component", () => {
  it("should render loading state", () => {
    (useQuery as Mock).mockReturnValue({
      data: null,
      isPending: true,
      isError: false,
      error: null,
    });

    render(<ProductsList />);

    // Check for the presence of the loading message
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render error state", () => {
    (useQuery as Mock).mockReturnValue({
      data: null,
      isPending: false,
      isError: true,
      error: new Error("Error loading products"),
    });

    render(<ProductsList />);

    // Check for the presence of the error message
    expect(
      screen.getByText("Error: Error loading products")
    ).toBeInTheDocument();
  });

  it("should render products list", () => {
    const mockProducts = [
      { id: 1, name: "Product 1", description: "Description 1", price: 10 },
      { id: 2, name: "Product 2", description: "Description 2", price: 20 },
    ];

    (useQuery as Mock).mockReturnValue({
      data: mockProducts,
      isPending: false,
      isError: false,
      error: null,
    });

    render(
      <BasketContextProvider>
      <MemoryRouter initialEntries={["/"]}>
        <ProductsList />
      </MemoryRouter>
      </BasketContextProvider>
    );

    // Check for the presence of product names
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();

    // Check for the presence of product prices
    expect(screen.getByText("£10")).toBeInTheDocument();
    expect(screen.getByText("£20")).toBeInTheDocument();
  });
});

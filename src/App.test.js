import { render } from "@testing-library/react";
import React from "react";
import App from "./App";
import TransactionContext from "./context/TransactionContext";

jest.mock("./components/CustomerRow/CustomerRow", () => () => (
    <div>CustomerRow</div>
));

describe("<App />", () => {
    it("renders without crashing", () => {
        const { getByText } = render(
            <TransactionContext.Provider value={{ customerIds: [] }}>
                <App />
            </TransactionContext.Provider>
        );

        expect(getByText("customerId")).toBeInTheDocument();
        expect(getByText("totalRewards")).toBeInTheDocument();
        expect(getByText("totalAmount")).toBeInTheDocument();
    });

    it("renders 'Loading...' when the data is loading", () => {
        const { getByText } = render(
            <TransactionContext.Provider
                value={{ customerIds: [], loading: true }}
            >
                <App />
            </TransactionContext.Provider>
        );

        expect(getByText("Loading...")).toBeInTheDocument();
    });

    it("renders error message when an error occurs", () => {
        const { getByText } = render(
            <TransactionContext.Provider
                value={{
                    customerIds: [],
                    loading: false,
                    error: { message: "Something wrong." },
                }}
            >
                <App />
            </TransactionContext.Provider>
        );

        expect(getByText("Error: Something wrong.")).toBeInTheDocument();
    });

    it("renders CustomerRow components based on the customerIds in the TransactionContext", () => {
        const customerIds = [1, 2, 3];
        const { getAllByText } = render(
            <TransactionContext.Provider value={{ customerIds }}>
                <App />
            </TransactionContext.Provider>
        );

        const rows = getAllByText("CustomerRow");
        expect(rows).toHaveLength(customerIds.length);
    });
});

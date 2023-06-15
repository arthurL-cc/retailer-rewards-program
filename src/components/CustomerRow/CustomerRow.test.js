import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import CustomerRow from "./CustomerRow";
import { useCustomerData } from "../../hooks/useCustomerData";

jest.mock("../../hooks/useCustomerData");

describe("CustomerRow", () => {
    test("renders correctly and toggles details table on click or press Enter", async () => {
        useCustomerData.mockReturnValue({
            transactionsData: [
                {
                    customerId: 1,
                    date: "March 1, 2023 at 1:06:41 PM",
                    amount: 77,
                    points: 27,
                },
            ],
            loading: false,
            error: null,
            dataMonthly: [
                {
                    March: 27,
                },
            ],
            totalAmount: 77,
            totalPoints: 27,
        });

        const { getByTestId, rerender } = render(
            <CustomerRow customerId={1} idx={0} />
        );

        expect(getByTestId("customerId-cell")).toHaveTextContent("1");
        expect(getByTestId("totalPoints-cell")).toHaveTextContent("27");
        expect(getByTestId("totalAmount-cell")).toHaveTextContent("77");

        fireEvent.click(getByTestId("customerId-cell"));

        rerender(<CustomerRow customerId="1" idx="0" />);

        await waitFor(() => {
            expect(getByTestId("detail-table")).toBeInTheDocument();
        });

        // Hide the detail table
        fireEvent.click(getByTestId("customerId-cell"));

        // Simulate Enter key press event
        fireEvent.keyDown(getByTestId("customerId-cell"), {
            key: "Enter",
            code: "Enter",
        });

        rerender(<CustomerRow customerId={1} idx={0} />);

        // Wait for the detail table to appear again
        await waitFor(() => {
            expect(getByTestId("detail-table")).toBeInTheDocument();
        });
    });
});

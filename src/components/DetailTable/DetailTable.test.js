import React from "react";
import { render } from "@testing-library/react";
import DetailTable from "./DetailTable";

describe("DetailTable", () => {
    test("renders correctly", () => {
        const curCustomerTransactionsData = [
            {
                date: "2023-06-14",
                amount: 120,
                points: 90,
            },
            {
                date: "2023-06-13",
                amount: 110,
                points: 70,
            },
        ];

        const dataMonthly = [
            {
                June: 160,
            },
        ];

        const { getByText } = render(
            <DetailTable
                curCustomerTransactionsData={curCustomerTransactionsData}
                dataMonthly={dataMonthly}
            />
        );

        // Check if month points are displayed
        expect(getByText("June")).toBeInTheDocument();
        expect(getByText("160")).toBeInTheDocument();

        // Check if transaction details are displayed
        curCustomerTransactionsData.forEach((transaction) => {
            expect(getByText(transaction.date)).toBeInTheDocument();
            expect(
                getByText(transaction.amount.toString())
            ).toBeInTheDocument();
            expect(
                getByText(transaction.points.toString())
            ).toBeInTheDocument();
        });
    });
});

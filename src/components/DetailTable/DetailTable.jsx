import React from "react";
import "./DetailTable.scss";

export default function DetailTable({
    curCustomerTransactionsData,
    dataMonthly,
}) {
    return (
        <div className="costomer-detail-table-container">
            <table
                className="customer-summary-table"
                data-testid="detail-table"
            >
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {dataMonthly.map((monthlySummary, idx) => {
                        const month = Object.keys(monthlySummary)[0];
                        const value = monthlySummary[month];
                        return (
                            <tr key={idx}>
                                <td>{month}</td>
                                <td>{value}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <table className="customer-detail-table">
                <thead>
                    <tr>
                        <th>Transaction Date</th>
                        <th>Amount</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {curCustomerTransactionsData &&
                        curCustomerTransactionsData.map((transaction, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.points}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

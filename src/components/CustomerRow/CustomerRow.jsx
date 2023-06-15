import React, { useState } from "react";
import "./CustomerRow.scss";
import { useCustomerData } from "../../hooks/useCustomerData";
import DetailTable from "../DetailTable/DetailTable";

export default function CustomerRow({ customerId, idx }) {
    const [isDetailShowing, setIsDetailShowing] = useState(false);
    const {
        curCustomerTransactionsData,
        dataMonthly,
        totalAmount,
        totalPoints,
    } = useCustomerData(customerId);

    const toggleDetail = () => {
        setIsDetailShowing((prev) => !prev);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.keyCode === "Enter") toggleDetail();
    };

    return (
        <div
            className="customer-table-container"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            data-testid={`customer-table-${customerId}`}
        >
            <div className="customer-table-row" onClick={toggleDetail}>
                <div
                    className="customer-table-row-cell"
                    data-testid="customerId-cell"
                >
                    {customerId}
                </div>
                <div
                    className="customer-table-row-cell"
                    data-testid="totalPoints-cell"
                >
                    {totalPoints}
                </div>
                <div
                    className="customer-table-row-cell"
                    data-testid="totalAmount-cell"
                >
                    {totalAmount}
                </div>
            </div>

            {isDetailShowing && (
                <DetailTable
                    curCustomerTransactionsData={curCustomerTransactionsData}
                    dataMonthly={dataMonthly}
                />
            )}
        </div>
    );
}

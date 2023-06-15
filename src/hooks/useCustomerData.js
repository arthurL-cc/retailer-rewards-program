import { useEffect, useState, useContext } from "react";
import TransactionContext from "../context/TransactionContext";
import {
    getPointsPerCustomer,
    getPointsPerTransaction,
} from "../utils/pointUtils";
import { getTotalAmount } from "../utils/customerUtils";

const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
};

export const useCustomerData = (customerId) => {
    const { allTransactions, loading, error } = useContext(TransactionContext);
    const [curCustomerTransactionsData, setCurCustomerTransactionsData] =
        useState([]);
    const [dataMonthly, setDataMonthly] = useState([]);
    const [totalPoints, setTotalPoints] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        let dataMonthlyTemp = {};
        const transactionsWithReward = allTransactions
            .filter((transaction) => transaction.customerId === customerId)
            .sort((a, b) => a.date - b.date) // sort in ascending order by date
            .map((transaction) => {
                const points = getPointsPerTransaction(transaction.amount);
                const month = transaction.date.toLocaleString("default", {
                    month: "long",
                });

                if (!dataMonthlyTemp.hasOwnProperty(month)) {
                    dataMonthlyTemp[month] = 0;
                }
                dataMonthlyTemp[month] += points;
                return {
                    ...transaction,
                    date: transaction.date.toLocaleString(
                        undefined,
                        dateOptions
                    ),
                    points: points,
                };
            });

        setCurCustomerTransactionsData(transactionsWithReward);
        setTotalPoints(getPointsPerCustomer(transactionsWithReward));
        setTotalAmount(getTotalAmount(transactionsWithReward));

        const dataMonthlyArray = Object.entries(dataMonthlyTemp).map(
            // get the monthly points summary for current customer
            ([key, value]) => ({
                [key]: value,
            })
        );

        setDataMonthly(dataMonthlyArray);
    }, [customerId, allTransactions]);

    return {
        curCustomerTransactionsData,
        loading,
        error,
        dataMonthly,
        totalAmount,
        totalPoints,
    };
};

import React, { useEffect, useState } from "react";
import TransactionContext from "./TransactionContext";
import { getTransactions } from "../services/api";

export default function TransactionProvider({ children }) {
    const [allTransactions, setAllTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [customerIds, setCustomerIds] = useState([]);

    useEffect(() => {
        getTransactions()
            .then((transactions) => {
                setAllTransactions(transactions);
                setLoading(false);
                setCustomerIds([
                    ...new Set(
                        transactions.map(
                            (transaction) => transaction.customerId
                        )
                    ),
                ]);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    return (
        <TransactionContext.Provider
            value={{ allTransactions, loading, error, customerIds }}
        >
            {children}
        </TransactionContext.Provider>
    );
}

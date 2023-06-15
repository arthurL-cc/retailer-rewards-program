function randomDateGenerator(start, end) {
    const date = new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );

    return date;
}

export function generateMockData(customerCount, transactionCount) {
    const customers = [...Array(customerCount).keys()];
    const data = customers.map((customerId) => {
        const transactions = [...Array(transactionCount).keys()].map(() => ({
            customerId,
            date: randomDateGenerator(
                // Generate random date from 2023-3-1 to 2023-5-31
                new Date(2023, 2, 1),
                new Date(2023, 4, 31)
            ),
            amount: Math.floor(Math.random() * 200) + 1,
        }));
        return transactions;
    });

    return data.flat();
}

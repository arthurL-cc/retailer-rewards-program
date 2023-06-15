export function getTotalAmount(data) {
    return data.reduce((acc, transaction) => acc + transaction.amount, 0);
}

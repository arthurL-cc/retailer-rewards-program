export function getPointsPerTransaction(amount) {
    let points = 0;

    if (amount > 100) {
        points += (amount - 100) * 2 + 50;
    } else if (50 < amount && amount <= 100) {
        points += amount - 50;
    }

    return points;
}

export function getPointsPerCustomer(transactions) {
    const totalPointsPerUser = transactions.reduce(
        (acc, transaction) => acc + transaction.points,
        0
    );
    return totalPointsPerUser;
}

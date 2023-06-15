import { generateMockData } from "../utils/dataGenerator";

const transactions = generateMockData(15, 20);

export function getTransactions() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(transactions);
        }, 500);
    });
}

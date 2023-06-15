import { generateMockData } from "./dataGenerator";
import { getPointsPerCustomer, getPointsPerTransaction } from "./pointUtils";
import { getTotalAmount } from "./customerUtils";

describe("Utils", () => {
    describe("generateMockData", () => {
        it("generates the correct number of mock transactions", () => {
            const data = generateMockData(5, 3);
            expect(data.length).toBe(15);
            data.forEach((transaction) => {
                expect(transaction).toHaveProperty("customerId");
                expect(transaction).toHaveProperty("date");
                expect(transaction).toHaveProperty("amount");
            });
        });
    });

    describe("getPointsPerTransaction", () => {
        it("calculates points correctly", () => {
            expect(getPointsPerTransaction(50)).toBe(0);
            expect(getPointsPerTransaction(100)).toBe(50);
            expect(getPointsPerTransaction(120)).toBe(90);
            expect(getPointsPerTransaction(150)).toBe(150);
        });
    });

    describe("getPointsPerCustomer", () => {
        it("sums points for multiple transactions", () => {
            const transactions = [
                { points: 10 },
                { points: 20 },
                { points: 30 },
            ];
            expect(getPointsPerCustomer(transactions)).toBe(60);
        });
    });

    describe("getTotalAmount", () => {
        it("sums amounts for multiple transactions", () => {
            const transactions = [
                { amount: 10 },
                { amount: 20 },
                { amount: 30 },
            ];
            expect(getTotalAmount(transactions)).toBe(60);
        });
    });
});

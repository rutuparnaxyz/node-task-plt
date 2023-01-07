import stockService from "../services/stocks.service";

describe("stocks.service.ts", () => {
    it("should return result for sku: 'CPF246874/77/33'", async () => {
        expect(await stockService.getCurrentStockLevels('CPF246874/77/33')).toStrictEqual({"sku":"CPF246874/77/33","qty":5289});
    });
    it("should return result for sku: 'LCF762340/73/78'", async () => {
        expect(await stockService.getCurrentStockLevels('LCF762340/73/78')).toStrictEqual({"sku":"LCF762340/73/78","qty":595});
    });
    it("should throw error for sku: 'ROOT762340/73/78'", async () => {
        expect(async () => await stockService.getCurrentStockLevels('ROOT762340/73/78')).rejects.toThrow(Error);
    });
});
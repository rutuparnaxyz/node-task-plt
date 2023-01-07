import { IResponse } from "../interfaces/response.interface";
import repository from '../data/repository';
import * as _ from 'lodash';
import logger from "../utils/logger";
import { IStock } from "../interfaces/stock.interface";
import { ITransaction } from "../interfaces/transaction.interface";

async function getCurrentStockLevels(sku: string): Promise<IResponse> {
    try {
        const stocks: IStock[] = await repository.getStocks();
        const transactions: ITransaction[] = await repository.getTransactions();
        let queriedStock: IStock = stocks.find(stock => stock.sku === sku);
        let queriedTransactions: ITransaction[] = transactions.filter(transaction => transaction.sku === sku);
        console.log(queriedStock, queriedTransactions)
        // Check if SKU is present in any of the files otherwise throw error.
        if (!queriedStock && queriedTransactions.length <= 0) {
            logger.error(`SKU does not exist : ${sku}`);
            throw new Error(`SKU does not exist : ${sku}`);
        }
        let stockValue: number = _.get(queriedStock, 'stock', 0);
        _.each(queriedTransactions, (transaction) => {
            if (transaction.type === 'order') {
                stockValue -= transaction.qty;
            } else {
                stockValue += transaction.qty;
            }
        })
        return { sku: sku, qty: stockValue };
    } catch (error : any) {
        console.log(error);
        logger.error(error);
        return error.message;
    }
}

export default {
    getCurrentStockLevels
}
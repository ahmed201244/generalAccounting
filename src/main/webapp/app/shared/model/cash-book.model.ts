import { Moment } from 'moment';
import { ICurrency } from 'app/shared/model/currency.model';
import { IGeneralAccount } from 'app/shared/model/general-account.model';

export const enum TransactionType {
    CREDIT = 'CREDIT',
    DEBIT = 'DEBIT'
}

export interface ICashBook {
    id?: number;
    date?: Moment;
    amount?: number;
    transactionType?: TransactionType;
    uuid?: string;
    tansactionCurrency?: ICurrency;
    fromAccount?: IGeneralAccount;
    toAccount?: IGeneralAccount;
}

export class CashBook implements ICashBook {
    constructor(
        public id?: number,
        public date?: Moment,
        public amount?: number,
        public transactionType?: TransactionType,
        public uuid?: string,
        public tansactionCurrency?: ICurrency,
        public fromAccount?: IGeneralAccount,
        public toAccount?: IGeneralAccount
    ) {}
}

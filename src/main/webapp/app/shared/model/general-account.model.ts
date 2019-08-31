import { ICurrency } from 'app/shared/model/currency.model';

export const enum AccountType {
    ASSET = 'ASSET',
    LIABILITY = 'LIABILITY',
    INCOME = 'INCOME',
    EXPENDITURE = 'EXPENDITURE',
    MEMORANDUM = 'MEMORANDUM',
    CAPITAL = 'CAPITAL',
    DRAWING = 'DRAWING'
}

export interface IGeneralAccount {
    id?: number;
    code?: string;
    description?: string;
    type?: AccountType;
    generalAccountCurrency?: ICurrency;
}

export class GeneralAccount implements IGeneralAccount {
    constructor(
        public id?: number,
        public code?: string,
        public description?: string,
        public type?: AccountType,
        public generalAccountCurrency?: ICurrency
    ) {}
}

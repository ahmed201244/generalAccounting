import { Moment } from 'moment';
import { IGeneralAccount } from 'app/shared/model/general-account.model';

export interface IGeneralLedger {
    id?: number;
    date?: Moment;
    transactionsSumDr?: number;
    transactionsSumCr?: number;
    balanceSumDr?: number;
    balanceSumCr?: number;
    accountLedger?: IGeneralAccount;
}

export class GeneralLedger implements IGeneralLedger {
    constructor(
        public id?: number,
        public date?: Moment,
        public transactionsSumDr?: number,
        public transactionsSumCr?: number,
        public balanceSumDr?: number,
        public balanceSumCr?: number,
        public accountLedger?: IGeneralAccount
    ) {}
}

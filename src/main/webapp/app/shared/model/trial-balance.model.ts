import { IGeneralAccount } from 'app/shared/model/general-account.model';

export interface ITrialBalance {
    id?: number;
    debit?: number;
    credit?: number;
    trialBalance?: IGeneralAccount;
}

export class TrialBalance implements ITrialBalance {
    constructor(public id?: number, public debit?: number, public credit?: number, public trialBalance?: IGeneralAccount) {}
}

export interface IBalanceSheet {
    id?: number;
    isprocessed?: boolean;
}

export class BalanceSheet implements IBalanceSheet {
    constructor(public id?: number, public isprocessed?: boolean) {
        this.isprocessed = this.isprocessed || false;
    }
}

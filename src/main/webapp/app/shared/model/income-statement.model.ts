export interface IIncomeStatement {
    id?: number;
    isprocessed?: boolean;
}

export class IncomeStatement implements IIncomeStatement {
    constructor(public id?: number, public isprocessed?: boolean) {
        this.isprocessed = this.isprocessed || false;
    }
}

export interface ICurrency {
    id?: number;
    code?: string;
    description?: string;
    exchangeRate?: number;
}

export class Currency implements ICurrency {
    constructor(public id?: number, public code?: string, public description?: string, public exchangeRate?: number) {}
}

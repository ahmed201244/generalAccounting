export interface ICurrency {
    id?: number;
    code?: string;
    description?: string;
}

export class Currency implements ICurrency {
    constructor(public id?: number, public code?: string, public description?: string) {}
}

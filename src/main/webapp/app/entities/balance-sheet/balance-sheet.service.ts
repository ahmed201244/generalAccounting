import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBalanceSheet } from 'app/shared/model/balance-sheet.model';

type EntityResponseType = HttpResponse<IBalanceSheet>;
type EntityArrayResponseType = HttpResponse<IBalanceSheet[]>;

@Injectable({ providedIn: 'root' })
export class BalanceSheetService {
    public resourceUrl = SERVER_API_URL + 'api/balance-sheets';

    constructor(protected http: HttpClient) {}

    create(balanceSheet: IBalanceSheet): Observable<EntityResponseType> {
        return this.http.post<IBalanceSheet>(this.resourceUrl, balanceSheet, { observe: 'response' });
    }

    update(balanceSheet: IBalanceSheet): Observable<EntityResponseType> {
        return this.http.put<IBalanceSheet>(this.resourceUrl, balanceSheet, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IBalanceSheet>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IBalanceSheet[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    getPDF() {
        const httpOptions = { responseType: 'arraybuffer' as 'json' };
        console.log(SERVER_API_URL + 'api/Balance-Sheet');
        return this.http.get<any>(SERVER_API_URL + 'api/Balance-Sheet', httpOptions);
    }
}

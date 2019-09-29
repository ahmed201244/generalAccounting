import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IIncomeStatement } from 'app/shared/model/income-statement.model';

type EntityResponseType = HttpResponse<IIncomeStatement>;
type EntityArrayResponseType = HttpResponse<IIncomeStatement[]>;

@Injectable({ providedIn: 'root' })
export class IncomeStatementService {
    public resourceUrl = SERVER_API_URL + 'api/Income-Statement';

    constructor(protected http: HttpClient) {}

    create(incomeStatement: IIncomeStatement): Observable<EntityResponseType> {
        return this.http.post<IIncomeStatement>(this.resourceUrl, incomeStatement, { observe: 'response' });
    }

    update(incomeStatement: IIncomeStatement): Observable<EntityResponseType> {
        return this.http.put<IIncomeStatement>(this.resourceUrl, incomeStatement, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IIncomeStatement>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IIncomeStatement[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    getPDF() {
        const httpOptions = { responseType: 'arraybuffer' as 'json' };
        console.log(SERVER_API_URL + 'api/Income-Statement');
        return this.http.get<any>(this.resourceUrl, httpOptions);
    }
}

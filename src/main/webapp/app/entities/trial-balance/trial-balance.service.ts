import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITrialBalance } from 'app/shared/model/trial-balance.model';

type EntityResponseType = HttpResponse<ITrialBalance>;
type EntityArrayResponseType = HttpResponse<ITrialBalance[]>;

@Injectable({ providedIn: 'root' })
export class TrialBalanceService {
    public resourceUrl = SERVER_API_URL + 'api/trial-balances';

    constructor(protected http: HttpClient) {}

    create(trialBalance: ITrialBalance): Observable<EntityResponseType> {
        return this.http.post<ITrialBalance>(this.resourceUrl, trialBalance, { observe: 'response' });
    }

    update(trialBalance: ITrialBalance): Observable<EntityResponseType> {
        return this.http.put<ITrialBalance>(this.resourceUrl, trialBalance, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITrialBalance>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITrialBalance[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

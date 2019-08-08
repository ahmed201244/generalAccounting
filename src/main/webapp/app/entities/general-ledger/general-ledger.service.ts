import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGeneralLedger } from 'app/shared/model/general-ledger.model';

type EntityResponseType = HttpResponse<IGeneralLedger>;
type EntityArrayResponseType = HttpResponse<IGeneralLedger[]>;

@Injectable({ providedIn: 'root' })
export class GeneralLedgerService {
    public resourceUrl = SERVER_API_URL + 'api/general-ledgers';

    constructor(protected http: HttpClient) {}

    create(generalLedger: IGeneralLedger): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(generalLedger);
        return this.http
            .post<IGeneralLedger>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(generalLedger: IGeneralLedger): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(generalLedger);
        return this.http
            .put<IGeneralLedger>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IGeneralLedger>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IGeneralLedger[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(generalLedger: IGeneralLedger): IGeneralLedger {
        const copy: IGeneralLedger = Object.assign({}, generalLedger, {
            date: generalLedger.date != null && generalLedger.date.isValid() ? generalLedger.date.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.date = res.body.date != null ? moment(res.body.date) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((generalLedger: IGeneralLedger) => {
                generalLedger.date = generalLedger.date != null ? moment(generalLedger.date) : null;
            });
        }
        return res;
    }
}

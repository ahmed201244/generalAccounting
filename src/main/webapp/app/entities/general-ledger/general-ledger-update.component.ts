import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IGeneralLedger } from 'app/shared/model/general-ledger.model';
import { GeneralLedgerService } from './general-ledger.service';
import { IGeneralAccount } from 'app/shared/model/general-account.model';
import { GeneralAccountService } from 'app/entities/general-account';

@Component({
    selector: 'jhi-general-ledger-update',
    templateUrl: './general-ledger-update.component.html'
})
export class GeneralLedgerUpdateComponent implements OnInit {
    generalLedger: IGeneralLedger;
    isSaving: boolean;

    accountledgers: IGeneralAccount[];
    date: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected generalLedgerService: GeneralLedgerService,
        protected generalAccountService: GeneralAccountService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ generalLedger }) => {
            this.generalLedger = generalLedger;
            this.date = this.generalLedger.date != null ? this.generalLedger.date.format(DATE_TIME_FORMAT) : null;
        });
        this.generalAccountService
            .query({ filter: 'generalledger-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IGeneralAccount[]>) => mayBeOk.ok),
                map((response: HttpResponse<IGeneralAccount[]>) => response.body)
            )
            .subscribe(
                (res: IGeneralAccount[]) => {
                    if (!this.generalLedger.accountLedger || !this.generalLedger.accountLedger.id) {
                        this.accountledgers = res;
                    } else {
                        this.generalAccountService
                            .find(this.generalLedger.accountLedger.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IGeneralAccount>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IGeneralAccount>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IGeneralAccount) => (this.accountledgers = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.generalLedger.date = this.date != null ? moment(this.date, DATE_TIME_FORMAT) : null;
        if (this.generalLedger.id !== undefined) {
            this.subscribeToSaveResponse(this.generalLedgerService.update(this.generalLedger));
        } else {
            this.subscribeToSaveResponse(this.generalLedgerService.create(this.generalLedger));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IGeneralLedger>>) {
        result.subscribe((res: HttpResponse<IGeneralLedger>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackGeneralAccountById(index: number, item: IGeneralAccount) {
        return item.id;
    }
}

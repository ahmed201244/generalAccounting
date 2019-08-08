import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITrialBalance } from 'app/shared/model/trial-balance.model';
import { TrialBalanceService } from './trial-balance.service';
import { IGeneralAccount } from 'app/shared/model/general-account.model';
import { GeneralAccountService } from 'app/entities/general-account';

@Component({
    selector: 'jhi-trial-balance-update',
    templateUrl: './trial-balance-update.component.html'
})
export class TrialBalanceUpdateComponent implements OnInit {
    trialBalance: ITrialBalance;
    isSaving: boolean;

    trialbalances: IGeneralAccount[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected trialBalanceService: TrialBalanceService,
        protected generalAccountService: GeneralAccountService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ trialBalance }) => {
            this.trialBalance = trialBalance;
        });
        this.generalAccountService
            .query({ filter: 'trialbalance-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IGeneralAccount[]>) => mayBeOk.ok),
                map((response: HttpResponse<IGeneralAccount[]>) => response.body)
            )
            .subscribe(
                (res: IGeneralAccount[]) => {
                    if (!this.trialBalance.trialBalance || !this.trialBalance.trialBalance.id) {
                        this.trialbalances = res;
                    } else {
                        this.generalAccountService
                            .find(this.trialBalance.trialBalance.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IGeneralAccount>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IGeneralAccount>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IGeneralAccount) => (this.trialbalances = [subRes].concat(res)),
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
        if (this.trialBalance.id !== undefined) {
            this.subscribeToSaveResponse(this.trialBalanceService.update(this.trialBalance));
        } else {
            this.subscribeToSaveResponse(this.trialBalanceService.create(this.trialBalance));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITrialBalance>>) {
        result.subscribe((res: HttpResponse<ITrialBalance>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

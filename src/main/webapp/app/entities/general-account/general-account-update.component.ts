import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IGeneralAccount } from 'app/shared/model/general-account.model';
import { GeneralAccountService } from './general-account.service';
import { ICurrency } from 'app/shared/model/currency.model';
import { CurrencyService } from 'app/entities/currency';

@Component({
    selector: 'jhi-general-account-update',
    templateUrl: './general-account-update.component.html'
})
export class GeneralAccountUpdateComponent implements OnInit {
    generalAccount: IGeneralAccount;
    isSaving: boolean;

    currencies: ICurrency[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected generalAccountService: GeneralAccountService,
        protected currencyService: CurrencyService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ generalAccount }) => {
            this.generalAccount = generalAccount;
        });
        this.currencyService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICurrency[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICurrency[]>) => response.body)
            )
            .subscribe((res: ICurrency[]) => (this.currencies = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.generalAccount.id !== undefined) {
            this.subscribeToSaveResponse(this.generalAccountService.update(this.generalAccount));
        } else {
            this.subscribeToSaveResponse(this.generalAccountService.create(this.generalAccount));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IGeneralAccount>>) {
        result.subscribe((res: HttpResponse<IGeneralAccount>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCurrencyById(index: number, item: ICurrency) {
        return item.id;
    }
}

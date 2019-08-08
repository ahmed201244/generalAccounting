import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ICashBook } from 'app/shared/model/cash-book.model';
import { CashBookService } from './cash-book.service';
import { ICurrency } from 'app/shared/model/currency.model';
import { CurrencyService } from 'app/entities/currency';
import { IGeneralAccount } from 'app/shared/model/general-account.model';
import { GeneralAccountService } from 'app/entities/general-account';

@Component({
    selector: 'jhi-cash-book-update',
    templateUrl: './cash-book-update.component.html'
})
export class CashBookUpdateComponent implements OnInit {
    cashBook: ICashBook;
    isSaving: boolean;

    currencies: ICurrency[];

    generalaccounts: IGeneralAccount[];
    date: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected cashBookService: CashBookService,
        protected currencyService: CurrencyService,
        protected generalAccountService: GeneralAccountService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cashBook }) => {
            this.cashBook = cashBook;
            this.date = this.cashBook.date != null ? this.cashBook.date.format(DATE_TIME_FORMAT) : null;
        });
        this.currencyService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICurrency[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICurrency[]>) => response.body)
            )
            .subscribe((res: ICurrency[]) => (this.currencies = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.generalAccountService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IGeneralAccount[]>) => mayBeOk.ok),
                map((response: HttpResponse<IGeneralAccount[]>) => response.body)
            )
            .subscribe((res: IGeneralAccount[]) => (this.generalaccounts = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.cashBook.date = this.date != null ? moment(this.date, DATE_TIME_FORMAT) : null;
        if (this.cashBook.id !== undefined) {
            this.subscribeToSaveResponse(this.cashBookService.update(this.cashBook));
        } else {
            this.subscribeToSaveResponse(this.cashBookService.create(this.cashBook));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICashBook>>) {
        result.subscribe((res: HttpResponse<ICashBook>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackGeneralAccountById(index: number, item: IGeneralAccount) {
        return item.id;
    }
}

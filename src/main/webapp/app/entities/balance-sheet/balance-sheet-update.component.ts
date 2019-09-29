import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IBalanceSheet } from 'app/shared/model/balance-sheet.model';
import { BalanceSheetService } from './balance-sheet.service';

@Component({
    selector: 'jhi-balance-sheet-update',
    templateUrl: './balance-sheet-update.component.html'
})
export class BalanceSheetUpdateComponent implements OnInit {
    balanceSheet: IBalanceSheet;
    isSaving: boolean;

    constructor(protected balanceSheetService: BalanceSheetService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ balanceSheet }) => {
            this.balanceSheet = balanceSheet;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.balanceSheet.id !== undefined) {
            this.subscribeToSaveResponse(this.balanceSheetService.update(this.balanceSheet));
        } else {
            this.subscribeToSaveResponse(this.balanceSheetService.create(this.balanceSheet));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBalanceSheet>>) {
        result.subscribe((res: HttpResponse<IBalanceSheet>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}

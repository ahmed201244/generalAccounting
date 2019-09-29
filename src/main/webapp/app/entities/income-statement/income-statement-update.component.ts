import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IIncomeStatement } from 'app/shared/model/income-statement.model';
import { IncomeStatementService } from './income-statement.service';

@Component({
    selector: 'jhi-income-statement-update',
    templateUrl: './income-statement-update.component.html'
})
export class IncomeStatementUpdateComponent implements OnInit {
    incomeStatement: IIncomeStatement;
    isSaving: boolean;

    constructor(protected incomeStatementService: IncomeStatementService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ incomeStatement }) => {
            this.incomeStatement = incomeStatement;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.incomeStatement.id !== undefined) {
            this.subscribeToSaveResponse(this.incomeStatementService.update(this.incomeStatement));
        } else {
            this.subscribeToSaveResponse(this.incomeStatementService.create(this.incomeStatement));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IIncomeStatement>>) {
        result.subscribe((res: HttpResponse<IIncomeStatement>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}

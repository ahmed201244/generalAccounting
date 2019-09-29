import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIncomeStatement } from 'app/shared/model/income-statement.model';

@Component({
    selector: 'jhi-income-statement-detail',
    templateUrl: './income-statement-detail.component.html'
})
export class IncomeStatementDetailComponent implements OnInit {
    incomeStatement: IIncomeStatement;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ incomeStatement }) => {
            this.incomeStatement = incomeStatement;
        });
    }

    previousState() {
        window.history.back();
    }
}

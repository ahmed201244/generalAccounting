import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBalanceSheet } from 'app/shared/model/balance-sheet.model';

@Component({
    selector: 'jhi-balance-sheet-detail',
    templateUrl: './balance-sheet-detail.component.html'
})
export class BalanceSheetDetailComponent implements OnInit {
    balanceSheet: IBalanceSheet;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ balanceSheet }) => {
            this.balanceSheet = balanceSheet;
        });
    }

    previousState() {
        window.history.back();
    }
}

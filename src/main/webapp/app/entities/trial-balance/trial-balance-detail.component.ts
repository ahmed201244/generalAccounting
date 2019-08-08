import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITrialBalance } from 'app/shared/model/trial-balance.model';

@Component({
    selector: 'jhi-trial-balance-detail',
    templateUrl: './trial-balance-detail.component.html'
})
export class TrialBalanceDetailComponent implements OnInit {
    trialBalance: ITrialBalance;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ trialBalance }) => {
            this.trialBalance = trialBalance;
        });
    }

    previousState() {
        window.history.back();
    }
}

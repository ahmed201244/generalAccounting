import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGeneralLedger } from 'app/shared/model/general-ledger.model';

@Component({
    selector: 'jhi-general-ledger-detail',
    templateUrl: './general-ledger-detail.component.html'
})
export class GeneralLedgerDetailComponent implements OnInit {
    generalLedger: IGeneralLedger;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ generalLedger }) => {
            this.generalLedger = generalLedger;
        });
    }

    previousState() {
        window.history.back();
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGeneralAccount } from 'app/shared/model/general-account.model';

@Component({
    selector: 'jhi-general-account-detail',
    templateUrl: './general-account-detail.component.html'
})
export class GeneralAccountDetailComponent implements OnInit {
    generalAccount: IGeneralAccount;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ generalAccount }) => {
            this.generalAccount = generalAccount;
        });
    }

    previousState() {
        window.history.back();
    }
}

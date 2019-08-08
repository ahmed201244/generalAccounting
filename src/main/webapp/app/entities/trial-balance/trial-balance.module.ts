import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GeneralAccountingSharedModule } from 'app/shared';
import {
    TrialBalanceComponent,
    TrialBalanceDetailComponent,
    TrialBalanceUpdateComponent,
    TrialBalanceDeletePopupComponent,
    TrialBalanceDeleteDialogComponent,
    trialBalanceRoute,
    trialBalancePopupRoute
} from './';

const ENTITY_STATES = [...trialBalanceRoute, ...trialBalancePopupRoute];

@NgModule({
    imports: [GeneralAccountingSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TrialBalanceComponent,
        TrialBalanceDetailComponent,
        TrialBalanceUpdateComponent,
        TrialBalanceDeleteDialogComponent,
        TrialBalanceDeletePopupComponent
    ],
    entryComponents: [
        TrialBalanceComponent,
        TrialBalanceUpdateComponent,
        TrialBalanceDeleteDialogComponent,
        TrialBalanceDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeneralAccountingTrialBalanceModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}

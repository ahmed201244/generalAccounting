import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GeneralAccountingSharedModule } from 'app/shared';
import {
    IncomeStatementComponent,
    IncomeStatementDetailComponent,
    IncomeStatementUpdateComponent,
    IncomeStatementDeletePopupComponent,
    IncomeStatementDeleteDialogComponent,
    incomeStatementRoute,
    incomeStatementPopupRoute
} from './';

const ENTITY_STATES = [...incomeStatementRoute, ...incomeStatementPopupRoute];

@NgModule({
    imports: [GeneralAccountingSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        IncomeStatementComponent,
        IncomeStatementDetailComponent,
        IncomeStatementUpdateComponent,
        IncomeStatementDeleteDialogComponent,
        IncomeStatementDeletePopupComponent
    ],
    entryComponents: [
        IncomeStatementComponent,
        IncomeStatementUpdateComponent,
        IncomeStatementDeleteDialogComponent,
        IncomeStatementDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeneralAccountingIncomeStatementModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GeneralAccountingSharedModule } from 'app/shared';
import {
    BalanceSheetComponent,
    BalanceSheetDetailComponent,
    BalanceSheetUpdateComponent,
    BalanceSheetDeletePopupComponent,
    BalanceSheetDeleteDialogComponent,
    balanceSheetRoute,
    balanceSheetPopupRoute
} from './';

const ENTITY_STATES = [...balanceSheetRoute, ...balanceSheetPopupRoute];

@NgModule({
    imports: [GeneralAccountingSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BalanceSheetComponent,
        BalanceSheetDetailComponent,
        BalanceSheetUpdateComponent,
        BalanceSheetDeleteDialogComponent,
        BalanceSheetDeletePopupComponent
    ],
    entryComponents: [
        BalanceSheetComponent,
        BalanceSheetUpdateComponent,
        BalanceSheetDeleteDialogComponent,
        BalanceSheetDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeneralAccountingBalanceSheetModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}

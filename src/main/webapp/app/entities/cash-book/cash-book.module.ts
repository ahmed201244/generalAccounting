import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GeneralAccountingSharedModule } from 'app/shared';
import {
    CashBookComponent,
    CashBookDetailComponent,
    CashBookUpdateComponent,
    CashBookDeletePopupComponent,
    CashBookDeleteDialogComponent,
    cashBookRoute,
    cashBookPopupRoute
} from './';

const ENTITY_STATES = [...cashBookRoute, ...cashBookPopupRoute];

@NgModule({
    imports: [GeneralAccountingSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CashBookComponent,
        CashBookDetailComponent,
        CashBookUpdateComponent,
        CashBookDeleteDialogComponent,
        CashBookDeletePopupComponent
    ],
    entryComponents: [CashBookComponent, CashBookUpdateComponent, CashBookDeleteDialogComponent, CashBookDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeneralAccountingCashBookModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GeneralAccountingSharedModule } from 'app/shared';
import {
    GeneralLedgerComponent,
    GeneralLedgerDetailComponent,
    GeneralLedgerUpdateComponent,
    GeneralLedgerDeletePopupComponent,
    GeneralLedgerDeleteDialogComponent,
    generalLedgerRoute,
    generalLedgerPopupRoute
} from './';

const ENTITY_STATES = [...generalLedgerRoute, ...generalLedgerPopupRoute];

@NgModule({
    imports: [GeneralAccountingSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GeneralLedgerComponent,
        GeneralLedgerDetailComponent,
        GeneralLedgerUpdateComponent,
        GeneralLedgerDeleteDialogComponent,
        GeneralLedgerDeletePopupComponent
    ],
    entryComponents: [
        GeneralLedgerComponent,
        GeneralLedgerUpdateComponent,
        GeneralLedgerDeleteDialogComponent,
        GeneralLedgerDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeneralAccountingGeneralLedgerModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GeneralAccountingSharedModule } from 'app/shared';
import {
    GeneralAccountComponent,
    GeneralAccountDetailComponent,
    GeneralAccountUpdateComponent,
    GeneralAccountDeletePopupComponent,
    GeneralAccountDeleteDialogComponent,
    generalAccountRoute,
    generalAccountPopupRoute
} from './';

const ENTITY_STATES = [...generalAccountRoute, ...generalAccountPopupRoute];

@NgModule({
    imports: [GeneralAccountingSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GeneralAccountComponent,
        GeneralAccountDetailComponent,
        GeneralAccountUpdateComponent,
        GeneralAccountDeleteDialogComponent,
        GeneralAccountDeletePopupComponent
    ],
    entryComponents: [
        GeneralAccountComponent,
        GeneralAccountUpdateComponent,
        GeneralAccountDeleteDialogComponent,
        GeneralAccountDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeneralAccountingGeneralAccountModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}

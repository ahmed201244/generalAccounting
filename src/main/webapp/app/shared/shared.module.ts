import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import {
    GeneralAccountingSharedLibsModule,
    GeneralAccountingSharedCommonModule,
    JhiLoginModalComponent,
    HasAnyAuthorityDirective
} from './';

@NgModule({
    imports: [GeneralAccountingSharedLibsModule, GeneralAccountingSharedCommonModule],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [JhiLoginModalComponent],
    exports: [GeneralAccountingSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeneralAccountingSharedModule {
    static forRoot() {
        return {
            ngModule: GeneralAccountingSharedModule
        };
    }
}

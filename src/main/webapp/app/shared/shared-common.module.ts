import { NgModule } from '@angular/core';

import { GeneralAccountingSharedLibsModule, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [GeneralAccountingSharedLibsModule],
    declarations: [FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent],
    exports: [GeneralAccountingSharedLibsModule, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent]
})
export class GeneralAccountingSharedCommonModule {}

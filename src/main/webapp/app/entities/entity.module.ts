import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'currency',
                loadChildren: './currency/currency.module#GeneralAccountingCurrencyModule'
            },
            {
                path: 'cash-book',
                loadChildren: './cash-book/cash-book.module#GeneralAccountingCashBookModule'
            },
            {
                path: 'general-account',
                loadChildren: './general-account/general-account.module#GeneralAccountingGeneralAccountModule'
            },
            {
                path: 'trial-balance',
                loadChildren: './trial-balance/trial-balance.module#GeneralAccountingTrialBalanceModule'
            },
            {
                path: 'general-ledger',
                loadChildren: './general-ledger/general-ledger.module#GeneralAccountingGeneralLedgerModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeneralAccountingEntityModule {}

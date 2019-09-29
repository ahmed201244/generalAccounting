import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBalanceSheet } from 'app/shared/model/balance-sheet.model';
import { AccountService } from 'app/core';
import { BalanceSheetService } from './balance-sheet.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'jhi-balance-sheet',
    templateUrl: './balance-sheet.component.html'
})
export class BalanceSheetComponent implements OnInit, OnDestroy {
    balanceSheets: IBalanceSheet[];
    currentAccount: any;
    eventSubscriber: Subscription;
    fileURL: SafeResourceUrl;

    constructor(
        protected balanceSheetService: BalanceSheetService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService,
        protected domSanitizer: DomSanitizer
    ) {}

    loadAll() {
        this.balanceSheetService
            .query()
            .pipe(
                filter((res: HttpResponse<IBalanceSheet[]>) => res.ok),
                map((res: HttpResponse<IBalanceSheet[]>) => res.body)
            )
            .subscribe(
                (res: IBalanceSheet[]) => {
                    this.balanceSheets = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
    getPDF() {
        this.balanceSheetService.getPDF().subscribe((response: any) => {
            const file = new Blob([response], { type: 'application/pdf' });
            this.fileURL = this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
            console.log(this.fileURL);
        });
    }

    ngOnInit() {
        // this.loadAll();
        this.getPDF();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBalanceSheets();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBalanceSheet) {
        return item.id;
    }

    registerChangeInBalanceSheets() {
        this.eventSubscriber = this.eventManager.subscribe('balanceSheetListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

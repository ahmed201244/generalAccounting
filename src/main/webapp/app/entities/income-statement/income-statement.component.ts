import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IIncomeStatement } from 'app/shared/model/income-statement.model';
import { AccountService } from 'app/core';
import { IncomeStatementService } from './income-statement.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'jhi-income-statement',
    templateUrl: './income-statement.component.html'
})
export class IncomeStatementComponent implements OnInit, OnDestroy {
    incomeStatements: IIncomeStatement[];
    currentAccount: any;
    eventSubscriber: Subscription;
    fileURL: SafeResourceUrl;

    constructor(
        protected incomeStatementService: IncomeStatementService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService,
        protected domSanitizer: DomSanitizer
    ) {}

    loadAll() {
        this.incomeStatementService
            .query()
            .pipe(
                filter((res: HttpResponse<IIncomeStatement[]>) => res.ok),
                map((res: HttpResponse<IIncomeStatement[]>) => res.body)
            )
            .subscribe(
                (res: IIncomeStatement[]) => {
                    this.incomeStatements = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
    getPDF() {
        this.incomeStatementService.getPDF().subscribe((response: any) => {
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
        this.registerChangeInIncomeStatements();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IIncomeStatement) {
        return item.id;
    }

    registerChangeInIncomeStatements() {
        this.eventSubscriber = this.eventManager.subscribe('incomeStatementListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

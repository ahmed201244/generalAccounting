import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBalanceSheet } from 'app/shared/model/balance-sheet.model';
import { BalanceSheetService } from './balance-sheet.service';

@Component({
    selector: 'jhi-balance-sheet-delete-dialog',
    templateUrl: './balance-sheet-delete-dialog.component.html'
})
export class BalanceSheetDeleteDialogComponent {
    balanceSheet: IBalanceSheet;

    constructor(
        protected balanceSheetService: BalanceSheetService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.balanceSheetService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'balanceSheetListModification',
                content: 'Deleted an balanceSheet'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-balance-sheet-delete-popup',
    template: ''
})
export class BalanceSheetDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ balanceSheet }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BalanceSheetDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.balanceSheet = balanceSheet;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/balance-sheet', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/balance-sheet', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}

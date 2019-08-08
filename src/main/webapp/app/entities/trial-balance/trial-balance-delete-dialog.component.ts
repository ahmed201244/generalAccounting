import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITrialBalance } from 'app/shared/model/trial-balance.model';
import { TrialBalanceService } from './trial-balance.service';

@Component({
    selector: 'jhi-trial-balance-delete-dialog',
    templateUrl: './trial-balance-delete-dialog.component.html'
})
export class TrialBalanceDeleteDialogComponent {
    trialBalance: ITrialBalance;

    constructor(
        protected trialBalanceService: TrialBalanceService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.trialBalanceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'trialBalanceListModification',
                content: 'Deleted an trialBalance'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-trial-balance-delete-popup',
    template: ''
})
export class TrialBalanceDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ trialBalance }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TrialBalanceDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.trialBalance = trialBalance;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/trial-balance', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/trial-balance', { outlets: { popup: null } }]);
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

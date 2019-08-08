import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGeneralLedger } from 'app/shared/model/general-ledger.model';
import { GeneralLedgerService } from './general-ledger.service';

@Component({
    selector: 'jhi-general-ledger-delete-dialog',
    templateUrl: './general-ledger-delete-dialog.component.html'
})
export class GeneralLedgerDeleteDialogComponent {
    generalLedger: IGeneralLedger;

    constructor(
        protected generalLedgerService: GeneralLedgerService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.generalLedgerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'generalLedgerListModification',
                content: 'Deleted an generalLedger'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-general-ledger-delete-popup',
    template: ''
})
export class GeneralLedgerDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ generalLedger }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GeneralLedgerDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.generalLedger = generalLedger;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/general-ledger', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/general-ledger', { outlets: { popup: null } }]);
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

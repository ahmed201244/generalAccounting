import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGeneralAccount } from 'app/shared/model/general-account.model';
import { GeneralAccountService } from './general-account.service';

@Component({
    selector: 'jhi-general-account-delete-dialog',
    templateUrl: './general-account-delete-dialog.component.html'
})
export class GeneralAccountDeleteDialogComponent {
    generalAccount: IGeneralAccount;

    constructor(
        protected generalAccountService: GeneralAccountService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.generalAccountService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'generalAccountListModification',
                content: 'Deleted an generalAccount'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-general-account-delete-popup',
    template: ''
})
export class GeneralAccountDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ generalAccount }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GeneralAccountDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.generalAccount = generalAccount;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/general-account', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/general-account', { outlets: { popup: null } }]);
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

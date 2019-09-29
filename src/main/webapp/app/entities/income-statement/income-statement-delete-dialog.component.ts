import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIncomeStatement } from 'app/shared/model/income-statement.model';
import { IncomeStatementService } from './income-statement.service';

@Component({
    selector: 'jhi-income-statement-delete-dialog',
    templateUrl: './income-statement-delete-dialog.component.html'
})
export class IncomeStatementDeleteDialogComponent {
    incomeStatement: IIncomeStatement;

    constructor(
        protected incomeStatementService: IncomeStatementService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.incomeStatementService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'incomeStatementListModification',
                content: 'Deleted an incomeStatement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-income-statement-delete-popup',
    template: ''
})
export class IncomeStatementDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ incomeStatement }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(IncomeStatementDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.incomeStatement = incomeStatement;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/income-statement', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/income-statement', { outlets: { popup: null } }]);
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

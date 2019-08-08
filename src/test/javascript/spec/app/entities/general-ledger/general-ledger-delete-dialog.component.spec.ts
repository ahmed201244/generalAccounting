/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GeneralAccountingTestModule } from '../../../test.module';
import { GeneralLedgerDeleteDialogComponent } from 'app/entities/general-ledger/general-ledger-delete-dialog.component';
import { GeneralLedgerService } from 'app/entities/general-ledger/general-ledger.service';

describe('Component Tests', () => {
    describe('GeneralLedger Management Delete Component', () => {
        let comp: GeneralLedgerDeleteDialogComponent;
        let fixture: ComponentFixture<GeneralLedgerDeleteDialogComponent>;
        let service: GeneralLedgerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeneralAccountingTestModule],
                declarations: [GeneralLedgerDeleteDialogComponent]
            })
                .overrideTemplate(GeneralLedgerDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GeneralLedgerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GeneralLedgerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});

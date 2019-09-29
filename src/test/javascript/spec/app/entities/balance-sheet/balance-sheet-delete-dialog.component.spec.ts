/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GeneralAccountingTestModule } from '../../../test.module';
import { BalanceSheetDeleteDialogComponent } from 'app/entities/balance-sheet/balance-sheet-delete-dialog.component';
import { BalanceSheetService } from 'app/entities/balance-sheet/balance-sheet.service';

describe('Component Tests', () => {
    describe('BalanceSheet Management Delete Component', () => {
        let comp: BalanceSheetDeleteDialogComponent;
        let fixture: ComponentFixture<BalanceSheetDeleteDialogComponent>;
        let service: BalanceSheetService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeneralAccountingTestModule],
                declarations: [BalanceSheetDeleteDialogComponent]
            })
                .overrideTemplate(BalanceSheetDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BalanceSheetDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BalanceSheetService);
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

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GeneralAccountingTestModule } from '../../../test.module';
import { IncomeStatementDeleteDialogComponent } from 'app/entities/income-statement/income-statement-delete-dialog.component';
import { IncomeStatementService } from 'app/entities/income-statement/income-statement.service';

describe('Component Tests', () => {
    describe('IncomeStatement Management Delete Component', () => {
        let comp: IncomeStatementDeleteDialogComponent;
        let fixture: ComponentFixture<IncomeStatementDeleteDialogComponent>;
        let service: IncomeStatementService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeneralAccountingTestModule],
                declarations: [IncomeStatementDeleteDialogComponent]
            })
                .overrideTemplate(IncomeStatementDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IncomeStatementDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncomeStatementService);
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

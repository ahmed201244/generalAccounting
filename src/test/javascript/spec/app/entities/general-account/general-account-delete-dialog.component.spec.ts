/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GeneralAccountingTestModule } from '../../../test.module';
import { GeneralAccountDeleteDialogComponent } from 'app/entities/general-account/general-account-delete-dialog.component';
import { GeneralAccountService } from 'app/entities/general-account/general-account.service';

describe('Component Tests', () => {
    describe('GeneralAccount Management Delete Component', () => {
        let comp: GeneralAccountDeleteDialogComponent;
        let fixture: ComponentFixture<GeneralAccountDeleteDialogComponent>;
        let service: GeneralAccountService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeneralAccountingTestModule],
                declarations: [GeneralAccountDeleteDialogComponent]
            })
                .overrideTemplate(GeneralAccountDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GeneralAccountDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GeneralAccountService);
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

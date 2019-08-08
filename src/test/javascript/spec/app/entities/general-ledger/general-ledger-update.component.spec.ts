/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeneralAccountingTestModule } from '../../../test.module';
import { GeneralLedgerUpdateComponent } from 'app/entities/general-ledger/general-ledger-update.component';
import { GeneralLedgerService } from 'app/entities/general-ledger/general-ledger.service';
import { GeneralLedger } from 'app/shared/model/general-ledger.model';

describe('Component Tests', () => {
    describe('GeneralLedger Management Update Component', () => {
        let comp: GeneralLedgerUpdateComponent;
        let fixture: ComponentFixture<GeneralLedgerUpdateComponent>;
        let service: GeneralLedgerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeneralAccountingTestModule],
                declarations: [GeneralLedgerUpdateComponent]
            })
                .overrideTemplate(GeneralLedgerUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GeneralLedgerUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GeneralLedgerService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GeneralLedger(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.generalLedger = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GeneralLedger();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.generalLedger = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});

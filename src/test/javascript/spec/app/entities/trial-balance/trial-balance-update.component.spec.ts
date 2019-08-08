/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeneralAccountingTestModule } from '../../../test.module';
import { TrialBalanceUpdateComponent } from 'app/entities/trial-balance/trial-balance-update.component';
import { TrialBalanceService } from 'app/entities/trial-balance/trial-balance.service';
import { TrialBalance } from 'app/shared/model/trial-balance.model';

describe('Component Tests', () => {
    describe('TrialBalance Management Update Component', () => {
        let comp: TrialBalanceUpdateComponent;
        let fixture: ComponentFixture<TrialBalanceUpdateComponent>;
        let service: TrialBalanceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeneralAccountingTestModule],
                declarations: [TrialBalanceUpdateComponent]
            })
                .overrideTemplate(TrialBalanceUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TrialBalanceUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrialBalanceService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new TrialBalance(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.trialBalance = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new TrialBalance();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.trialBalance = entity;
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

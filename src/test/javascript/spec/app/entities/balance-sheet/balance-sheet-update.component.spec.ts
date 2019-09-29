/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeneralAccountingTestModule } from '../../../test.module';
import { BalanceSheetUpdateComponent } from 'app/entities/balance-sheet/balance-sheet-update.component';
import { BalanceSheetService } from 'app/entities/balance-sheet/balance-sheet.service';
import { BalanceSheet } from 'app/shared/model/balance-sheet.model';

describe('Component Tests', () => {
    describe('BalanceSheet Management Update Component', () => {
        let comp: BalanceSheetUpdateComponent;
        let fixture: ComponentFixture<BalanceSheetUpdateComponent>;
        let service: BalanceSheetService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeneralAccountingTestModule],
                declarations: [BalanceSheetUpdateComponent]
            })
                .overrideTemplate(BalanceSheetUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BalanceSheetUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BalanceSheetService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new BalanceSheet(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.balanceSheet = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new BalanceSheet();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.balanceSheet = entity;
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

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeneralAccountingTestModule } from '../../../test.module';
import { IncomeStatementUpdateComponent } from 'app/entities/income-statement/income-statement-update.component';
import { IncomeStatementService } from 'app/entities/income-statement/income-statement.service';
import { IncomeStatement } from 'app/shared/model/income-statement.model';

describe('Component Tests', () => {
    describe('IncomeStatement Management Update Component', () => {
        let comp: IncomeStatementUpdateComponent;
        let fixture: ComponentFixture<IncomeStatementUpdateComponent>;
        let service: IncomeStatementService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeneralAccountingTestModule],
                declarations: [IncomeStatementUpdateComponent]
            })
                .overrideTemplate(IncomeStatementUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IncomeStatementUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncomeStatementService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new IncomeStatement(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.incomeStatement = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new IncomeStatement();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.incomeStatement = entity;
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

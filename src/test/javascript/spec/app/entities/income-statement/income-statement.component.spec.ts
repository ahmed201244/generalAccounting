/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeneralAccountingTestModule } from '../../../test.module';
import { IncomeStatementComponent } from 'app/entities/income-statement/income-statement.component';
import { IncomeStatementService } from 'app/entities/income-statement/income-statement.service';
import { IncomeStatement } from 'app/shared/model/income-statement.model';

describe('Component Tests', () => {
    describe('IncomeStatement Management Component', () => {
        let comp: IncomeStatementComponent;
        let fixture: ComponentFixture<IncomeStatementComponent>;
        let service: IncomeStatementService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeneralAccountingTestModule],
                declarations: [IncomeStatementComponent],
                providers: []
            })
                .overrideTemplate(IncomeStatementComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IncomeStatementComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IncomeStatementService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new IncomeStatement(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.incomeStatements[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeneralAccountingTestModule } from '../../../test.module';
import { IncomeStatementDetailComponent } from 'app/entities/income-statement/income-statement-detail.component';
import { IncomeStatement } from 'app/shared/model/income-statement.model';

describe('Component Tests', () => {
    describe('IncomeStatement Management Detail Component', () => {
        let comp: IncomeStatementDetailComponent;
        let fixture: ComponentFixture<IncomeStatementDetailComponent>;
        const route = ({ data: of({ incomeStatement: new IncomeStatement(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeneralAccountingTestModule],
                declarations: [IncomeStatementDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(IncomeStatementDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IncomeStatementDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.incomeStatement).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeneralAccountingTestModule } from '../../../test.module';
import { TrialBalanceDetailComponent } from 'app/entities/trial-balance/trial-balance-detail.component';
import { TrialBalance } from 'app/shared/model/trial-balance.model';

describe('Component Tests', () => {
    describe('TrialBalance Management Detail Component', () => {
        let comp: TrialBalanceDetailComponent;
        let fixture: ComponentFixture<TrialBalanceDetailComponent>;
        const route = ({ data: of({ trialBalance: new TrialBalance(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeneralAccountingTestModule],
                declarations: [TrialBalanceDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TrialBalanceDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TrialBalanceDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.trialBalance).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

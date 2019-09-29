/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeneralAccountingTestModule } from '../../../test.module';
import { BalanceSheetDetailComponent } from 'app/entities/balance-sheet/balance-sheet-detail.component';
import { BalanceSheet } from 'app/shared/model/balance-sheet.model';

describe('Component Tests', () => {
    describe('BalanceSheet Management Detail Component', () => {
        let comp: BalanceSheetDetailComponent;
        let fixture: ComponentFixture<BalanceSheetDetailComponent>;
        const route = ({ data: of({ balanceSheet: new BalanceSheet(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeneralAccountingTestModule],
                declarations: [BalanceSheetDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BalanceSheetDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BalanceSheetDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.balanceSheet).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

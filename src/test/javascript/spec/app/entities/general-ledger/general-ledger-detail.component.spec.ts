/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeneralAccountingTestModule } from '../../../test.module';
import { GeneralLedgerDetailComponent } from 'app/entities/general-ledger/general-ledger-detail.component';
import { GeneralLedger } from 'app/shared/model/general-ledger.model';

describe('Component Tests', () => {
    describe('GeneralLedger Management Detail Component', () => {
        let comp: GeneralLedgerDetailComponent;
        let fixture: ComponentFixture<GeneralLedgerDetailComponent>;
        const route = ({ data: of({ generalLedger: new GeneralLedger(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeneralAccountingTestModule],
                declarations: [GeneralLedgerDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GeneralLedgerDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GeneralLedgerDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.generalLedger).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

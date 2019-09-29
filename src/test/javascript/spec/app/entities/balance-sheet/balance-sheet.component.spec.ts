/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeneralAccountingTestModule } from '../../../test.module';
import { BalanceSheetComponent } from 'app/entities/balance-sheet/balance-sheet.component';
import { BalanceSheetService } from 'app/entities/balance-sheet/balance-sheet.service';
import { BalanceSheet } from 'app/shared/model/balance-sheet.model';

describe('Component Tests', () => {
    describe('BalanceSheet Management Component', () => {
        let comp: BalanceSheetComponent;
        let fixture: ComponentFixture<BalanceSheetComponent>;
        let service: BalanceSheetService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeneralAccountingTestModule],
                declarations: [BalanceSheetComponent],
                providers: []
            })
                .overrideTemplate(BalanceSheetComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BalanceSheetComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BalanceSheetService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new BalanceSheet(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.balanceSheets[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

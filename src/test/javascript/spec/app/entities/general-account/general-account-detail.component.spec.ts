/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeneralAccountingTestModule } from '../../../test.module';
import { GeneralAccountDetailComponent } from 'app/entities/general-account/general-account-detail.component';
import { GeneralAccount } from 'app/shared/model/general-account.model';

describe('Component Tests', () => {
    describe('GeneralAccount Management Detail Component', () => {
        let comp: GeneralAccountDetailComponent;
        let fixture: ComponentFixture<GeneralAccountDetailComponent>;
        const route = ({ data: of({ generalAccount: new GeneralAccount(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeneralAccountingTestModule],
                declarations: [GeneralAccountDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GeneralAccountDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GeneralAccountDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.generalAccount).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

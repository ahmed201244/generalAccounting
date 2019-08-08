/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GeneralAccountingTestModule } from '../../../test.module';
import { GeneralAccountUpdateComponent } from 'app/entities/general-account/general-account-update.component';
import { GeneralAccountService } from 'app/entities/general-account/general-account.service';
import { GeneralAccount } from 'app/shared/model/general-account.model';

describe('Component Tests', () => {
    describe('GeneralAccount Management Update Component', () => {
        let comp: GeneralAccountUpdateComponent;
        let fixture: ComponentFixture<GeneralAccountUpdateComponent>;
        let service: GeneralAccountService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GeneralAccountingTestModule],
                declarations: [GeneralAccountUpdateComponent]
            })
                .overrideTemplate(GeneralAccountUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GeneralAccountUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GeneralAccountService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GeneralAccount(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.generalAccount = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GeneralAccount();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.generalAccount = entity;
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

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GeneralAccount } from 'app/shared/model/general-account.model';
import { GeneralAccountService } from './general-account.service';
import { GeneralAccountComponent } from './general-account.component';
import { GeneralAccountDetailComponent } from './general-account-detail.component';
import { GeneralAccountUpdateComponent } from './general-account-update.component';
import { GeneralAccountDeletePopupComponent } from './general-account-delete-dialog.component';
import { IGeneralAccount } from 'app/shared/model/general-account.model';

@Injectable({ providedIn: 'root' })
export class GeneralAccountResolve implements Resolve<IGeneralAccount> {
    constructor(private service: GeneralAccountService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IGeneralAccount> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<GeneralAccount>) => response.ok),
                map((generalAccount: HttpResponse<GeneralAccount>) => generalAccount.body)
            );
        }
        return of(new GeneralAccount());
    }
}

export const generalAccountRoute: Routes = [
    {
        path: '',
        component: GeneralAccountComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'generalAccountingApp.generalAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: GeneralAccountDetailComponent,
        resolve: {
            generalAccount: GeneralAccountResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'generalAccountingApp.generalAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: GeneralAccountUpdateComponent,
        resolve: {
            generalAccount: GeneralAccountResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'generalAccountingApp.generalAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: GeneralAccountUpdateComponent,
        resolve: {
            generalAccount: GeneralAccountResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'generalAccountingApp.generalAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const generalAccountPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: GeneralAccountDeletePopupComponent,
        resolve: {
            generalAccount: GeneralAccountResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'generalAccountingApp.generalAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

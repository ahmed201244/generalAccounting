import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TrialBalance } from 'app/shared/model/trial-balance.model';
import { TrialBalanceService } from './trial-balance.service';
import { TrialBalanceComponent } from './trial-balance.component';
import { TrialBalanceDetailComponent } from './trial-balance-detail.component';
import { TrialBalanceUpdateComponent } from './trial-balance-update.component';
import { TrialBalanceDeletePopupComponent } from './trial-balance-delete-dialog.component';
import { ITrialBalance } from 'app/shared/model/trial-balance.model';

@Injectable({ providedIn: 'root' })
export class TrialBalanceResolve implements Resolve<ITrialBalance> {
    constructor(private service: TrialBalanceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITrialBalance> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TrialBalance>) => response.ok),
                map((trialBalance: HttpResponse<TrialBalance>) => trialBalance.body)
            );
        }
        return of(new TrialBalance());
    }
}

export const trialBalanceRoute: Routes = [
    {
        path: '',
        component: TrialBalanceComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'generalAccountingApp.trialBalance.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TrialBalanceDetailComponent,
        resolve: {
            trialBalance: TrialBalanceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'generalAccountingApp.trialBalance.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TrialBalanceUpdateComponent,
        resolve: {
            trialBalance: TrialBalanceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'generalAccountingApp.trialBalance.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TrialBalanceUpdateComponent,
        resolve: {
            trialBalance: TrialBalanceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'generalAccountingApp.trialBalance.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const trialBalancePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TrialBalanceDeletePopupComponent,
        resolve: {
            trialBalance: TrialBalanceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'generalAccountingApp.trialBalance.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

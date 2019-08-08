import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GeneralLedger } from 'app/shared/model/general-ledger.model';
import { GeneralLedgerService } from './general-ledger.service';
import { GeneralLedgerComponent } from './general-ledger.component';
import { GeneralLedgerDetailComponent } from './general-ledger-detail.component';
import { GeneralLedgerUpdateComponent } from './general-ledger-update.component';
import { GeneralLedgerDeletePopupComponent } from './general-ledger-delete-dialog.component';
import { IGeneralLedger } from 'app/shared/model/general-ledger.model';

@Injectable({ providedIn: 'root' })
export class GeneralLedgerResolve implements Resolve<IGeneralLedger> {
    constructor(private service: GeneralLedgerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IGeneralLedger> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<GeneralLedger>) => response.ok),
                map((generalLedger: HttpResponse<GeneralLedger>) => generalLedger.body)
            );
        }
        return of(new GeneralLedger());
    }
}

export const generalLedgerRoute: Routes = [
    {
        path: '',
        component: GeneralLedgerComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'generalAccountingApp.generalLedger.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: GeneralLedgerDetailComponent,
        resolve: {
            generalLedger: GeneralLedgerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'generalAccountingApp.generalLedger.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: GeneralLedgerUpdateComponent,
        resolve: {
            generalLedger: GeneralLedgerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'generalAccountingApp.generalLedger.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: GeneralLedgerUpdateComponent,
        resolve: {
            generalLedger: GeneralLedgerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'generalAccountingApp.generalLedger.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const generalLedgerPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: GeneralLedgerDeletePopupComponent,
        resolve: {
            generalLedger: GeneralLedgerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'generalAccountingApp.generalLedger.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

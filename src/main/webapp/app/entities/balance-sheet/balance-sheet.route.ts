import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BalanceSheet } from 'app/shared/model/balance-sheet.model';
import { BalanceSheetService } from './balance-sheet.service';
import { BalanceSheetComponent } from './balance-sheet.component';
import { BalanceSheetDetailComponent } from './balance-sheet-detail.component';
import { BalanceSheetUpdateComponent } from './balance-sheet-update.component';
import { BalanceSheetDeletePopupComponent } from './balance-sheet-delete-dialog.component';
import { IBalanceSheet } from 'app/shared/model/balance-sheet.model';

@Injectable({ providedIn: 'root' })
export class BalanceSheetResolve implements Resolve<IBalanceSheet> {
    constructor(private service: BalanceSheetService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBalanceSheet> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<BalanceSheet>) => response.ok),
                map((balanceSheet: HttpResponse<BalanceSheet>) => balanceSheet.body)
            );
        }
        return of(new BalanceSheet());
    }
}

export const balanceSheetRoute: Routes = [
    {
        path: '',
        component: BalanceSheetComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'generalAccountingApp.balanceSheet.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
    // {
    //     path: ':id/view',
    //     component: BalanceSheetDetailComponent,
    //     resolve: {
    //         balanceSheet: BalanceSheetResolve
    //     },
    //     data: {
    //         authorities: ['ROLE_USER'],
    //         pageTitle: 'generalAccountingApp.balanceSheet.home.title'
    //     },
    //     canActivate: [UserRouteAccessService]
    // },
    // {
    //     path: 'new',
    //     component: BalanceSheetUpdateComponent,
    //     resolve: {
    //         balanceSheet: BalanceSheetResolve
    //     },
    //     data: {
    //         authorities: ['ROLE_USER'],
    //         pageTitle: 'generalAccountingApp.balanceSheet.home.title'
    //     },
    //     canActivate: [UserRouteAccessService]
    // },
    // {
    //     path: ':id/edit',
    //     component: BalanceSheetUpdateComponent,
    //     resolve: {
    //         balanceSheet: BalanceSheetResolve
    //     },
    //     data: {
    //         authorities: ['ROLE_USER'],
    //         pageTitle: 'generalAccountingApp.balanceSheet.home.title'
    //     },
    //     canActivate: [UserRouteAccessService]
    // }
];

export const balanceSheetPopupRoute: Routes = [
    // {
    //     path: ':id/delete',
    //     component: BalanceSheetDeletePopupComponent,
    //     resolve: {
    //         balanceSheet: BalanceSheetResolve
    //     },
    //     data: {
    //         authorities: ['ROLE_USER'],
    //         pageTitle: 'generalAccountingApp.balanceSheet.home.title'
    //     },
    //     canActivate: [UserRouteAccessService],
    //     outlet: 'popup'
    // }
];

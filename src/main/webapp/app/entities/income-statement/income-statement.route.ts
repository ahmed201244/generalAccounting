import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IncomeStatement } from 'app/shared/model/income-statement.model';
import { IncomeStatementService } from './income-statement.service';
import { IncomeStatementComponent } from './income-statement.component';
import { IncomeStatementDetailComponent } from './income-statement-detail.component';
import { IncomeStatementUpdateComponent } from './income-statement-update.component';
import { IncomeStatementDeletePopupComponent } from './income-statement-delete-dialog.component';
import { IIncomeStatement } from 'app/shared/model/income-statement.model';

@Injectable({ providedIn: 'root' })
export class IncomeStatementResolve implements Resolve<IIncomeStatement> {
    constructor(private service: IncomeStatementService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IIncomeStatement> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<IncomeStatement>) => response.ok),
                map((incomeStatement: HttpResponse<IncomeStatement>) => incomeStatement.body)
            );
        }
        return of(new IncomeStatement());
    }
}

export const incomeStatementRoute: Routes = [
    {
        path: '',
        component: IncomeStatementComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'generalAccountingApp.incomeStatement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
    // {
    //     path: ':id/view',
    //     component: IncomeStatementDetailComponent,
    //     resolve: {
    //         incomeStatement: IncomeStatementResolve
    //     },
    //     data: {
    //         authorities: ['ROLE_USER'],
    //         pageTitle: 'generalAccountingApp.incomeStatement.home.title'
    //     },
    //     canActivate: [UserRouteAccessService]
    // },
    // {
    //     path: 'new',
    //     component: IncomeStatementUpdateComponent,
    //     resolve: {
    //         incomeStatement: IncomeStatementResolve
    //     },
    //     data: {
    //         authorities: ['ROLE_USER'],
    //         pageTitle: 'generalAccountingApp.incomeStatement.home.title'
    //     },
    //     canActivate: [UserRouteAccessService]
    // },
    // {
    //     path: ':id/edit',
    //     component: IncomeStatementUpdateComponent,
    //     resolve: {
    //         incomeStatement: IncomeStatementResolve
    //     },
    //     data: {
    //         authorities: ['ROLE_USER'],
    //         pageTitle: 'generalAccountingApp.incomeStatement.home.title'
    //     },
    //     canActivate: [UserRouteAccessService]
    // }
];

export const incomeStatementPopupRoute: Routes = [
    // {
    //     path: ':id/delete',
    //     component: IncomeStatementDeletePopupComponent,
    //     resolve: {
    //         incomeStatement: IncomeStatementResolve
    //     },
    //     data: {
    //         authorities: ['ROLE_USER'],
    //         pageTitle: 'generalAccountingApp.incomeStatement.home.title'
    //     },
    //     canActivate: [UserRouteAccessService],
    //     outlet: 'popup'
    // }
];

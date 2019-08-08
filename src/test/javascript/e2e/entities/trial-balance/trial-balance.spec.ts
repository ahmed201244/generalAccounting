/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TrialBalanceComponentsPage, TrialBalanceDeleteDialog, TrialBalanceUpdatePage } from './trial-balance.page-object';

const expect = chai.expect;

describe('TrialBalance e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let trialBalanceUpdatePage: TrialBalanceUpdatePage;
    let trialBalanceComponentsPage: TrialBalanceComponentsPage;
    let trialBalanceDeleteDialog: TrialBalanceDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load TrialBalances', async () => {
        await navBarPage.goToEntity('trial-balance');
        trialBalanceComponentsPage = new TrialBalanceComponentsPage();
        await browser.wait(ec.visibilityOf(trialBalanceComponentsPage.title), 5000);
        expect(await trialBalanceComponentsPage.getTitle()).to.eq('generalAccountingApp.trialBalance.home.title');
    });

    it('should load create TrialBalance page', async () => {
        await trialBalanceComponentsPage.clickOnCreateButton();
        trialBalanceUpdatePage = new TrialBalanceUpdatePage();
        expect(await trialBalanceUpdatePage.getPageTitle()).to.eq('generalAccountingApp.trialBalance.home.createOrEditLabel');
        await trialBalanceUpdatePage.cancel();
    });

    it('should create and save TrialBalances', async () => {
        const nbButtonsBeforeCreate = await trialBalanceComponentsPage.countDeleteButtons();

        await trialBalanceComponentsPage.clickOnCreateButton();
        await promise.all([
            trialBalanceUpdatePage.setDebitInput('5'),
            trialBalanceUpdatePage.setCreditInput('5'),
            trialBalanceUpdatePage.trialBalanceSelectLastOption()
        ]);
        expect(await trialBalanceUpdatePage.getDebitInput()).to.eq('5');
        expect(await trialBalanceUpdatePage.getCreditInput()).to.eq('5');
        await trialBalanceUpdatePage.save();
        expect(await trialBalanceUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await trialBalanceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last TrialBalance', async () => {
        const nbButtonsBeforeDelete = await trialBalanceComponentsPage.countDeleteButtons();
        await trialBalanceComponentsPage.clickOnLastDeleteButton();

        trialBalanceDeleteDialog = new TrialBalanceDeleteDialog();
        expect(await trialBalanceDeleteDialog.getDialogTitle()).to.eq('generalAccountingApp.trialBalance.delete.question');
        await trialBalanceDeleteDialog.clickOnConfirmButton();

        expect(await trialBalanceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});

/**
 * Created by Ivan Basenko on 10.12.2018.
 */

public with sharing class AccountTriggerHandler {


    public void handleInsertAccWithAddress(List<Account> accounts) {
        List<Account> accountsWithAddress = new List<Account>();
        for (Account account : accounts) {
            if (account.BillingStreet != null) {
                accountsWithAddress.add(account);
            }
        }
        if (!accountsWithAddress.isEmpty()) {
            System.enqueueJob(new GoogleMapsCallout(accountsWithAddress));
        }

    }
    public void handleChangeAddress(List<Account> accounts, Map<Id, Account> oldAccounts) {
        List<Account> accountsWithNewAddress = new List<Account>();
        for (Account account : accounts) {
            Account oldAccount = oldAccounts.get(account.Id);
            if (oldAccount.BillingStreet != account.BillingStreet && account.BillingStreet != null) {
                accountsWithNewAddress.add(account);
            }
        }
        if (!accountsWithNewAddress.isEmpty()) {
            System.enqueueJob(new GoogleMapsCallout(accountsWithNewAddress));
        }
    }
}
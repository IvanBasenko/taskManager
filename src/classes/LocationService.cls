/**
 * Created by Ivan Basenko on 10.12.2018.
 */

public with sharing class LocationService {
    List<Account> accounts;
    public LocationService(List<Account> accounts) {
        this.accounts = accounts;
    }
    public void setPlaceId() {
        List<Account> accountsForUpdate = new List<Account>();
        for (Account account : accounts) {
            String addresses = this.getAddresses(account);
            HttpResponse response = new Request('GET')
                    .geocodeRequest(addresses)
                    .setAccessToken()
                    .execute();
            Map<String, Object> test = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            List<Map<String, Object>> records = new List<Map<String, Object>>();
            for (Object o : (List<Object>) test.get('results')) {
                records.add((Map<String, Object>) o);
            }
            Account updAcc = new Account();
            updAcc.Id = account.Id;
            updAcc.Place_Id__c = (String) records.get(0).get('place_id');
            accountsForUpdate.add(updAcc);
        }
        update accountsForUpdate;
    }


    private String getAddresses(Account account) {
        String addresses = '';

        addresses = addresses + account.BillingStreet;
        addresses = addresses + ' ' + account.BillingCity;
//            addresses = addresses + ' ' + account.BillingPostalCode;
//            addresses = addresses + ' ' + account.BillingState;
        addresses = addresses + ' ' + account.BillingCountry;


        return addresses;
    }
}
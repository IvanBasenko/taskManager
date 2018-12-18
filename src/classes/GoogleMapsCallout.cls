/**
 * Created by Ivan Basenko on 10.12.2018.
 */

public with sharing class GoogleMapsCallout implements Queueable, Database.AllowsCallouts {
    LocationService locationService;

    public GoogleMapsCallout(List<Account> accounts) {
        locationService = new LocationService(accounts);
    }
    public void execute(QueueableContext param1) {
        locationService.setPlaceId();
    }
}
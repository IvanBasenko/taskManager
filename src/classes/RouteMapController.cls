/**
 * Created by Ivan Basenko on 12.12.2018.
 */

public with sharing class RouteMapController {
    public List<String> queue;

    public String getQueue() {
        return JSON.serialize(this.queue);
    }
    public RouteMapController() {
        queue = new List<String>();
        List<Account> accounts = this.getAccounts();
        List<String> origins = new List<String>();
        List<String> destinations = new List<String>();
        for (Account account : accounts) {
            if (account.Name.equals('Office')) {
                origins.add(account.Place_Id__c);
            } else {
                destinations.add(account.Place_Id__c);
                System.debug(account.BillingStreet + ' place_id:' + account.Place_Id__c);
            }
        }
        this.recursiveTest(origins, destinations);
    }

    private void recursiveTest(List<String> origins, List<String> destinations) {
        if (!destinations.isEmpty()) {
            Map<String, Integer> directionTime = new Map<String, Integer>();
            HttpResponse response = new Request('GET')
                    .distanceMatrixRequest()
                    .setOrigins(this.getFormatPlaceIds(origins))
                    .setDestinations(this.getFormatPlaceIds(destinations))
                    .setDepartureTime()
                    .setAccessToken()
                    .execute();
            DeserializeDistanceMatrix deserializeDistanceMatrix = DeserializeDistanceMatrix.parse(response.getBody());
            List<DeserializeDistanceMatrix.Elements> elementsOnResponse = deserializeDistanceMatrix.rows.get(0).elements;
            System.debug(deserializeDistanceMatrix.origin_addresses);
            System.debug(deserializeDistanceMatrix.destination_addresses);
            for (Integer i = 0; i < destinations.size(); i++) {
                directionTime.put(destinations[i], elementsOnResponse[i].distance.value);
            }
            String keyWithMinValue = directionTime.isEmpty() ? null : new List<String>(directionTime.keySet())[0];
            for (String key : directionTime.keySet()) {
                keyWithMinValue = directionTime.get(key) < directionTime.get(keyWithMinValue) ? key : keyWithMinValue;
            }
            System.debug(keyWithMinValue);
            System.debug(directionTime.get(keyWithMinValue));
            System.debug(directionTime);
            queue.add(keyWithMinValue);
            for (Integer i = 0; i < destinations.size(); i++) {
                if (destinations[i].contains(keyWithMinValue)) {
                    destinations.remove(i);
                    break;
                }
            }
            recursiveTest(new List<String>{
                    keyWithMinValue
            }, destinations);
        } else {
            return;
        }
    }

    private String getFormatPlaceIds(List<String> placeIDs) {
        String formatPlaceIDs = '';
        for (String placeId : placeIDs) {
            formatPlaceIDs = formatPlaceIDs + 'place_id:' + placeId + '|';
        }
        formatPlaceIDs = formatPlaceIDs.removeEnd('|');
        return formatPlaceIDs;
    }
    private List<Account> getAccounts() {
        return [
                SELECT Id
                        , Name
                        , Place_Id__c
                        , BillingStreet
                FROM Account
        ];
    }
}
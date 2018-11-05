/**
 * Created by Ivan Basenko on 25.10.2018.
 */

public with sharing class SubTaskController {
    @AuraEnabled
    public static List<SubTask__c> getSubTasksByTaskId(Id id) {
        return [
                SELECT
                        Description__c,
                        Estimate__c,
                        Id,
                        Name,
                        TotalTrack__c
                FROM SubTask__c
                WHERE TaskCard__c = :id
        ];
    }
    @AuraEnabled
    public static List<TrackTime__c> getTrackTimesBySubTaskId(Id id) {
        return [
                SELECT
                        Id,
                        Time__c,
                        Name,
                        Description__c
                FROM TrackTime__c
                WHERE SubTask__c = :id
        ];
    }
    @AuraEnabled
    public static void deleteById(Id id) {
        Database.delete(id);
    }
}
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
    public static String checkEstimateForUser(Id taskId) {
        TaskCard__c taskCard = [
                SELECT Id,
                        Assignee__c,
                        Estimate__c,
                        Sprint_Project__r.Hours__c,
                        Sprint_Project__c
                FROM TaskCard__c
                WHERE Id = :taskId
        ];
        List<TaskCard__c> taskCards = [
                SELECT
                        Assignee__c,
                        Estimate__c,
                        Id,
                        Name,
                        Task_Name__c
                FROM TaskCard__c
                WHERE Sprint_Project__c = :taskCard.Sprint_Project__c
                AND Assignee__c = :taskCard.Assignee__c
        ];
        Decimal totalEstimateForUser = 0;
        if (!taskCards.isEmpty()) {
            for (TaskCard__c card : taskCards) {
                totalEstimateForUser += card.Estimate__c;
            }
        }
        JSONGenerator jsonGen = JSON.createGenerator(true);
        jsonGen.writeStartObject();
        jsonGen.writeNumberField('totalEstimateForUser', totalEstimateForUser);
        jsonGen.writeNumberField('sprintEstimate', taskCard.Sprint_Project__r.Hours__c);
        jsonGen.writeEndObject();
        return jsonGen.getAsString();
    }
    @AuraEnabled
    public static void deleteById(Id id) {
        Database.delete(id);
    }
}
/**
 * Created by Ivan Basenko on 07.11.2018.
 */

public with sharing class SprintProjectController {
    @AuraEnabled
    public static List<Sprint__c> getSprints(Id projectId) {
        return [
                SELECT
                        End_Date__c,
                        Hours__c,
                        Id,
                        Name,
                        Project__c,
                        Sprint_Start_Date__c,
                        Status__c,
                        SystemModstamp,
                        Weeks__c, (
                        SELECT
                                Id,
                                Project__c,
                                Estimate__c,
                                Assignee__c,
                                Name,
                                Task_Name__c,
                                Description__c,
                                Total__c
                        FROM Tasks__r
                )
                FROM Sprint__c
                WHERE Project__c = :projectId
                ORDER BY CreatedDate DESC
        ];
    }

    @AuraEnabled
    public static List<User> checkEstimateForUser(String tasks, String weeks) {
        Integer week = Integer.valueOf(weeks);
        Integer hours = week * 40;

        List<Object> taskCards = (List<Object>) JSON.deserializeUntyped(tasks);
        System.debug(taskCards);
        Map<Id, Integer> userEstimateMap = new Map<Id, Integer>();
        for (Object o : taskCards) {
            Map<String, Object> data = (Map<String, Object>) o;
            Id userID = (Id) data.get('Assignee__c');
            Integer estimate = (Integer) data.get('Estimate__c');
            if (userEstimateMap.get(userID) != null) {
                estimate += userEstimateMap.get(userID);
            }
            userEstimateMap.put(userID, estimate);
        }

        Set<Id> userIdsWhereEstimateBiggestThenSprintHours = new Set<Id>();
        for (Id id : userEstimateMap.keySet()) {
            if (userEstimateMap.get(id) > hours) {
                userIdsWhereEstimateBiggestThenSprintHours.add(id);
            }
        }
        return [
                SELECT
                        Name
                FROM User
                WHERE Id IN :userIdsWhereEstimateBiggestThenSprintHours
        ];
    }

    @AuraEnabled
    public static List<TaskCard__c> getSprintById(Id id) {
        return [
                SELECT
                        Assignee__c,
                        Description__c,
                        Estimate__c,
                        Id,
                        IsDeleted,
                        Name,
                        Project__c,
                        Sprint_Project__c,
                        Stage__c,
                        Task_Name__c,
                        Total__c,
                        Type__c
                FROM TaskCard__c
                WHERE Sprint_Project__c = :id
        ];
    }
}
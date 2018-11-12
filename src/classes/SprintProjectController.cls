/**
 * Created by Ivan Basenko on 07.11.2018.
 */

public with sharing class SprintProjectController {
    @AuraEnabled
    public static void startSprint(Id id) {
        List<Sprint__c> sprints = [
                SELECT
                        End_Date__c,
                        Hours__c,
                        Id,
                        Name,
                        Sprint_Start_Date__c,
                        Status__c,
                        Weeks__c
                FROM Sprint__c
                WHERE Id = :id
        ];
        Sprint__c sprintProject = sprints.get(0);
        Integer weeks = Integer.valueOf(sprintProject.Weeks__c);
        if (sprintProject.Sprint_Start_Date__c == null) {
            sprintProject.Sprint_Start_Date__c = Date.today();
            sprintProject.End_Date__c = Date.today().addDays(weeks * 7);
        } else {
            sprintProject.End_Date__c = sprintProject.Sprint_Start_Date__c.addDays(weeks * 7);
        }
        sprintProject.Hours__c = 40 * weeks;
        sprintProject.Status__c = 'In Progress';
        update sprintProject;
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
}
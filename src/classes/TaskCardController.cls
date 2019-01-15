/**
 * Created by Ivan Basenko on 23.10.2018.
 */

public with sharing class TaskCardController {
    @AuraEnabled
    public static List<TaskCard__c> getBacklogTaskCard(Id id) {
        Id backlogId = getBacklogTypeId();
        return [SELECT Id,Name,Task_Name__c, Description__c,Sprint_Project__c,Estimate__c,RecordTypeId FROM TaskCard__c WHERE RecordTypeId = :backlogId AND Project__c = :id];
    }
    @AuraEnabled
    public static Id getBacklogTypeId() {
        return Schema.SObjectType.TaskCard__c.getRecordTypeInfosByName().get('BackLog').getRecordTypeId();
    }
    @AuraEnabled
    public static Id getSprintTypeId() {
        return Schema.SObjectType.TaskCard__c.getRecordTypeInfosByName().get('Sprint').getRecordTypeId();
    }
    @AuraEnabled
    public static List<TaskCard__c> getSprintTaskCard(Id id) {
        Id sprintId = getSprintTypeId();
        return [
                SELECT Id,Name,Task_Name__c, Description__c,Assignee__c,Estimate__c,Total__c,Sprint_Project__c,RecordTypeId
                FROM TaskCard__c
                WHERE RecordTypeId = :sprintId AND Sprint_Project__c = :id
        ];
    }

    @AuraEnabled
    public static void deleteTask(Id id) {
        Database.delete(id);
    }

    @AuraEnabled
    public static String cloneTask(List<Id> sprintTaskIds, List<Id> backlogTaskIds, Id currentSprintId) {
        Set<Id> allUnCompletedTaskIds = new Set<Id>(sprintTaskIds);
        System.debug(currentSprintId);
        allUnCompletedTaskIds.addAll(backlogTaskIds);
        List<TaskCard__c> originalTasks = [
                SELECT
                        Assignee__c,
                        Description__c,
                        Estimate__c,
                        Id,
                        Name,
                        OwnerId,
                        Project__c,
                        RecordTypeId,
                        Sprint_Project__c,
                        Stage__c,
                        Task_Name__c,
                        Total__c,
                        Type__c, (
                        SELECT
                                Description__c,
                                Estimate__c,
                                Id,
                                Name,
                                Status__c,
                                TaskCard__c,
                                TotalTrack__c
                        FROM SubTask__r
                )
                FROM TaskCard__c
                WHERE Id IN :allUnCompletedTaskIds
        ];
        List<TaskCard__c> tasksToInsert = new List<TaskCard__c>();
        for (TaskCard__c taskCard : originalTasks) {
            TaskCard__c cloneTaskCard = taskCard.clone(false, true, true, false);
            if (backlogTaskIds.contains(taskCard.Id)) {
                cloneTaskCard.Assignee__c = null;
                cloneTaskCard.RecordTypeId = getBacklogTypeId();
                cloneTaskCard.Sprint_Project__c = null;
            } else {
                cloneTaskCard.Sprint_Project__c = currentSprintId;
            }
            cloneTaskCard.Stage__c = 'New';
            tasksToInsert.add(cloneTaskCard);
        }
        System.debug(tasksToInsert);
        insert tasksToInsert;
        return null;
    }
}
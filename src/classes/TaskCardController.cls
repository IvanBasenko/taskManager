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
}
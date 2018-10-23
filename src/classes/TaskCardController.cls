/**
 * Created by Ivan Basenko on 23.10.2018.
 */

public with sharing class TaskCardController {
    @AuraEnabled
    public static List<TaskCard__c> getBacklogTaskCard() {
        Id backlogId = getBacklogTypeId();
        return [SELECT Id,Name, Description__c FROM TaskCard__c WHERE RecordTypeId = :backlogId];
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
    public static List<TaskCard__c> getSpringTaskCard() {
        Id sprintId = getSprintTypeId();
        return [
                SELECT Id,Name, Description__c,Assignee__c,Estimate__c,Total__c
                FROM TaskCard__c
                WHERE RecordTypeId = :sprintId
        ];
    }
    @AuraEnabled
    public static void setRecordType(String id) {
        System.debug(id);
        List<TaskCard__c> sds = [SELECT Id,Name, Description__c,RecordTypeId FROM TaskCard__c WHERE Id = :id];
        System.debug(sds);
        sds.get(0).RecordTypeId = '0121t000000DREgAAO';
        update sds;
    }
}
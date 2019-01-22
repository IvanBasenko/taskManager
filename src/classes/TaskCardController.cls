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
        List<TaskCard__c> tasksToBacklog = new List<TaskCard__c>();
        List<TaskCard__c> tasksToNewSprint = new List<TaskCard__c>();
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
        insert tasksToInsert;
        List<SubTask__c> subTasksToInsert = new List<SubTask__c>();
        for (TaskCard__c taskCard : tasksToInsert) {
            for (SubTask__c subTask : taskCard.SubTask__r) {
                SubTask__c cloneSubTask = subTask.clone(false, true, true, false);
                cloneSubTask.TaskCard__c = taskCard.Id;
                cloneSubTask.Estimate__c = cloneSubTask.Estimate__c - cloneSubTask.TotalTrack__c;
                cloneSubTask.Status__c = 'To Do';
                subTasksToInsert.add(cloneSubTask);
            }
        }
        insert subTasksToInsert;

        Set<Id> insertedTaskIds = (new Map<Id, SObject>(tasksToInsert)).keySet();
        List<TaskCard__c> cloneTask = [
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
                WHERE Id IN :insertedTaskIds
        ];

        for (TaskCard__c taskCard : cloneTask) {
            if (taskCard.Sprint_Project__c == null) {
                tasksToBacklog.add(taskCard);
            } else {
                tasksToNewSprint.add(taskCard);
            }
        }

        JSONGenerator jsonGen = JSON.createGenerator(true);
        jsonGen.writeStartObject();
        jsonGen.writeObjectField('taskToNewSprint', tasksToNewSprint);
        jsonGen.writeObjectField('taskToBacklog', tasksToBacklog);
        jsonGen.writeEndObject();
        return jsonGen.getAsString();
    }
}
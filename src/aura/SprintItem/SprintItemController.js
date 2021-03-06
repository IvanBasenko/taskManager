/**
 * Created by Ivan Basenko on 15.11.2018.
 */
({
    doInit: function (component, event, helper) {
        helper.onInit(component);
    },
    startSprint: function (component) {
        component.set('v.isOpen', true);
    },
    changeState: function changeState(component) {
        component.set('v.isExpanded', !component.get('v.isExpanded'));
    },
    handleDeleteTask: function (component, event, helper) {
        helper.onDeleteTask(component, event);
    },
    handleShowInfo: function (component, event) {
        component.set('v.isStarted', true);
        let sprint = component.get('v.sprint');
        sprint.Status__c = event.getParam('sprintStatus');
        sprint.Sprint_Start_Date__c = event.getParam('startDate');
        component.set('v.sprint', sprint);
    },
    completeSprint: function (component) {
        component.set('v.sprintCompleted', true);
        let tasks = component.get('v.sprint.Tasks__r');
        let sprints = component.get('v.sprintList');
        let items = [];
        let sprintItems = [];
        tasks.forEach((task) => {
            if (task.Stage__c !== 'Complete') {
                let item = {
                    "label": task.Name + ": " + task.Task_Name__c,
                    "value": task.Id
                };
                items.push(item);
            }
        });
        sprints.forEach((sprint) => {
            let item = {
                "label": sprint.Name,
                "value": sprint.Id
            };
            sprintItems.push(item);
        });
        component.set("v.options", items);
        component.set("v.optionsForSprint", sprintItems);
    }
});

/**
 * Created by Ivan Basenko on 14.01.2019.
 */
({
    doInit: function (component) {
        let sprintList = component.get('v.sprintList');
        sprintList = sprintList.filter((sprint) => {
            return sprint.Status__c === 'New';
        });
        component.set('v.sprintList', sprintList);
    },
    closeModal: function (component) {
        let modal = component.find('modal');
        $A.util.addClass(modal, 'hide-modal');
        setTimeout(function () {
            component.set("v.isOpen", false);
        }, 250);
    },
    handleChange: function (component, event) {
        let selectedOptionValue = event.getParam("value");
        component.set('v.SelectedValues', selectedOptionValue);
    },
    sendTasks: function (component) {
        let options = component.get('v.options');
        let tasksToBacklog = component.get('v.SelectedValues');
        let tasksToNewSprint = [];
        let selectedSprint = component.find('selectSprint').get('v.value');
        options.forEach(function (sprint) {
            if (!tasksToBacklog.includes(sprint.value)) {
                tasksToNewSprint.push(sprint.value)
            }
        });
        let action = component.get('c.cloneTask');
        action.setParams({
            "sprintTaskIds": tasksToNewSprint,
            "backlogTaskIds": tasksToBacklog,
            "currentSprintId": selectedSprint
        });
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                let createEvt = component.getEvent("createCloneTasks");
                createEvt.setParams({
                    "item": JSON.parse(response.getReturnValue()),
                    "sprintId": selectedSprint
                });
                createEvt.fire();
                let modal = component.find('modal');
                $A.util.addClass(modal, 'hide-modal');
                setTimeout(function () {

                    component.set('v.options', []);
                    component.set('v.SelectedValues', []);
                    component.set("v.isOpen", false);
                }, 250);
            }
        });
        $A.enqueueAction(action);
    }
});

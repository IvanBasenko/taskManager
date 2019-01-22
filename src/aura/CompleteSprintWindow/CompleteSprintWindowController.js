/**
 * Created by Ivan Basenko on 14.01.2019.
 */
({
    closeModel: function (component) {
        component.set("v.isOpen", false);
    },
    handleChange: function (component, event) {
        let selectedOptionValue = event.getParam("value");
        component.set('v.SelectedValues', selectedOptionValue);
    },
    sendTasks: function (component) {
        let options = component.get('v.options');
        let tasksToBacklog = component.get('v.SelectedValues');
        let tasksToNewSprint = [];
        options.forEach(function (sprint) {
            if (!tasksToBacklog.includes(sprint.value)) {
                tasksToNewSprint.push(sprint.value)
            }
        });
        console.log(JSON.parse(JSON.stringify(tasksToNewSprint)));
        console.log(JSON.parse(JSON.stringify(tasksToBacklog)));
        let action = component.get('c.cloneTask');
        action.setParams({
            "sprintTaskIds": tasksToNewSprint,
            "backlogTaskIds": tasksToBacklog,
            "currentSprintId": component.get('v.currentSprintId')
        });
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                let createEvt = component.getEvent("createCloneTasks");
                createEvt.setParams({
                    "item": JSON.parse(response.getReturnValue())
                });
                createEvt.fire();
                component.set("v.isOpen", false);
                component.set('v.options', []);
                component.set('v.SelectedValues', []);
            }
        });
        $A.enqueueAction(action);
    }
});

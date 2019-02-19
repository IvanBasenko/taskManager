/**
 * Created by Ivan Basenko on 23.10.2018.
 */
({
    // doInit: function (component, event, helper) {
    //     helper.onInit(component);
    // },
    onAddSprint: function (component) {
        component.set('v.isOpen', true);
    },
    handleAddSprint: function (component, event) {
        let sprintList = component.get('v.sprintList');
        let newSprint = event.getParam("sprint");
        sprintList.unshift(newSprint);
        component.set('v.sprintList', sprintList);
        let filteredSprintList = sprintList.filter((element) => {
            return element.Status__c === 'Open';
        });
        component.set('v.filteredSprintList', filteredSprintList);
    },
    updateSprint: function (component, event) {
        let action = component.get('c.getSprintById');
        let sprintId = event.getParam("sprintId");
        action.setParams({
            "id": sprintId
        });
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                let list = component.get('v.sprintList');
                let sprint = list.find((element) => {
                    return element.Id === sprintId;
                });
                let filteredSprintList = list.filter((element) => {
                    return element.Status__c === 'Open';
                });
                sprint.Tasks__r = [];
                sprint.Tasks__r = sprint.Tasks__r.concat(response.getReturnValue());
                component.set('v.sprintList', list);
                component.set('v.filteredSprintList', filteredSprintList);
            }
        });
        $A.enqueueAction(action);
    }
});

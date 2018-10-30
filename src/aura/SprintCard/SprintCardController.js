/**
 * Created by Ivan Basenko on 25.10.2018.
 */
({
    viewDetails: function (component, event, helper) {
        component.set('v.isOpen', true);
    },
    deleteRecord: function (component, event, helper) {
        let recordId = component.get('v.taskCard.Id');
        let action = component.get('c.deleteTask');
        action.setParams({
            "id": recordId
        });
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                component.getEvent("RefreshSprint").fire();
            }
        });
        $A.enqueueAction(action);
    }
});
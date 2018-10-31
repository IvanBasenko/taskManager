/**
 * Created by Ivan Basenko on 25.10.2018.
 */
({
    doInit: function (component, event, helper) {
        let estimate = component.get('v.taskCard.Estimate__c');
        let total = component.get('v.taskCard.Total__c');
        if (estimate !== 0 && total !== 0) {
            let result = (total * 100) / estimate;
            component.set('v.progress', Math.round(result * 100) / 100);
        }
    },
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
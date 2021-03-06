/**
 * Created by Basenko on 11.11.2018.
 */
({
    onInit: function (component) {
        let estimate = component.get('v.taskCard.Estimate__c');
        let total = component.get('v.taskCard.Total__c');
        if (estimate !== 0 && total !== 0) {
            let result = (total * 100) / estimate;
            let progress = Math.round(result * 100) / 100;
            component.set('v.progress', progress);
            component.set('v.maskProgress', 100 - progress);
        } else if (estimate !== 0 && total === 0 || estimate === 0) {
            component.set('v.progress', 0);
            component.set('v.maskProgress', 100);
        }
    },
    onDeleteRecord: function (component) {
        let recordId = component.get('v.taskCard.Id');
        let action = component.get('c.deleteTask');
        action.setParams({
            "id": recordId
        });
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                let deleteTask = component.getEvent("deleteTask");
                deleteTask.setParams({
                    "recordId": recordId
                });
                deleteTask.fire();
            }
        });
        $A.enqueueAction(action);
    }
});
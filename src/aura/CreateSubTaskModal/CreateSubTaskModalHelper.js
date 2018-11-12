/**
 * Created by Basenko on 11.11.2018.
 */
({
    totalEstimateForUser: 0,
    sprintEstimate: 0,

    onLoad: function (component) {
        let recordId = component.get('v.taskCardId');
        let action = component.get('c.checkEstimateForUser');
        action.setParams({
            "taskId": recordId
        });
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                let callback = JSON.parse(response.getReturnValue());
                this.totalEstimateForUser = callback.totalEstimateForUser;
                this.sprintEstimate = callback.sprintEstimate;
            }
        });
        $A.enqueueAction(action);
    },
    onSuccess: function (component) {
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: 'Success Message',
            message: 'SubTask was created',
            type: 'success'
        });
        toastEvent.fire();
        component.set("v.createSubTaskOpen", false);
        //TODO change to refresh on js
        let refreshEvent = component.getEvent("refreshSubTaskList");
        refreshEvent.fire();
    },
    onSubmit: function (component, event) {
        if (!component.get('v.factor')) {
            event.preventDefault();
            let toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Error!!!",
                "message": "Please change estimate on subtasks",
                "type": "error"
            });
            toastEvent.fire();
        }
    },
    onChange: function (component, event) {
        let response = event.getParams('Vh').value;
        let estimate = this.totalEstimateForUser + parseFloat(response);
        component.set('v.factor', estimate <= this.sprintEstimate);
    }
});
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
    onSuccess: function (component, event) {
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: 'Success Message',
            message: 'SubTask was created',
            type: 'success'
        });
        toastEvent.fire();
        component.set("v.createSubTaskOpen", false);
        let response = event.getParams().response;
        let subTask = component.get('v.subTask');
        subTask.Id = response.id;
        subTask.Name = response.fields.Name.value;
        let createEvt = component.getEvent("createSubTask");
        console.log(JSON.parse(JSON.stringify(subTask)));
        createEvt.setParams({
            "item": subTask
        });
        createEvt.fire();
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
        } else {
            event.preventDefault();
            let eventFields = event.getParam("fields");
            eventFields["TaskCard__c"] = component.get('v.taskCardId');
            component.find('editForm').submit(eventFields);
        }
    },
    onChange: function (component, event) {
        let response = event.getParams('Vh').value;
        let estimate = this.totalEstimateForUser + parseFloat(response);
        component.set('v.factor', estimate <= this.sprintEstimate);
    }
});
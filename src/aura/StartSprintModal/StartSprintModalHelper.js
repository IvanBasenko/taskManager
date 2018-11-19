/**
 * Created by Basenko on 11.11.2018.
 */
({
    onChange: function (component, event) {
        let tasks = component.get('v.taskCardList');
        let eventFields = event.getParam("value");
        let action = component.get('c.checkEstimateForUser');

        action.setParams({
            "tasks": JSON.stringify(tasks),
            "weeks": eventFields
        });
        action.setCallback(this, function (response) {
            let userArray = [];
            if (response.getState() === 'SUCCESS') {
                userArray = response.getReturnValue();
            }
            let string = '';
            userArray.forEach((element) => {
                string += element.Name + ', ';
            });
            string = string.replace(/,(?=[^,]*$)/, ' ');
            string = string.replace(/,(?=[^,]*$)/, ' and');
            if (userArray.length > 0) {
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Warning!!!",
                    "message": string + "has bigger estimate then project hours",
                    "type": "warning"
                });
                toastEvent.fire();
                component.set('v.factor', false);
            } else {
                component.set('v.factor', true);
            }
        });

        $A.enqueueAction(action);
    },
    onSubmit: function (component, event) {
        let eventFields = event.getParam("fields");
        if (!eventFields.Weeks__c) {
            event.preventDefault();
            let toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Error!!!",
                "message": "Please fill weeks field",
                "type": "error"
            });
            toastEvent.fire();
        } else if (!component.get('v.factor')) {
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
    onSuccess: function (component) {
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: 'Success',
            message: 'Sprint has been started',
            type: 'success'
        });
        toastEvent.fire();
        component.set("v.isOpen", false);
        let recordId = component.get('v.recordId');
        let action = component.get('c.startSprint');
        action.setParams({
            "id": recordId
        });
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                component.getEvent("showInfo").fire();
            }
        });
        $A.enqueueAction(action);
    }
});
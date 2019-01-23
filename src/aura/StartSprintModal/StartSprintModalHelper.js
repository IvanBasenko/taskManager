/**
 * Created by Basenko on 11.11.2018.
 */
({
    onChange: function (component, event) {
        let tasks = component.get('v.sprint.Tasks__r');
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
        } else {
            event.preventDefault();
            let eventFields = event.getParam("fields");
            let weeks = eventFields['Weeks__c'];
            let startDate = component.get('v.sprint.Sprint_Start_Date__c');
            if (startDate === undefined) {
                let result = new Date();
                result.setDate(result.getDate() + (7 * weeks));
                eventFields["Sprint_Start_Date__c"] = $A.localizationService.formatDate(new Date(), "yyyy-MM-dd");
                eventFields["End_Date__c"] = $A.localizationService.formatDate(result, "yyyy-MM-dd");
            } else {
                let result = new Date(startDate);
                result.setDate(result.getDate() + (7 * weeks));
                eventFields["End_Date__c"] = $A.localizationService.formatDate(result, "yyyy-MM-dd");
            }
            eventFields["Hours__c"] = weeks * 40;
            component.find('editForm').submit(eventFields);
        }
    },
    onSuccess: function (component, event) {
        let modal = component.find('modal');
        $A.util.addClass(modal, 'hide-modal');
        setTimeout(function () {
            let toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: 'Success',
                message: 'Sprint has been started',
                type: 'success'
            });
            toastEvent.fire();
            component.set("v.isOpen", false);
            let response = event.getParams('Vn');
            let showInfoEvt = component.getEvent("showInfo");
            showInfoEvt.setParams({
                "sprintStatus": response.fields.Status__c.value,
                "startDate": response.fields.Sprint_Start_Date__c.value
            });
            showInfoEvt.fire();
        }, 250);
    }
});

/**
 * Created by Ivan Basenko on 19.11.2018.
 */
({
    onSuccess: function (component, event) {
        let modal = component.find('modal');
        $A.util.addClass(modal, 'hide-modal');
        setTimeout(function () {
            let toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: 'Success Message',
                message: 'Sprint has created',
                type: 'success'
            });
            toastEvent.fire();
            component.set("v.isOpen", false);
            const response = event.getParam("fields");
            let sprint = component.get('v.newSprint');
            sprint.Id = event.getParam("id");
            sprint.Name = response['Name'].value;
            sprint.Sprint_Start_Date__c = response['Sprint_Start_Date__c'].value;
            sprint.End_Date__c = response['End_Date__c'].value;
            let addSprint = component.getEvent("addSprint");
            addSprint.setParams({
                "sprint": sprint
            });
            addSprint.fire();
        }, 250);
    },
    onSubmit: function (component, event) {
        let sprintList = component.get('v.sprintList');
        sprintList = sprintList.filter((element) => {
            return element.Status__c !== 'Closed' || element.Status__c !== 'Complete';
        });
        let eventFields = event.getParam("fields");
        if (!eventFields.Name) {
            event.preventDefault();
            let toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Error!!!",
                "message": "Please fill name field",
                "type": "error"
            });
            toastEvent.fire();
        } else {
            event.preventDefault();
            let eventFields = event.getParam("fields");
            let weeks = eventFields['Weeks__c'];
            let startDateField = eventFields['Sprint_Start_Date__c'];
            let startDate = new Date(startDateField);
            let endDate = new Date(startDateField).setDate(startDate.getDate() + (7 * weeks));
            let isCorrect = true;
            if (startDate <= new Date().setHours(0, 0, 0, 0)) {
                isCorrect = false;
            }
            sprintList.some(function (sprint) {
                let tempDate = new Date(startDate);
                let startSprintDate = new Date(sprint.Sprint_Start_Date__c);
                let endSprintDate = new Date(sprint.End_Date__c);
                while (tempDate <= endDate) {
                    if (startSprintDate <= tempDate && tempDate <= endSprintDate) {
                        isCorrect = false;
                        break;
                    }
                    tempDate.setDate(tempDate.getDate() + 1);
                }
                return isCorrect === false;
            });

            if (isCorrect) {
                eventFields["End_Date__c"] = $A.localizationService.formatDate(endDate, "yyyy-MM-dd");
                eventFields["Hours__c"] = weeks * 40;
                eventFields["Status__c"] = 'Open';
                eventFields["Project__c"] = component.get('v.projectId');
                component.find('editForm').submit(eventFields);
            } else {
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Error!!!",
                    "message": "Conflict date with another sprint or start date is past",
                    "type": "error"
                });
                toastEvent.fire();
            }


        }
    }
});

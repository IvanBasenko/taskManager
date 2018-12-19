/**
 * Created by Ivan Basenko on 19.11.2018.
 */
({
    onSuccess: function (component, event) {
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
        let addToSprint = component.getEvent("addSprint");
        addToSprint.setParams({
            "sprint": sprint
        });
        addToSprint.fire();
    },
    onSubmit: function (component, event) {
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
            let startDate = eventFields['Sprint_Start_Date__c'];
            let result = new Date(startDate);
            result.setDate(result.getDate() + (7 * weeks));
            eventFields["End_Date__c"] = $A.localizationService.formatDate(result, "yyyy-MM-dd");
            eventFields["Hours__c"] = weeks * 40;
            eventFields["Status__c"] = 'Open';
            eventFields["Project__c"] = component.get('v.projectId');
            component.find('editForm').submit(eventFields);
        }
    }
});
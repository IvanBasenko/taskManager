/**
 * Created by Ivan Basenko on 25.10.2018.
 */
({
    onSuccess: function (component, event) {
        let modal = component.find('modal');
        $A.util.addClass(modal, 'hide-modal');
        setTimeout(function () {
            let toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: 'Success',
                message: 'Task has been added to sprint',
                type: 'success'
            });
            toastEvent.fire();
            component.set("v.isOpen", false);
            let task = component.get('v.taskCard');
            const recordData = event.getParam("fields");
            task.Estimate__c = recordData["Estimate__c"].value;
            task.Total__c = recordData["Total__c"].value;
            task.Sprint_Project__c = recordData["Sprint_Project__c"].value;
            task.Task_Name__c = recordData["Task_Name__c"].value;
            let addToSprintEvt = component.getEvent("addToSprint");
            addToSprintEvt.setParams({
                "taskCard": component.get('v.taskCard')
            });
            addToSprintEvt.fire();
        }, 250);
    },
    onSubmit: function (component, event) {
        let eventFields = event.getParam("fields");
        if (!eventFields.Assignee__c || !eventFields.Sprint_Project__c) {
            event.preventDefault();
            let toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Error!!!",
                "message": "Please fill all fields",
                "type": "error"
            });
            toastEvent.fire();
        } else {
            component.find('editForm').submit();
        }
    }
});

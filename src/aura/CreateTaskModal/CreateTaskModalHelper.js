/**
 * Created by Basenko on 11.11.2018.
 */
({
    onSuccess: function (component, event) {
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: 'Success Message',
            message: 'Task has been created',
            type: 'success'
        });
        toastEvent.fire();
        component.set("v.isOpen", false);
        let response = event.getParams().response;
        let task = component.get('v.taskCard');
        task.Id = response.id;
        task.Name = response.fields.Name.value;
        let addToBacklog = component.getEvent("addToBacklog");
        addToBacklog.setParams({
            "taskCard": task
        });
        addToBacklog.fire();
    },
    onSubmit: function (component, event) {
        event.preventDefault();
        let eventFields = event.getParam("fields");
        eventFields["Project__c"] = component.get('v.projectId');
        component.find('editForm').submit(eventFields);
    }
});
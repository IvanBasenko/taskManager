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
        let response = component.find("createTask");
        const recordData = event.getParam("fields");
        let addToBacklog = component.getEvent("addToBacklog");
        let task = component.get('v.taskCard');
        task.Id = response.get('v.recordId');
        task.Name = recordData["Name"].value;
        addToBacklog.setParams({
            "taskCard": task
        });
        addToBacklog.fire();
    }
});
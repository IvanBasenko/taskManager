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
        let response = event.getParams().response;
        let sprint = component.get('v.newSprint');
        sprint.Id = response.id;
        sprint.Name = response.fields.Name.value;
        let addToBacklog = component.getEvent("addSprint");
        addToBacklog.setParams({
            "sprint": sprint
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
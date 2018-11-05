/**
 * Created by Ivan Basenko on 24.10.2018.
 */
({
    closeModel: function (component, event, helper) {
        component.set("v.isOpen", false);
    },
    handleSuccess: function (component, event, helper) {
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: 'Success Message',
            message: 'Mode is pester ,duration is 5sec and this is normal Message',
            type: 'success',
            mode: 'pester'
        });
        toastEvent.fire();
        component.set("v.isOpen", false);
        let response = component.find("createTask");
        const recordData = event.getParam("fields");
        let addToBack = component.getEvent("addToBack");
        let task = component.get('v.taskCard');
        task.Id = response.get('v.recordId');
        task.Name = recordData["Name"].value;
        addToBack.setParams({
            "taskCard": task
        });
        addToBack.fire();
    }
});
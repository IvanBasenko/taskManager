/**
 * Created by Ivan Basenko on 25.10.2018.
 */
({
    closeModel: function (component, event, helper) {
        component.set("v.isOpen", false);

    },
    handleSuccess: function (component, event, helper) {
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: 'Success',
            message: 'Task has been added to sprint',
            type: 'success',
            mode: 'pester'
        });
        toastEvent.fire();
        component.set("v.isOpen", false);
        let task = component.get('v.taskCard');
        const recordData = event.getParam("fields");
        task.Estimate__c = recordData["Estimate__c"].value;
        task.Total__c = recordData["Total__c"].value;
        let addToSprintEvt = component.getEvent("addToSprint");
        addToSprintEvt.setParams({
            "taskCard": component.get('v.taskCard')
        });
        addToSprintEvt.fire();
        // $A.get("e.force:refreshView").fire();
        // helper.onInit(component);
    }
});
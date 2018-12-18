/**
 * Created by Ivan Basenko on 25.10.2018.
 */
({
    closeModel: function (component) {
        let task = component.get('v.taskCard');
        let r = component.getEvent("RefreshSprint");
        r.setParams({
            sprintId: task.Sprint_Project__c
        });
        r.fire();
        component.set("v.isOpen", false);
    },
    handleSuccess: function () {
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: 'Success',
            message: 'This task has been changed',
            type: 'success'
        });
        toastEvent.fire();
    }
});
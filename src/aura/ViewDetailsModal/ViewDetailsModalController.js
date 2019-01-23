/**
 * Created by Ivan Basenko on 25.10.2018.
 */
({
    closeModal: function (component) {
        let task = component.get('v.taskCard');
        let sprintUpdateEvent = component.getEvent("SprintUpdate");
        sprintUpdateEvent.setParams({
            sprintId: task.Sprint_Project__c
        });
        sprintUpdateEvent.fire();
        let modal = component.find('modal');
        $A.util.addClass(modal, 'hide-modal');
        setTimeout(function () {
            component.set("v.isOpen", false);
        }, 250);
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

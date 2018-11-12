/**
 * Created by Ivan Basenko on 25.10.2018.
 */
({
    closeModel: function (component) {
        component.getEvent("RefreshSprint").fire();
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
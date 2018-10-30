/**
 * Created by Ivan Basenko on 30.10.2018.
 */
({
    closeModel: function (component, event, helper) {
        component.set("v.createSubTaskOpen", false);
    },
    handleSuccess: function (component, event, helper) {
        // this.closeModel(component,event,helper);
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: 'Success Message',
            message: 'Mode is pester ,duration is 5sec and this is normal Message',
            type: 'success',
            mode: 'pester'
        });
        toastEvent.fire();
        component.set("v.createSubTaskOpen", false);
        let refreshEvent = component.getEvent("refreshSubTaskList");
        refreshEvent.fire();
    },
});
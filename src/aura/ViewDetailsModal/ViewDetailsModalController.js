/**
 * Created by Ivan Basenko on 25.10.2018.
 */
({
    closeModel: function (component, event, helper) {
        component.getEvent("RefreshSprint").fire();
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

    }
});
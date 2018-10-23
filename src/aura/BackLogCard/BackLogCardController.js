/**
 * Created by Ivan Basenko on 23.10.2018.
 */
({
    addToSprint: function (component, event, helper) {
        helper.toSprint(component);
    },

    editRecord : function(component, event, helper) {
        helper.showHide(component);
    },
    handleSuccess : function(component, event, helper) {
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : 'Success Message',
            message: 'Mode is pester ,duration is 5sec and this is normal Message',
            type: 'success',
            mode: 'pester'
        });
        toastEvent.fire();
        helper.showHide(component);
    },
    handleCancel : function(component, event, helper) {
        helper.showHide(component);
        event.preventDefault();
    }
});
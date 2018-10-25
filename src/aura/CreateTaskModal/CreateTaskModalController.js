/**
 * Created by Ivan Basenko on 24.10.2018.
 */
({
    closeModel: function (component, event, helper) {
        component.set("v.isOpen", false);
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
        component.set("v.isOpen", false);
        let refreshEvent = component.getEvent("RefreshBackLog");
        refreshEvent.fire();
        // helper.onInit(component);
    },
    showRequiredFields: function (component, event, helper) {
        component.set('v.showSpinner', false);
        // $A.util.removeClass(component.find("Input_contract_type__c"), "none");
    }
});
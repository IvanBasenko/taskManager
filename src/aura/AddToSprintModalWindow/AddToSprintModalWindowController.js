/**
 * Created by Ivan Basenko on 25.10.2018.
 */
({
    doInit: function (component, event, helper) {
        window.onbeforeunload = function () {
            component.getEvent("changeRecordType").fire();
        }
    },
    closeModel: function (component, event, helper) {
        component.set("v.isOpen", false);
        component.getEvent("changeRecordType").fire();
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

        let addToSprintEvt = component.getEvent("addToSprint");
        addToSprintEvt.setParams({
            "taskCard": component.get('v.taskCard')
        });
        addToSprintEvt.fire();
        // $A.get("e.force:refreshView").fire();
        // helper.onInit(component);
    },
    showRequiredFields: function (component, event, helper) {

        component.set('v.showSpinner', false);
        // $A.util.removeClass(component.find("Input_contract_type__c"), "none");
    }
});
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
        debugger;
        let response = event.getParams().response;
        console.log(JSON.parse(JSON.stringify(response)).fields.Name.value);
        let addToSprintEvt = component.getEvent("addToBack");
        let task = component.get('v.taskCard');
        task.Id = JSON.parse(JSON.stringify(response)).id;
        task.Name = JSON.parse(JSON.stringify(response)).fields.Name.value;
        addToSprintEvt.setParams({
            "taskCard": task
        });
        addToSprintEvt.fire();
    },
    showRequiredFields: function (component, event, helper) {
        component.set('v.showSpinner', false);
        // $A.util.removeClass(component.find("Input_contract_type__c"), "none");
    }
});
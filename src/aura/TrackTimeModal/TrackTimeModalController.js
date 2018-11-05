/**
 * Created by Ivan Basenko on 26.10.2018.
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
        let refreshEvent = component.getEvent("refreshSubTask");
        refreshEvent.fire();
        let response = event.getParams().response;
        let addTimeEvt = component.getEvent("addTime");
        addTimeEvt.setParams({
            'time': response.fields.Time__c.value
        });
        addTimeEvt.fire();
    },
});
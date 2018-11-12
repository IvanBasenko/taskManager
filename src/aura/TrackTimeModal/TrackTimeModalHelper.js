/**
 * Created by Basenko on 12.11.2018.
 */
({
    onSuccess: function (component, event) {
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: 'Success Message',
            message: 'Mode is pester ,duration is 5sec and this is normal Message',
            type: 'success'
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
    }
});
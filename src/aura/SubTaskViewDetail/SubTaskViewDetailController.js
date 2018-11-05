/**
 * Created by Ivan Basenko on 30.10.2018.
 */
({
    handleSuccess: function (component, event, helper) {
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: 'Success Message',
            message: 'Mode is pester ,duration is 5sec and this is normal Message',
            type: 'success',
            mode: 'pester'
        });
        toastEvent.fire();
        helper.showHide(component);
    },
    handleCancel: function (component, event, helper) {
        helper.showHide(component);
        event.preventDefault();
    },
    addTime: function (component, event, helper) {
        let time = event.getParam("time");
        let totalTrack = component.get('v.subTask.TotalTrack__c');
        component.set('v.subTask.TotalTrack__c', totalTrack + time)
    },
    delTime: function (component, event, helper) {
        let time = event.getParam("time");
        let totalTrack = component.get('v.subTask.TotalTrack__c');
        component.set('v.subTask.TotalTrack__c', totalTrack - time)
    }
});
/**
 * Created by Ivan Basenko on 23.10.2018.
 */
({
    onInit: function (component) {
        let action = component.get('c.getBacklogTaskCard');
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                component.set('v.taskCardList', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
        this.setRecordTypeId(component);
    },
    createRecord: function (component) {
        let recordTypeId = component.get('v.backlogId');
        let createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams({
            "entityApiName": "TaskCard__c",
            "recordTypeId": recordTypeId,
            // using account standard object for this sample
        });
        createRecordEvent.fire();
    },
    setRecordTypeId: function (component) {
        let action = component.get('c.getBacklogTypeId');
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                component.set('v.backlogId', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    }
});
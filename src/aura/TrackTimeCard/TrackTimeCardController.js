/**
 * Created by Ivan Basenko on 30.10.2018.
 */
({
    deleteRecord: function (component) {
        let recordId = component.get('v.trackTime.Id');
        let action = component.get('c.deleteById');
        action.setParams({
            "id": recordId
        });
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {

            }
        });
        $A.enqueueAction(action);
        component.getEvent('refreshSubTask').fire();
        let addTimeEvt = component.getEvent("delTime");
        addTimeEvt.setParams({
            'time': component.get('v.trackTime.Time__c')
        });
        addTimeEvt.fire();
    },
});
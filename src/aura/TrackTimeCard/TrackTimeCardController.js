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
        $A.enqueueAction(action);
        //TODO change to js delete
        component.getEvent('refreshSubTask').fire();
        let delTimeEvt = component.getEvent("delTime");
        delTimeEvt.setParams({
            'time': component.get('v.trackTime.Time__c')
        });
        delTimeEvt.fire();
    }
});
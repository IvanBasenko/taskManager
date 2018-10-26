/**
 * Created by Ivan Basenko on 25.10.2018.
 */
({
    doInit: function (component, event, helper) {
        let recordId = component.get('v.subTaskId');
        let action = component.get('c.getTrackTimesBySubTaskId');
        action.setParams({
            "id": recordId
        });
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                component.set('v.trackTimeList', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    createTrackTime: function (component, event, helper) {
        component.set('v.isOpen', true);
    },
});
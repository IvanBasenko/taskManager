/**
 * Created by Basenko on 12.11.2018.
 */
({
    onInit: function (component) {
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
    }
});
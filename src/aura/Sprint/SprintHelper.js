/**
 * Created by Ivan Basenko on 23.10.2018.
 */
({
    onInit: function (component) {
        let action = component.get('c.getSprints');
        let projectId = component.get('v.projectId');
        action.setParams({
            "projectId": projectId
        });
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                component.set('v.sprintList', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    }
});
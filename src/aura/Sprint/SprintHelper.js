/**
 * Created by Ivan Basenko on 23.10.2018.
 */
({
    onInit: function (component) {
        let action = component.get('c.getSprintTaskCard');
        let projectSprintId = component.get('v.projectSprint');
        action.setParams({
            "id": projectSprintId
        });
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                component.set('v.taskCardList', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    }
});
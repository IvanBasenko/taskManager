/**
 * Created by Ivan Basenko on 15.11.2018.
 */
({
    onInit: function (component) {
        let action = component.get('c.getSprintTaskCard');
        let projectSprintId = component.get('v.sprint');
        action.setParams({
            "id": projectSprintId.Id
        });
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                component.set('v.taskCardList', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    }
});
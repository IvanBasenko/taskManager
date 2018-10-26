/**
 * Created by Ivan Basenko on 25.10.2018.
 */
({
    onInit: function (component) {
        let recordId = component.get('v.taskId');
        let action = component.get('c.getSubTasksByTaskId');
        action.setParams({
            "id": recordId
        });
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                component.set('v.subTaskList', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    }
});
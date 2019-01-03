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
    },
    deleteRecord: function (component, recordId) {
        let action = component.get('c.deleteById');
        action.setParams({
            "id": recordId
        });
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                let subTaskList = component.get('v.subTaskList');
                subTaskList = subTaskList.filter((element) => {
                    return element.Id !== recordId;
                });
                component.set('v.subTaskList', subTaskList);
            }
        });
        $A.enqueueAction(action);
    },
});
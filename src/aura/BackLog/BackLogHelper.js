/**
 * Created by Ivan Basenko on 23.10.2018.
 */
({
    onInit: function (component) {
        let action = component.get('c.getBacklogTaskCard');
        let projectId = component.get('v.projectId');
        action.setParams({
            "id": projectId
        });
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                component.set('v.taskCardList', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    onDeleteTask: function (component, event) {
        let deleteTaskId = event.getParam("recordId");
        let taskList = component.get('v.taskCardList');
        taskList = taskList.filter((element) => {
            return element.Id !== deleteTaskId;
        });
        component.set('v.taskCardList', taskList);
    }
});
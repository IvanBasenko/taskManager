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
    },
    onDeleteTask: function (component, event) {
        let deleteTaskId = event.getParam("recordId");
        let sprint = component.get('v.sprint');
        sprint.Tasks__r = sprint.Tasks__r.filter((element) => {
            return element.Id !== deleteTaskId;
        });
        component.set('v.sprint', sprint);
    }
});
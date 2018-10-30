/**
 * Created by Ivan Basenko on 25.10.2018.
 */
({
    doInit: function (component, event, helper) {
        helper.onInit(component);
    },
    deleteSubTask: function (component, event, helper) {
        let index = event.getSource().get("v.name");
        let subTasks = component.get("v.subTaskList");
        let subTask = subTasks[index];
        helper.deleteRecord(component, subTask.Id);
    }
});
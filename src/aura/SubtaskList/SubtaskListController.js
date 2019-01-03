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
    },
    onCreateRecord: function (component) {
        component.set('v.createSubTaskOpen', true);
    },
    addSubTask: function (component, event) {
        let subTaskList = component.get('v.subTaskList');
        let subTask = event.getParam("item");
        subTaskList.push(subTask);
        component.set('v.subTaskList', subTaskList);
    },
});
/**
 * Created by Ivan Basenko on 23.10.2018.
 */
({
    doInit: function (component, event, helper) {
        helper.onInit(component);
    },
    onCreateRecord: function (component) {
        component.set('v.isOpen', true);
    },
    toBacklog: function (component, event) {
        let backLogList = component.get('v.taskCardList');
        let newTask = event.getParam("taskCard");
        backLogList.push(newTask);
        component.set('v.taskCardList', backLogList);
    },
    handleDeleteTask: function (component, event, helper) {
        helper.onDeleteTask(component, event);
    }
});
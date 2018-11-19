/**
 * Created by Ivan Basenko on 15.11.2018.
 */
({
    doInit: function (component, event, helper) {
        helper.onInit(component);
    },
    startSprint: function (component) {
        component.set('v.isOpen', true);
    },
    changeState: function changeState(component) {
        component.set('v.isExpanded', !component.get('v.isExpanded'));
    },
    handleDeleteTask: function (component, event, helper) {
        helper.onDeleteTask(component, event);
    }
});
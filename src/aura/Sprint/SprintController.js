/**
 * Created by Ivan Basenko on 23.10.2018.
 */
({
    doInit: function (component, event, helper) {
        helper.onInit(component);
    },
    onAddSprint: function (component) {
        component.set('v.isOpen', true);
    },
    handleAddSprint: function (component, event) {
        let sprintList = component.get('v.sprintList');
        let newSprint = event.getParam("sprint");
        sprintList.push(newSprint);
        component.set('v.sprintList', sprintList);
    },
});
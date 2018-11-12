/**
 * Created by Ivan Basenko on 23.10.2018.
 */
({
    doInit: function (component, event, helper) {
        helper.onInit(component);
    },
    startSprint: function (component) {
        component.set('v.isOpen', true);
    }
});
/**
 * Created by Ivan Basenko on 25.10.2018.
 */
({
    doInit: function (component, event, helper) {
        helper.onInit(component);
    },
    createTrackTime: function (component) {
        component.set('v.isOpen', true);
    },
});
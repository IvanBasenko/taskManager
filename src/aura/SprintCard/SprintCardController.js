/**
 * Created by Ivan Basenko on 25.10.2018.
 */
({
    doInit: function (component, event, helper) {
        helper.onInit(component);
    },
    viewDetails: function (component) {
        component.set('v.isOpen', true);
    },
    deleteRecord: function (component, event, helper) {
        helper.onDeleteRecord(component);
    }
});
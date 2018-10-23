/**
 * Created by Ivan Basenko on 23.10.2018.
 */
({
    doInit: function (component, event, helper) {
        helper.onInit(component);
    },
    onCreateRecord:function(component, event, helper) {
        helper.createRecord(component,event);
    }
});
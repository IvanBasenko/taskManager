/**
 * Created by Ivan Basenko on 30.10.2018.
 */
({
    closeModel: function (component) {
        component.set("v.createSubTaskOpen", false);
    },
    handleSuccess: function (component, event, helper) {
        helper.onSuccess(component);
    },
});
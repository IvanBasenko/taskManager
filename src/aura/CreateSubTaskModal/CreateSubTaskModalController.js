/**
 * Created by Ivan Basenko on 30.10.2018.
 */
({
    closeModel: function (component) {
        component.set("v.createSubTaskOpen", false);
    },
    handleSuccess: function (component, event, helper) {
        helper.onSuccess(component, event);
    },
    handleSubmit: function (component, event, helper) {
        helper.onSubmit(component, event);
    },
    handleChange: function (component, event, helper) {
        helper.onChange(component, event);
    },
    handleLoad: function (component, event, helper) {
        helper.onLoad(component, event);
    },
});
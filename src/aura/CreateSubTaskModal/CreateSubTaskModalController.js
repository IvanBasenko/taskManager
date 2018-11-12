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
    handleSubmit: function (component, event, helper) {
        if (component.get('v.sprintStatus') === 'In Progress') {
            helper.onSubmit(component, event);
        }
    },
    handleChange: function (component, event, helper) {
        if (component.get('v.sprintStatus') === 'In Progress') {
            helper.onChange(component, event);
        }
    },
    handleLoad: function (component, event, helper) {
        if (component.get('v.sprintStatus') === 'In Progress') {
            helper.onLoad(component, event);
        }
    },
});
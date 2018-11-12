/**
 * Created by Ivan Basenko on 07.11.2018.
 */
({
    closeModel: function (component, event, helper) {
        component.set("v.isOpen", false);
    },
    handleChange: function (component, event, helper) {
        helper.onChange(component, event);
    },
    handleSubmit: function (component, event, helper) {
        helper.onSubmit(component, event);
    },
    handleSuccess: function (component, event, helper) {
        helper.onSuccess(component);
    }
});
/**
 * Created by Ivan Basenko on 19.11.2018.
 */
({
    closeModel: function (component) {
        component.set("v.isOpen", false);
    },
    handleSuccess: function (component, event, helper) {
        helper.onSuccess(component, event);
    },
    handleSubmit: function (component, event, helper) {
        helper.onSubmit(component, event);
    }
});
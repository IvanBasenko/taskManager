/**
 * Created by Ivan Basenko on 24.10.2018.
 */
({
    closeModel: function (component) {
        component.set("v.isOpen", false);
    },
    handleSuccess: function (component, event, helper) {
        helper.onSuccess(component, event);
    }
});
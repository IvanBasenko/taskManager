/**
 * Created by Ivan Basenko on 26.10.2018.
 */
({
    closeModel: function (component) {
        component.set("v.isOpen", false);
    },
    handleSuccess: function (component, event, helper) {
        helper.onSuccess(component, event);
    }
});
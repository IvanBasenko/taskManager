/**
 * Created by Ivan Basenko on 30.10.2018.
 */
({
    closeModal: function (component) {
        let modal = component.find('modal');
        $A.util.addClass(modal, 'hide-modal');
        setTimeout(function () {
            component.set("v.createSubTaskOpen", false);
        }, 250);
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

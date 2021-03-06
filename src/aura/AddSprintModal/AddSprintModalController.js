/**
 * Created by Ivan Basenko on 19.11.2018.
 */
({
    closeModal: function (component) {
        let modal = component.find('modal');
        $A.util.addClass(modal, 'hide-modal');
        setTimeout(function () {
            component.set("v.isOpen", false);
        }, 250);
    },
    handleSuccess: function (component, event, helper) {
        helper.onSuccess(component, event);
    },
    handleSubmit: function (component, event, helper) {
        helper.onSubmit(component, event);
    }
});

/**
 * Created by Ivan Basenko on 26.10.2018.
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
    }
});

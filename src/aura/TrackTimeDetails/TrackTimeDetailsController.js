/**
 * Created by Ivan Basenko on 04.01.2019.
 */
({
    closeModal: function (component) {
        let modal = component.find('modal');
        $A.util.addClass(modal, 'hide-modal');
        setTimeout(function () {
            component.set("v.isOpen", false);
        }, 250);
    }
});

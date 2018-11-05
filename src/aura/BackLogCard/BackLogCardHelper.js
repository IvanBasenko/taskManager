/**
 * Created by Ivan Basenko on 23.10.2018.
 */
({
    toSprint: function (component) {
        component.set('v.isOpen', true);
    },
    showHide: function (component) {
        let editForm = component.find("editForm");
        $A.util.toggleClass(editForm, "slds-hide");
        let viewForm = component.find("viewForm");
        $A.util.toggleClass(viewForm, "slds-hide");
    }
});
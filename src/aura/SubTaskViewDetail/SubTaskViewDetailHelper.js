/**
 * Created by Ivan Basenko on 30.10.2018.
 */
({
    showHide: function (component) {
        let editForm = component.find("editForm");
        $A.util.toggleClass(editForm, "slds-hide");
        let viewForm = component.find("viewForm");
        $A.util.toggleClass(viewForm, "slds-hide");
    }
});
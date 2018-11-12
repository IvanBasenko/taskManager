/**
 * Created by Ivan Basenko on 23.10.2018.
 */
({
    toSprint: function (component) {
        component.set('v.isOpen', true);
    },
    //TODO change to delete js
    onDelete: function (component) {
        let recordId = component.get('v.taskCard.Id');
        let action = component.get('c.deleteTask');
        action.setParams({
            "id": recordId
        });
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                component.getEvent("RefreshBackLog").fire();
            }
        });
        $A.enqueueAction(action);
    }
    // showHide: function (component) {
    //     let editForm = component.find("editForm");
    //     $A.util.toggleClass(editForm, "slds-hide");
    //     let viewForm = component.find("viewForm");
    //     $A.util.toggleClass(viewForm, "slds-hide");
    // }
});
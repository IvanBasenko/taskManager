/**
 * Created by Ivan Basenko on 23.10.2018.
 */
({
    toSprint: function (component) {
        let recordId = component.get('v.taskCard.Id');
        let action = component.get('c.setRecordType');
        action.setParams({
            "id": recordId
        });
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
               this.editRecord(component,recordId)
            }
        });
        $A.enqueueAction(action);
    },
    editRecord: function (component,recordId) {
        let editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
            "recordId": recordId// using account standard object for this sample
        });
        editRecordEvent.fire();
    },
    showHide: function (component) {
        let editForm = component.find("editForm");
        $A.util.toggleClass(editForm, "slds-hide");
        let viewForm = component.find("viewForm");
        $A.util.toggleClass(viewForm, "slds-hide");
    }
});
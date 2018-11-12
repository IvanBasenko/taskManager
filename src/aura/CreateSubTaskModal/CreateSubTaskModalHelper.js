/**
 * Created by Basenko on 11.11.2018.
 */
({
    //TODO change to js refresh
    onSuccess: function (component) {
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: 'Success Message',
            message: 'SubTask was created',
            type: 'success'
        });
        toastEvent.fire();
        component.set("v.createSubTaskOpen", false);
        //TODO change to refresh on js
        let refreshEvent = component.getEvent("refreshSubTaskList");
        refreshEvent.fire();
    },
});
/**
 * Created by Basenko on 12.11.2018.
 */
({
    onSuccess: function (component, event) {
        let modal = component.find('modal');
        $A.util.addClass(modal, 'hide-modal');
        setTimeout(function () {
            let toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: 'Success Message',
                message: 'Mode is pester ,duration is 5sec and this is normal Message',
                type: 'success'
            });
            toastEvent.fire();
            component.set("v.isOpen", false);
            let response = event.getParams().response;
            let trackTimeCard = component.get('v.newTrackCard');
            trackTimeCard.Id = response.id;
            trackTimeCard.Time__c = response.fields.Time__c.value;
            trackTimeCard.Description__c = response.fields.Description__c.value;
            let addTrackTimeCard = component.getEvent("addTrackTimeCard");
            addTrackTimeCard.setParams({
                'trackCard': trackTimeCard
            });
            addTrackTimeCard.fire();
        }, 250);
    },
    onSubmit: function (component, event) {
        event.preventDefault();
        let eventFields = event.getParam("fields");
        eventFields["SubTask__c"] = component.get('v.subTaskId');
        component.find('editForm').submit(eventFields);
    }
});

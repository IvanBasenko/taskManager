/**
 * Created by Ivan Basenko on 30.10.2018.
 */
({
    deleteTrackTimeCard: function (component, event) {
        event.preventDefault();
        let trackCard = component.get('v.trackTime');
        let action = component.get('c.deleteById');
        action.setParams({
            "id": trackCard.Id
        });
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                let deleteTrackTimeCardEvt = component.getEvent("deleteTrackTimeCard");
                deleteTrackTimeCardEvt.setParams({
                    'trackCard': trackCard
                });
                deleteTrackTimeCardEvt.fire();
            }
        });
        $A.enqueueAction(action);
    },
    openDetails: function (component) {
        component.set('v.isOpen', true);
    },
});
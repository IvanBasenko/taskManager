/**
 * Created by Ivan Basenko on 25.10.2018.
 */
({
    doInit: function (component, event, helper) {
        helper.onInit(component);
    },
    createTrackTime: function (component) {
        component.set('v.isOpen', true);
    },
    deleteTrackTimeCard: function (component, event) {
        let trackCard = event.getParam("trackCard");
        let trackTimeList = component.get('v.trackTimeList');
        trackTimeList = trackTimeList.filter((element) => {
            return element.Id !== trackCard.Id;
        });
        component.set('v.trackTimeList', trackTimeList)
    },
    addTrackTimeCard: function (component, event) {
        let trackCard = event.getParam("trackCard");
        let trackTimeList = component.get('v.trackTimeList');
        trackTimeList.push(trackCard);
        component.set('v.trackTimeList', trackTimeList)
    }
});
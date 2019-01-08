/**
 * Created by Ivan Basenko on 30.10.2018.
 */
({
    addTime: function (component, event) {
        let trackCard = event.getParam("trackCard");
        let totalTrack = component.get('v.subTask.TotalTrack__c');
        component.set('v.subTask.TotalTrack__c', totalTrack + trackCard.Time__c)
    },
    delTime: function (component, event) {
        let trackCard = event.getParam("trackCard");
        let totalTrack = component.get('v.subTask.TotalTrack__c');
        component.set('v.subTask.TotalTrack__c', totalTrack - trackCard.Time__c)
    }
});
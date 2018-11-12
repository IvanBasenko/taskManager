/**
 * Created by Ivan Basenko on 30.10.2018.
 */
({
    addTime: function (component, event) {
        let time = event.getParam("time");
        let totalTrack = component.get('v.subTask.TotalTrack__c');
        component.set('v.subTask.TotalTrack__c', totalTrack + time)
    },
    delTime: function (component, event) {
        let time = event.getParam("time");
        let totalTrack = component.get('v.subTask.TotalTrack__c');
        component.set('v.subTask.TotalTrack__c', totalTrack - time)
    }
});
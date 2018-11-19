/**
 * Created by Ivan Basenko on 15.11.2018.
 */
({
    onInit: function (component) {
        let sprint = component.get('v.sprint');
        if (sprint.Status__c === 'In Progress' || sprint.Status__c === 'Closed') {
            component.set('v.isStarted', true);
        }
    },
    onDeleteTask: function (component, event) {
        let deleteTaskId = event.getParam("recordId");
        let sprint = component.get('v.sprint');
        sprint.Tasks__r = sprint.Tasks__r.filter((element) => {
            return element.Id !== deleteTaskId;
        });
        component.set('v.sprint', sprint);
    }
});
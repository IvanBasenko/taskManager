/**
 * Created by Ivan Basenko on 01.11.2018.
 */
({
    toSprint: function (component, event) {
        let sprintComponent = component.find('sprintList');
        let backLogComponent = component.find('backLogList');
        let sprintList = sprintComponent.get('v.sprintList');
        let backLogList = backLogComponent.get('v.taskCardList');
        let newSprintCard = event.getParam("taskCard");
        let sprint = sprintList.find((element) => {
            return element.Id === newSprintCard.Sprint_Project__c;
        });
        if (sprint.Tasks__r !== undefined) {
            sprint.Tasks__r.push(newSprintCard);
        } else {
            sprint.Tasks__r = [];
            sprint.Tasks__r.push(newSprintCard);
        }
        let newMass = backLogList.filter((element) => {
            return element.Id !== newSprintCard.Id;
        });
        sprintComponent.set('v.sprintList', sprintList);
        backLogComponent.set('v.taskCardList', newMass);
    },
    // getStatus: function (component) {
    //     component.set('v.status', component.get("v.record").Status__c);
    // }
});
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
        backLogList = backLogList.filter((element) => {
            return element.Id !== newSprintCard.Id;
        });
        sprintComponent.set('v.sprintList', sprintList);
        backLogComponent.set('v.taskCardList', backLogList);
    },
    doInit: function (component) {
        let BreakException = {};
        let backLogComponent = component.find('backLogList');
        let sprintComponent = component.find('sprintList');
        let action = component.get('c.getSprints');
        let projectId = component.get('v.recordId');
        action.setParams({
            "projectId": projectId
        });
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                let sprintList = response.getReturnValue();
                sprintComponent.set('v.sprintList', sprintList);
                sprintList.forEach(function (sprint) {
                    if (sprint.Status__c !== 'Closed') {
                        backLogComponent.set('v.currentSprintId', sprint.Id);
                        sprintComponent.set('v.allSprintCompleted', false);
                        throw BreakException;
                    }
                });
            }
        });
        $A.enqueueAction(action);
    },
});
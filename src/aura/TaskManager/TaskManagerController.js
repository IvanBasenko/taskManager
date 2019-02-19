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
        let sprintComponent = component.find('sprintList');
        let action = component.get('c.getSprints');
        let getProjectName = component.get('c.getProjectName');
        let projectId = component.get('v.recordId');
        getProjectName.setParams({
            "projectId": projectId
        });
        getProjectName.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                let project = response.getReturnValue();
                component.set('v.projectName',project.Name)
            }
        });
        $A.enqueueAction(getProjectName);
        action.setParams({
            "projectId": projectId
        });
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                let sprintList = response.getReturnValue();
                sprintComponent.set('v.sprintList', sprintList);
                let filteredSprintList = sprintList.filter((element) => {
                    return element.Status__c === 'Open';
                });
                sprintComponent.set('v.filteredSprintList', filteredSprintList);
            }
        });
        $A.enqueueAction(action);
    },
    createCloneTask: function (component, event) {
        let clones = event.getParam("item");
        let sprintId = event.getParam("sprintId");
        let backLogComponent = component.find('backLogList');
        let sprintComponent = component.find('sprintList');
        let sprintList = sprintComponent.get('v.sprintList');
        let backLogList = backLogComponent.get('v.taskCardList');
        let sprint = sprintList.find((element) => {
            return element.Id === sprintId;
        });
        let taskToNewSprint = clones.taskToNewSprint;

        taskToNewSprint.forEach(function (task) {
            if (sprint.Tasks__r !== undefined) {
                sprint.Tasks__r.push(task);
            } else {
                sprint.Tasks__r = [];
                sprint.Tasks__r.push(task);
            }
        });
        sprintComponent.set('v.sprintList', sprintList);
        backLogComponent.set('v.taskCardList', backLogList.concat(clones.taskToBacklog));
    }
});

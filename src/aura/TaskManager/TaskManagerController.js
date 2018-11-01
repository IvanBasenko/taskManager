/**
 * Created by Ivan Basenko on 01.11.2018.
 */
({
    toSprint: function (component, event, helper) {
        let sprintComponent = component.find('sprintList');
        let backLogComponent = component.find('backLogList');
        let sprintList = sprintComponent.get('v.taskCardList');
        let backLogList = backLogComponent.get('v.taskCardList');
        let newSprintCard = event.getParam("taskCard");
        newSprintCard.Total__c = 0;
        sprintList.push(newSprintCard);
        console.log(JSON.parse(JSON.stringify(backLogList)));
        let newMass = [];
        backLogList.forEach((element) => {
            if (element.Id !== newSprintCard.Id) {
                newMass.push(element);
            }
        });
        sprintComponent.set('v.taskCardList', sprintList);
        backLogComponent.set('v.taskCardList', newMass);
    }
});
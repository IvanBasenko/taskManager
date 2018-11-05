/**
 * Created by Ivan Basenko on 01.11.2018.
 */
({
    toSprint: function (component, event) {
        let sprintComponent = component.find('sprintList');
        let backLogComponent = component.find('backLogList');
        let sprintList = sprintComponent.get('v.taskCardList');
        let backLogList = backLogComponent.get('v.taskCardList');
        let newSprintCard = event.getParam("taskCard");
        sprintList.push(newSprintCard);
        let newMass = backLogList.filter((element) => {
            return element.Id !== newSprintCard.Id;
        });
        sprintComponent.set('v.taskCardList', sprintList);
        backLogComponent.set('v.taskCardList', newMass);
    }
});
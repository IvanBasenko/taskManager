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
        let index = 0;
        let sprint = sprintList.find((element, i) => {
            index = i;
            return element.Id === newSprintCard.Sprint_Project__c;
        });
        try {
            sprint.Tasks__r.push(newSprintCard);
        } catch (e) {
            sprintList.splice(index, 1);
            let sprintWithTasks = {
                Id: sprint.Id,
                Name: sprint.Name,
                Project__c: sprint.Project__c,
                Tasks__r: []
            };
            sprintWithTasks.Tasks__r.push(newSprintCard);
            sprintList.splice(index, 0, sprintWithTasks);
        }
        let newMass = backLogList.filter((element) => {
            return element.Id !== newSprintCard.Id;
        });
        sprintComponent.set('v.sprintList', sprintList);
        console.log(JSON.parse(JSON.stringify(sprintList)));
        backLogComponent.set('v.taskCardList', newMass);
    },
    // getStatus: function (component) {
    //     component.set('v.status', component.get("v.record").Status__c);
    // }
});
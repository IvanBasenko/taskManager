/**
 * Created by Ivan Basenko on 15.11.2018.
 */
({
    onInit: function (component) {
        let sprint = component.get('v.sprint');
        this.calculateTaskProgress(component, sprint);
        this.calculateTimeProgress(component, sprint);
    },
    onDeleteTask: function (component, event) {
        let deleteTaskId = event.getParam("recordId");
        let sprint = component.get('v.sprint');
        sprint.Tasks__r = sprint.Tasks__r.filter((element) => {
            return element.Id !== deleteTaskId;
        });
        component.set('v.sprint', sprint);
    },
    calculateTaskProgress: function (component, sprint) {
        let tasks = sprint.Tasks__r;
        if (tasks === undefined) {
            return;
        }

        let completeTaskCounter = 0;
        let tasksLength = tasks.length;
        if (tasksLength > 0) {
            for (let i = 0; i < tasksLength; i++) {
                if (tasks[i].Stage__c !== 'Complete') {
                    continue;
                }
                completeTaskCounter++;
            }
        }

        if (completeTaskCounter <= 0) {
            component.set('v.progress', 0);
            component.set('v.maskProgress', 100);
            return;
        }

        let result = (completeTaskCounter * 100) / tasksLength;
        let progress = Math.round(result * 100) / 100;
        component.set('v.progress', progress);
        component.set('v.maskProgress', 100 - progress);
    },
    calculateTimeProgress: function (component, sprint) {
        let now = new Date().getTime();
        let startDate = new Date(sprint.Sprint_Start_Date__c).getTime();
        let endDate = new Date(sprint.End_Date__c).getTime();
        let timeProgress = Math.round(((now - startDate) / (endDate - startDate)) * 100);
        if (timeProgress <= 0) {
            return;
        }
        timeProgress = timeProgress > 100 ? 100 : timeProgress;
        component.set('v.timeProgress', timeProgress);
        component.set('v.maskTimeProgress', 100 - timeProgress);
    }
});

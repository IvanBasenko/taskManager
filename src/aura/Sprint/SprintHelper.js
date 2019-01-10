/**
 * Created by Ivan Basenko on 23.10.2018.
 */
({
    // onInit: function (component) {
    //     let action = component.get('c.getSprints');
    //     let projectId = component.get('v.projectId');
    //     action.setParams({
    //         "projectId": projectId
    //     });
    //     action.setCallback(this, function (response) {
    //         if (response.getState() === 'SUCCESS') {
    //             let sprintList = response.getReturnValue();
    //             component.set('v.sprintList', sprintList);
    //             sprintList.forEach(function (sprint) {
    //                 if (sprint.Status__c !== 'Closed') {
    //                     component.set('v.allSprintCompleted', false);
    //                 }
    //             });
    //         }
    //     });
    //     $A.enqueueAction(action);
    // }
});
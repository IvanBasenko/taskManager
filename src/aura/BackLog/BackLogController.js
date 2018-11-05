/**
 * Created by Ivan Basenko on 23.10.2018.
 */
({
    doInit: function (component, event, helper) {
        helper.onInit(component);
    },
    onCreateRecord:function(component, event, helper) {
        component.set('v.isOpen', true);
    },

    toBack: function (component, event, helper) {
        let backLogList = component.get('v.taskCardList');
        let newSprintCard = event.getParam("taskCard");
        console.log(JSON.parse(JSON.stringify(newSprintCard)));
        backLogList.push(newSprintCard);
        component.set('v.taskCardList', backLogList);
    },
    changeType: function (component, event, helper) {
        let recordId = event.getParam("taskCardId");
        let action = component.get('c.setRecordTypeBackLog');
        action.setParams({
            "id": recordId
        });
        $A.enqueueAction(action);
    },
    handleSuccess: function (component, event, helper) {
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: 'Success Message',
            message: 'Mode is pester ,duration is 5sec and this is normal Message',
            type: 'success',
            mode: 'pester'
        });
        toastEvent.fire();
        helper.onInit(component);
    },
    handleCancel: function (component, event, helper) {
        event.preventDefault();
    }
});
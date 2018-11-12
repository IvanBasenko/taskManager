/**
 * Created by Ivan Basenko on 07.11.2018.
 */
({
    closeModel: function (component, event, helper) {
        component.set("v.isOpen", false);

    },
    handleChange: function (component, event, helper) {
        let recordId = component.get('v.taskCardList');
        let eventFields = event.getParam("value");
        console.log(eventFields);
        let action = component.get('c.checkEstimateForUser');
        let userArray;
        action.setParams({
            "tasks": JSON.stringify(recordId),
            "weeks": eventFields
        });
        action.setCallback(this, function (response) {

            if (response.getState() === 'SUCCESS') {
                userArray = response.getReturnValue();
            }
            let string = '';
            userArray.forEach((element) => {
                string += element.Name + ', ';
                // string += ;
            });
            string = string.replace(/,(?=[^,]*$)/, ' ');
            if (userArray.length > 0) {
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Warning!!!",
                    "message": string + "has bigger estimate then project hours",
                    "type": "warning"
                });
                toastEvent.fire();
                component.set('v.test', false);
            } else {
                component.set('v.test', true);
            }
        });

        $A.enqueueAction(action);
    },
    handleSubmit: function (component, event, helper) {
        let eventFields = event.getParam("fields");
        console.log(event);
        if (!eventFields.Weeks__c) {
            event.preventDefault();
            let toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Error!!!",
                "message": "Please fill weeks field",
                "type": "error"
            });
            toastEvent.fire();
        } else if (!component.get('v.test')) {
            event.preventDefault();
            // let eventFields = event.getParam("fields");
            // let recordId = component.get('v.taskCardList');
            // let map = new Map();
            // recordId.forEach((element) => {
            //     let userId = element.Assignee__c;
            //     let estimate = element.Estimate__c;
            //     if (map.has(userId)) {
            //         estimate += map.get(userId);
            //     }
            //     map.set(userId,estimate);
            // });
            // console.log(map)
            // if (1>0) {
            //     event.preventDefault();
            let toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Error!!!",
                "message": "Please fill weeks field",
                "type": "error"
            });
            toastEvent.fire();
            // }
            // let action = component.get('c.checkEstimateForUser');
            // let userArray;
            // action.setParams({
            //     "tasks": JSON.stringify(recordId),
            //     "weeks": eventFields.Weeks__c
            // });
            // action.setCallback(this, function (response) {
            //     if (response.getState() === 'SUCCESS') {
            //         userArray = response.getReturnValue();
            //     }
            //    if (userArray.length > 0 ) {
            //        event.stopPropagation();
            //        let toastEvent = $A.get("e.force:showToast");
            //        toastEvent.setParams({
            //            "title": "Warning!!!",
            //            "message": userArray.Name+"Please fill weeks field",
            //            "type": "error"
            //        });
            //        toastEvent.fire();
            //    }
            // });
            //
            // $A.enqueueAction(action);
        }
    },
    handleSuccess: function (component, event, helper) {
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: 'Success',
            message: 'Sprint has been started',
            type: 'success'
        });
        toastEvent.fire();
        component.set("v.isOpen", false);
        let recordId = component.get('v.recordId');
        let action = component.get('c.startSprint');
        action.setParams({
            "id": recordId
        });
        $A.enqueueAction(action);
        $A.get("e.force:refreshView").fire();
    }
});
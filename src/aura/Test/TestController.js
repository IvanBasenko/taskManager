/**
 * Created by Ivan Basenko on 19.10.2018.
 */

({
    createRecord: function(component, event, helper) {
        var createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams({
            "entityApiName": "TaskCard__c",
            "recordTypeId" : "0121t000000DREgAAO"// using account standard object for this sample
        });
        createRecordEvent.fire();
    }
})
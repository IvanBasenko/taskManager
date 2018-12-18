/**
 * Created by Ivan Basenko on 10.12.2018.
 */

trigger AccountTrigger on Account (after insert, after update) {
    AccountTriggerHandler accountTriggerHandler = new AccountTriggerHandler();
    if (Trigger.isInsert) {
        accountTriggerHandler.handleInsertAccWithAddress(Trigger.new);
    } else if (Trigger.isUpdate) {
        accountTriggerHandler.handleChangeAddress(Trigger.new, Trigger.oldMap);
    }

}
/**
 * Created by Ivan Basenko on 23.10.2018.
 */
({
    addToSprint: function (component, event, helper) {
        helper.toSprint(component);
    },
    deleteRecord: function (component, event, helper) {
        helper.onDelete(component);
    }
});
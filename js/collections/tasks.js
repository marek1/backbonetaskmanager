define(['backbone','models/task','backbone.localStorage'],function(Backbone,Task,localStorage){
    var Tasks = Backbone.Collection.extend({
		model: Task,
		localStorage: new Store("tasks")
    });
    return Tasks;
});

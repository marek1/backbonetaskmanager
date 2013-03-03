define(['backbone','models/task','backbone.localStorage'],function(Backbone,Task,localStorage){
    var Tasks = Backbone.Collection.extend({
		model: Task,
		localStorage: new Store("tasks"),
		getPrio : function(prio){
			return _(this.filter(function(data) {
				return data.get("prio") == prio;
			}));
		}
    });
    return Tasks;
});

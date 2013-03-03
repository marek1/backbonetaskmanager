define(['backbone'],function(Backbone){
    var Task = Backbone.Model.extend({
		defaults: {
            title: "",
            prio: 1
		}
	}); 
    return Task;
});

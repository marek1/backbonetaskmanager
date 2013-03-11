define(['backbone','freetile','views/tasksview', 'views/dialogview'],function(Backbone, Freetile, TasksView, DialogView){
      
    var homeRouter = Backbone.Router.extend({
        initialize: function(){
			Backbone.history.start();
        },
        routes: {
			'': 'view'
        },
        'view': function(){
			var thisTasksView = new TasksView();
			var thisDialogView = new DialogView();
		}
    });
 
    return new homeRouter();
});

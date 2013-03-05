define(['backbone','views/tasksview', 'views/dialogview'],function(Backbone, TasksView, DialogView){
      
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

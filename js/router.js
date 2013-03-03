define(['backbone','views/tasksview', 'views/dialogview'],function(Backbone, TasksView, DialogView){
      
    var homeRouter = Backbone.Router.extend({
        initialize: function(){
			Backbone.history.start();
        },
        routes: {
			'': 'view',
			'/red': 'red'
        },
        'view': function(){
			_.bindAll(this, 'view', 'red');
			var thisTasksView = new TasksView();
			var thisDialogView = new DialogView();
		},
		'red':function(){
			thisTasksView.render( tasks.red() );
		} 
    });
 
    return new homeRouter();
});

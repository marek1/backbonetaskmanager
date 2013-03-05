define(['jquery', 'backbone','collections/tasks', 'models/task', 'views/taskview'], function($, Backbone, Tasks, Task, TaskView){

    
    var tasksView = Backbone.View.extend({
		el: 'body',
		initialize: function () {	
			_.bindAll(this, 'render', 'renderTask', 'setFilter', 'searchTasks');
			this.collection = new Tasks();
			this.collection.fetch();
			this.render();
            //this.on("change:filterType", this.filterByType, this);
		},
		render: function () {
			$("#container").html('');
			var that=this;
			_.each(this.collection.models, function (item) {
					that.renderTask(item);
			}, this);
		},
		renderTask: function (item) {
			this.TaskView = new TaskView({
                model: item
            });
            $("#container").append(this.TaskView.render().el);
        },
        events: {
            "change #filtertype": "setFilter",
            "click #search-task-button" : "searchTasks"
		},
		setFilter: function(e){
			var filterType = e.currentTarget.value;
			this.collection.fetch();
			if (filterType == "0") {
				var filtered = _.filter(this.collection.models, function (item) {
				return item.get("prio") != "0";
				});
				console.log(filterType);
			} else {
				var filtered = _.filter(this.collection.models, function (item) {
				return item.get("prio") == filterType;
				});
			}
			this.collection.reset(filtered,{ silent: true });
			this.render();
        },
        searchTasks: function(){
			var searchText = $('#search-task-text').val();
			this.collection.fetch();
			var pattern = new RegExp(searchText,"gi");
			var filtered = _.filter(this.collection.models, function (item) {
				//return item.get("title") == searchText;
				return pattern.test(item.get("title"));
			});
			this.collection.reset(filtered,{ silent: true });
			this.render();
		}
        
		
	 });
	 return tasksView;
});

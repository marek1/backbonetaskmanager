define(['jquery', 'freetile', 'bootstrap', 'backbone','collections/tasks', 'models/task', 'views/taskview'], function($, Freetile, Bootstrap, Backbone, Tasks, Task, TaskView){

    
    var dialogView = Backbone.View.extend({
		el: 'body',
		initialize: function () {	
			this.collection = new Tasks();
		},
		render: function () {
			this.renderTask(this.collection.at(this.collection.length-1));
		},
		renderTask: function (item) {
			this.TaskView = new TaskView({
                model: item
            });
            $("#container").append(this.TaskView.render().el);
            this.freetile();
        },
		events:{
			'click #add-task' : 'showDialog',
			'click #dialog-close' : 'closeDialog',
			'click #modal-close' : 'closeDialog',
			'click #add-task-button' : 'addTask'
		},
		addTask: function(){
			var newTitle = $('#add-task-text').val();
			var newPrio = $('#add-task-prio').val();
			if (newTitle!=""){
				this.collection.create({title: newTitle, prio: newPrio});
				this.render();
				this.closeDialog();
			}else{
				$('#add-task-text').css('border','2px solid red');
			}
		},
		showDialog: function () {
			$("#modal1").modal('show');
			this.freetile();
			$('#add-task-text').on('keydown',function(){
				$('textarea').css('border','none');
			});
			$('#add-task-text').on('keyup change', function() {
				var $this = $(this), $offset = this.offsetHeight;
				$offset > $this.height() ?
					$this.css('height ', $offset)
						.attr('rows', $this.val().split('\n').length+1)
						.css({'height' : $this.attr('scrollHeight'),'overflow' : 'hidden'}) :
					$this.css('overflow','auto');
			});
		},
		closeDialog: function () {
			$("#modal1").modal('hide');
			this.removeTextareaBorder();
			this.cleanTextarea();
			this.freetile();
		},
		removeTextareaBorder: function(){
			$('textarea').css('border','none');
		},
		cleanTextarea: function(){
			$('textarea').val('');
		},
		freetile : function(){
			$("#container").freetile();
		}
	 });
	 return dialogView;
});

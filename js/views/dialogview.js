define(['jquery', 'backbone','collections/tasks', 'models/task', 'views/taskview'], function($, Backbone, Tasks, Task, TaskView){

    
    var dialogView = Backbone.View.extend({
		el: 'body',
		initialize: function () {	
			//_.bindAll(this, 'render', 'renderTask', 'addTask', 'showDialog', 'closeDialog', 'removeTextareaBorder', 'cleanTextarea', 'resizeTextarea');
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
        },
		events:{
			'click #add-task' : 'showDialog',
			'click #dialog-close' : 'closeDialog',
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
			$("#dialog,#fade").show();
			$('#add-task-text').on('keydown',function(){
				$('textarea').css('border','none');
			});
			$('#add-task-text').bind('keyup change', function() {
				var $this = $(this), $offset = this.offsetHeight;
				$offset > $this.height() && $offset < 300 ?
					$this.css('height ', $offset)
						.attr('rows', $this.val().split('\n').length+1)
						.css({'height' : $this.attr('scrollHeight'),'overflow' : 'hidden'}) :
					$this.css('overflow','auto');
			});
		},
		closeDialog: function () {
			$("#dialog,#fade").hide();
			this.removeTextareaBorder();
			this.cleanTextarea();
		},
		removeTextareaBorder: function(){
			$('textarea').css('border','none');
		},
		cleanTextarea: function(){
			$('textarea').val('');
		},
		resizeTextarea: function() {
			$('textarea').each(function(i, t){
				var m = 0;
				$($(t).val().split("\n")).each(function(i, s){
				  m += (s.length/(t.offsetWidth/10)) + 1;
				});
				t.style.height = Math.floor(m + 8) + 'em';
			});
		}

		
	 });
	 return dialogView;
});

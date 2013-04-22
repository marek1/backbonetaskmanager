define(['jquery','backbone'], function($, Backbone){
     var taskView = Backbone.View.extend({
		tagName: "div",
		render: function () {

			$(this.el).removeClass();
			var variables = { "title" : this.model.get('title').replace(/\n/g, '<br />'), "prio": this.model.get('prio') };
			var template = _.template( $("#task_template").html(), variables );
			
			$(this.el).addClass('show-task').html(template);
			$(this.el).css("height","auto");
			
            if (this.model.get('prio')=="1"){
				$(this.el).addClass('show-task-1');
			}
			if (this.model.get('prio')=="2"){
				$(this.el).addClass('show-task-2');
			}
			if (this.model.get('prio')=="3"){
				$(this.el).addClass('show-task-3');
			}
			
			this.freetile();
			
			return this;
        },
        
        events: {
            "click .delete": "deleteEntry",
            "click" : "showEntry",
			"click .edit": "editEntry",
			"click #edit-task-button": "submitEditEntry",
			"keyup #edit-task-text": "enlargeTextarea",
			"click .cancel_button": "cancelEdit"
        },
		
		//delete a contact
        deleteEntry: function () {
            
            //remove model
            this.model.destroy();

            //remove view from page
            this.remove();

			//freetile tiles
			this.freetile();
        },
        
        showEntry: function(){
			if ($(this.el).hasClass("open")){
				$(this.el).removeClass("open");
			}else{	
				$(this.el).addClass("open");
			}
			
		},
			
		editEntry: function(){
			var variables = { "title" : this.model.get('title'), "prio": this.model.get('prio') };
			var template = _.template( $("#task_edit_template").html(), variables );
			$(this.el).html(template);
			//this.freetile();
			this.enlargeTextarea();
		},
		
		submitEditEntry: function(){
			var newTitle = $('#edit-task-text').val();
			var newPrio = $('#edit-task-prio').val();
			this.model.save({title: newTitle, prio : newPrio});
			this.render();
		},
		
		cancelEdit: function(){
			this.render();
		},
		
		enlargeTextarea: function(){
			var that = this;
			$('textarea').on('keyup mouseenter ', function(event) {
				$(this).attr('rows', $(this).val().split('\n').length+1);
				that.freetile();
			});
		},
		
        changePrio: function(){
			var prio = this.model.get('prio');
			console.log(prio);
			if (prio=="1") {
				this.model.save({prio:2});
			}
			if (prio=="2") {
				this.model.save({prio:3});
			}
			if (prio=="3") {
				this.model.save({prio:1});
			}
			this.render();
		},
		freetile : function(){
			$("#container").freetile();
		}
    });
    return taskView;

});

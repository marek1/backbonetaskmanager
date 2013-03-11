require.config({
	paths: {
	jquery: 'libs/jquery/jquery-1.7.1.min',
	underscore: 'libs/underscore/underscore-min',
	backbone: 'libs/backbone/backbone-min',
	'backbone.localStorage': 'libs/localstorage/backbone-localstorage-min',
	'bootstrap': 'libs/bootstrap/bootstrap.min'
	},
	shim: {
		underscore: {
		  exports: "_"
		},
		backbone: {
		  deps: ['underscore', 'jquery'],
		  exports: 'Backbone'
		},
		'backbone.localStorage': {
		  deps: ['backbone'],
		  exports: 'Backbone'
		},
		 "bootstrap": ['jquery']
	}
});
require([
'app'
],function(app) {
	app.initialize();
});


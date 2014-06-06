var SITE = {
	init: function() {
		this.setVars();
		this.setCurrentContent();
		this.bindEvents();
	},

	setVars: function() {
		this.$document = $(window.document);
		this.$body = $('body');
		
		this.$word = $('#word');
		this.$defn = $('#definition');
		
		this.$content = $('.content');
		this.$projectTiles = $('.project-img');
		this.$tags = $('.tag');
		this.$navLinks = $('.nav-link');
	},

	getAnchor: function(url) {
		var anchor = '';
		var foundAnchor = false;
		for (var i = 0; i < url.length; i++) {
			if (foundAnchor) {
				anchor += url[i];
			}

			if (url[i] == '#') {
				foundAnchor = true;
			}
		}

		if (!foundAnchor) {
			return 'notajingoist';
		} else {
			return anchor;
		}
	},

	setCurrentContent: function() {
		this.linkSelected = false;
		this.currentLink = this.getAnchor(window.location.href);
		$('#' + this.currentLink).addClass('selected');
		this.$currentContent = $('#content-' + this.currentLink);
		this.$currentContent.addClass('show');
	},

	bindEvents: function() {
		this.$word.on('mouseenter', this.revealDefn.bind(this));
		this.$word.on('mouseleave', this.hideDefn.bind(this));

		this.$navLinks.on('mouseenter', 'a', this.highlightLink.bind(this));
		this.$navLinks.on('mouseleave', 'a', this.unhighlightLink.bind(this));
		this.$navLinks.on('click', 'a', this.selectLink.bind(this));

		this.$tags.on('click', this.filterProjects.bind(this));
		this.$projectTiles.on('click', this.selectTags.bind(this));
	},

	filterProjects: function(e) { //projects page
		this.resetProjectsContent();
		var context = this;

		setTimeout(function() {
			var selectedTag = $(e.currentTarget);
			selectedTag.addClass('highlighted');
			var fullTagName = selectedTag.attr('id');
			var tagName = fullTagName.substring(4, fullTagName.length);

			context.$projectTiles.each(function(i, el) {
				var $el = $(el);
				if ($el.hasClass(tagName)) {
					console.log($el.attr('src'));
					//enlarge, display corresponding description or something
				} else {
					console.log($el.attr('src'));
					$el.addClass('faded');
				}
				
			});
		});
		
	},

	selectTags: function(e) { //projects page
		this.resetProjectsContent();

		var selectedTags = e.currentTarget.className.split(/\s+/);
		//selectedTags[0] = project-img, selectedTags[1...] = tag names
		setTimeout(function() {
			for (var i = 1; i < selectedTags.length ; i++) {
				if (selectedTags[i] != 'last') {
					$('#tag-' + selectedTags[i]).addClass('highlighted');
				}
			}
		});
	},

	resetProjectsContent: function(e) { //projects page
		this.$projectTiles.removeClass('faded');
		this.$tags.removeClass('highlighted');
	},
	
	selectLink: function(e) { //nav link
		//reveal content
		this.resetProjectsContent();

		this.$navLinks.removeClass('selected');
		this.$content.removeClass('show');

		this.linkSelected = false;
		this.$link = $(e.currentTarget).parent();
		var context = this;
		setTimeout(function() {
			context.$link.addClass('selected');
			context.currentLink = context.$link.attr('id');
			this.$targetContent = $('#content-' + $(e.currentTarget).parent().attr('id'));
			this.$targetContent.addClass('show');
		});
	},

	highlightLink: function(e) { //nav link
		this.$target = $(e.currentTarget).parent();
		if (!this.linkSelected && this.$target.attr('id') != this.currentLink) {
			this.$target.addClass('selected');
			this.linkSelected = true;
		}
	},

	unhighlightLink: function(e) { //nav link
		this.$target = $(e.currentTarget).parent();
		if (this.linkSelected && this.$target.hasClass('selected')
			&& this.$target.attr('id') != this.currentLink) {
			this.$target.removeClass('selected');
			this.linkSelected = false;
		}
	},

	revealDefn: function(e) { //header link
		this.$defn.addClass('show');
	},

	hideDefn: function(e) { //header link
		this.$defn.removeClass('show');
	}

	// doSomething: function(e) {
	// 	var $blah = $(e.currentTarget);
	// 	var context = this;

	// 	this.$blah.each(function(index, element) {
	// 		if (element === $('whatever')[0]) {
	// 			$(this).addClass('hello');
	// 		}
	// 	});
	// 	setTimeout(function() {
	// 		context.$blah.removeClass('goodbye');
	// 	});

	// 	e.preventDefault();	
	// }
}

SITE.init();
var SITE = {
	init: function() {
		this.$document = $(window.document);
		this.$body = $('body');
		this.$defn = $('#definition');
		this.$header = $('.header');
		this.$word = $('#word');
		this.$content = $('.content');

		this.$projectTiles = $('.project-img');
		this.$tags = $('.tag');

		this.$li = $('.nav-link');

		//this.$link = $('.nav-link');
		this.bindEvents();

		this.linkSelected = false;
		this.currentLink = 'notajingoist';
		$('#' + this.currentLink).addClass('selected');


		this.$currentContent = $('#content-' + this.currentLink);
		this.$currentContent.addClass('show');

	},

	bindEvents: function() {
		//this.$li.on('click', 'a', this.revealContent.bind(this));
		this.$li.on('mouseenter', 'a', this.highlightLink.bind(this));
		this.$li.on('mouseleave', 'a', this.unhighlightLink.bind(this));
		this.$li.on('click', 'a', this.selectLink.bind(this));
		this.$tags.on('click', this.filterProjects.bind(this));

		this.$word.on('mouseenter', this.revealDefn.bind(this));
		this.$word.on('mouseleave', this.hideDefn.bind(this));
		//this.$link.on('mouseleave', this.hideDefn.bind(this));

		this.$projectTiles.on('click', this.selectTags.bind(this));
	},

	resetProjectsContent: function(e) {
		this.$projectTiles.removeClass('faded');
		this.$tags.removeClass('highlighted');
	},

	selectTags: function(e) {
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
		//alert(classes[0]);
	},

	filterProjects: function(e) {
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

	selectLink: function(e) {
		//alert($());
		this.resetProjectsContent();

		this.$li.removeClass('selected');
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

	highlightLink: function(e) {
		this.$link = $(e.currentTarget).parent();
		if (!this.linkSelected && this.$link.attr('id') != this.currentLink) {
			this.$link.addClass('selected');
			this.linkSelected = true;
		}

		// $(e.currentTarget).on('mouseleave', this.unhighlightLink(this));
	},

	unhighlightLink: function(e) {

		this.$link = $(e.currentTarget).parent();
		if (this.linkSelected && this.$link.hasClass('selected')
			&& this.$link.attr('id') != this.currentLink) {
			this.$link.removeClass('selected');
			this.linkSelected = false;
		}
	},

	revealDefn: function(e) {
		//console.log(e.currentTarget);
		this.$defn.addClass('show');
	},

	hideDefn: function(e) {
		this.$defn.removeClass('show');
	},

	revealContent: function(e) {
		//alert(e.currentTarget.id);
		// alert(e.currentTarget.parent().id);
		// this.$targetContent = $('#content-' + e.currentTarget.parent().id);
		// this.$targetContent.addClass('show');
		//this.$('#content-' + e.currentTarget.id).addClass('show');

		//alert('hi');
		//console.log(this.$defn);
		//this.$defn.addClass('show');
		//this.$word.css('background-color', '#ff0');
	},

	hideContent: function(e) {
		this.$targetContent = $('#content-' + e.currentTarget.id);
		this.$targetContent.removeClass('show');
		//this.$defn.removeClass('show');
		//this.$word.css('background-color', '#fff');
	},

	doSomething: function(e) {
		var $blah = $(e.currentTarget);
		var context = this;

		this.$blah.each(function(index, element) {
			if (element === $('whatever')[0]) {
				$(this).addClass('hello');
			}
		});
		setTimeout(function() {
			context.$blah.removeClass('goodbye');
		});

		e.preventDefault();	
	}
}

SITE.init();
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
		this.$projects = $('.project-tiles');
		this.$contentProjects = $('#content-projects');
		this.$projectPreview = $('.project-preview img');
		this.$projectImgs = $('.project-img');
		this.$tags = $('.tag');
		this.$navLinks = $('.nav-link');

		this.previewExpanded = false;
		this.alreadyCollapsed = true;
		this.previousSrc = '';
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
		this.$projectImgs.on('click', this.selectTags.bind(this));
	},

	resetProjectsContent: function() { //projects page
		//$('.expanded').remove();
		this.$projectImgs.removeClass('faded');
		
		//this.resetProjectPreview();
		//this.resetImageSrc();
		//this.$projectImgs.removeClass('expanded');
		this.$tags.removeClass('highlighted');

		if (!this.previewExpanded && !this.alreadyCollapsed) {
			this.$projectPreview.removeClass('expanded');
			var context = this;
			setTimeout(function() {
				context.$projects.removeClass('expanded');
			}, 400); //wait 0.4s before moving tiles upwards
			this.alreadyCollapsed = true; //next time won't rerun this code
			//this.previewCollapsed = false;
			this.previousSrc = '';
		}
	},

	// resetProjectPreview: function() {
	// 	// if (this.$projects.hasClass('expanded')) {

	// 	// }
	// },

	resetImageSrc: function() {
		var context = this;
		//var $expandedTiles = $('.expanded');
		//$expandedTiles.each(function(i, el) {
		this.$projectImgs.each(function(i, el) {
			var $el = $(el);
			if ($el.hasClass('expanded')) {
				var path = '/projects/';
				var src = $el.attr('src');
				var suffix = context.getImageSrcSuffix(src, path);
				$el.attr('src', 'images/thumbs/' + suffix);
			}
		});
		// setTimeout(function() {
		// 	$expandedTiles.removeClass('expanded');
		// });
	},

	getImageSrcSuffix: function(src, path) {
		var suffix = '';
		var projectsPathFound = false;
		var suffixBeginIdx = 0;
		for (var i = 0; i < src.length - (path.length - 1); i++) {
			if (src.substring(i, i + path.length) === path) {
				projectsPathFound = true;
				suffixBeginIdx = i + path.length;
			}
		}

		if (projectsPathFound) {
			suffix += src.substring(suffixBeginIdx, src.length);
		}

		return suffix;
	},

	filterProjects: function(e) { //projects page
		this.previewExpanded = false; //state wanted after reset
		this.resetProjectsContent();
		var context = this;

		setTimeout(function() {
			var selectedTag = $(e.currentTarget);
			selectedTag.addClass('highlighted');
			var fullTagName = selectedTag.attr('id');
			var tagName = fullTagName.substring(4, fullTagName.length);

			context.$projectImgs.each(function(i, el) {
				var $el = $(el);
				if ($el.hasClass(tagName)) {
					//console.log($el.attr('src'));
					//reshuffle, move these tiles to beginning?
				} else {
					//console.log($el.attr('src'));
					$el.addClass('faded');
				}
				
			});
		});
		
	},

	selectTags: function(e) { //projects page
		var $target = $(e.currentTarget);
		var src = $target.attr('src');

		if (src === this.previousSrc) { //clicking on same icon again
			//this.alreadyCollapsed = false; //...
			this.previewExpanded = false; //state wanted after reset
			this.resetProjectsContent();
		} else {
			this.resetProjectsContent();

			var context = this;
			setTimeout(function() {
				//selectedTags[0] = project-img, selectedTags[1...] = tag names
				var selectedTags = e.currentTarget.className.split(/\s+/);
				for (var i = 1; i < selectedTags.length ; i++) {
					if (selectedTags[i] != 'last') {
						$('#tag-' + selectedTags[i]).addClass('highlighted');
					}
				}

				//enlarge, display corresponding description or something
				
				var path = '/thumbs/';
				var suffix = context.getImageSrcSuffix(src, path);
				var newPath = 'images/projects/' + suffix;


				context.$projectPreview.attr('src', newPath);
				context.previousSrc = src;
				//var $projectPreviewImg = context.$projectPreview;
				//$projectPreviewImg.attr('src', newPath);

				setTimeout(function() {

					
					//console.log(context.$projectPreview[0]);
					//context.$projectPreview.addClass('expanded');
					if (!context.$projects.hasClass('expanded')) {
			
						context.$projects.addClass('expanded');
						context.previewExpanded = true; //new state of preview
						context.alreadyCollapsed = false;
						

						//alert('hi');
					}

					setTimeout(function() {
						context.$projectPreview.addClass('expanded');
					}, 400); //wait 0.4s before fading in preview;
				});

				//this.$contentProjects.

				// context.$projects.prepend(
				// 	'<img class="project-img expanded" src="' 
				// 	+ newPath + '">'
				// );

				// setTimeout(function() {
				// 	window.scrollTo(0, 0);
				// });

				/*var $target = $(e.currentTarget);
				var src = $target.attr('src');
				var path = '/thumbs/';
				var suffix = context.getImageSrcSuffix(src, path);
				$target.attr('src', 'images/projects/' + suffix);
				
				setTimeout(function() {
					$target.addClass('expanded');
				});*/

			});
		}

		
	},
	
	selectLink: function(e) { //nav link
		//reveal content
		this.previewExpanded = false;
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
		var $target = $(e.currentTarget).parent();
		if (!this.linkSelected && $target.attr('id') != this.currentLink) {
			$target.addClass('selected');
			this.linkSelected = true;
		}
	},

	unhighlightLink: function(e) { //nav link
		var $target = $(e.currentTarget).parent();
		if (this.linkSelected && $target.hasClass('selected')
			&& $target.attr('id') != this.currentLink) {
			$target.removeClass('selected');
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
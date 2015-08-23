$(document).ready(function() {
	var menuContent = "<li><a href=\"index.html\">主页</a></li>" + 
				"<li><a href=\"blog.html\">口吃概况</a>" +
					"<ul class=\"sub-menu\">" + 
						"<li class=\"triangle\"><img src=\"images/triangle.png\" /></li>" +
						"<li><a href=\"blog.html\">口吃是啥</a></li>" +
						"<li><a href=\"blog-left.html\">临床症状</a></li>" +
						"<li><a href=\"blog-fullwidth.html\">名人口吃</a></li>" +
					"</ul>" +
				"</li>" +
				"<li><a href=\"gallery.html\">治疗口吃</a>" +
					"<ul class=\"sub-menu\">" +
						"<li class=\"triangle\"><img src=\"images/triangle.png\" /></li>" +
						"<li><a href=\"gallery.html\">矫正原理</a></li>" + 
						"<li><a href=\"gallery-sidebar.html\">治疗方法</a></li>" + 
						"<li><a href=\"gallery-without-text.html\">因龄制宜</a></li>" + 
					"</ul>" + 
				"</li>" + 
				"<li><a href=\"pages.html\">姚在治疗</a>" +
					"<ul class=\"sub-menu\">" +
						"<li class=\"triangle\"><img src=\"images/triangle.png\" /></li>" +
						"<li><a href=\"menu-3-1-introduction.html\">矫正班简介</a></li>" +
						"<li><a href=\"pages-left-sidebar.html\">即刻报名</a></li>" + 
						"<li><a href=\"pages-fullwidth.html\">助你自助</a></li>" +
					"</ul>" +
				"</li>" +
				"<li><a href=\"columns.html\">姚有疗效</a>" +
					"<ul class=\"sub-menu\">" +
						"<li class=\"triangle\"><img src=\"images/triangle.png\" /></li>" +
						"<li><a href=\"columns.html\">患者之声</a></li>" +
						"<li><a href=\"buttons.html\">媒体报道</a></li>" +
						"<li><a href=\"tables.html\">最新动态</a></li>" +
					"</ul>" +
				"</li><li><a href=\"contact.html\">联系我们</a>" +
					"<ul class=\"sub-menu\">" +
						"<li class=\"triangle\"><img src=\"images/triangle.png\" /></li>" +
						"<li><a href=\"contact.html\">联系方式</a></li>" +
						"<li><a href=\"appointment.html\">在线预约</a></li>" +
					"</ul>" +
				"</li>";
	$("#menu-header-menu").html(menuContent);
	//For making tables responsive
	var switched = false;
	var updateTables = function() {
		if (($(window).width() < 480) && !switched ) {
			switched = true;
			$(".table").each(function(i, element) {
				splitTable($(element));
			});
			return true;
		}
		else if (switched && ($(window).width() > 480)) {
			switched = false;
			$(".table").each(function(i, element) {
				unsplitTable($(element));
			});
		}
	};
   
	$(window).load(updateTables);
	$(window).bind("resize", updateTables);
   
	function splitTable(original) {
		original.wrap("<div class='table-wrapper' />");
		var copy = original.clone();
		copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
		copy.removeClass("responsive");
		original.closest(".table-wrapper").append(copy);
		copy.wrap("<div class='pinned' />");
		original.wrap("<div class='scrollable' />");
	}
	
	function unsplitTable(original) {
		original.closest(".table-wrapper").find(".pinned").remove();
		original.unwrap();
		original.unwrap();
	}

	// Initialize main slider
    $('#slider').nivoSlider({
		animSpeed: 500,
		pauseTime: 9000,
		directionNav: true,
		beforeChange:function(){ 
			$(".header").css('opacity','0');
			$(".text").css('opacity','0');
		}, // Triggers before a slide transition
        afterChange:function(){
			$(".header").animate({opacity:1},1000);
			$(".text").animate({opacity:1},1000);
		}
	});
	
	
	// Initialize blog post slider (display on homepage)
	if ( $("#header-mobile-menu").css('display') == "none" ) {
	    var slider = $('#blog-slider').bxSlider({
			displaySlideQty: 4,
			moveSlideQty:4,
			controls:false
		});
	} 
	
	if ( ( $("#header-mobile-menu").css('display') != "none" ) && ( $("#header-mobile-menu").css('position') == "absolute" ) ) {
		var slider = $('#blog-slider').bxSlider({
			displaySlideQty:2,
			moveSlideQty:2,
			controls:false
		});
	}
	
	if ( ( $("#header-mobile-menu").css('display') != "none" ) && ( $("#header-mobile-menu").css('position') == "static" ) ) {
		var slider = $('#blog-slider').bxSlider({
			displaySlideQty:1,
			moveSlideQty:1,
			controls:false
		});
	}
	
	$('#go-prev').click(function(){
		slider.goToPreviousSlide();
		return false;
	});

	$('#go-next').click(function(){
		slider.goToNextSlide();
		return false;
	});
	
	
	//Delete last delimeter
	$('.twitterBody li:last, #contact-address span:last, #contact-method li:last, #blog-post-sidebar li:last, .testimonials-wrap:last').css('borderBottom','none');
	
	$("#tweet-feed").bind('DOMNodeInserted', function(event) {
		$(this).find(".twitterBody > ul > li:last").css('borderBottom','none');
	});
	
	//Drop down menu creation 
	$('#menu-header-menu li').each(function(){
		if ( $(this).children('.sub-menu') != false) {
			$(this).mouseenter(function(){ 
				$(this).children('.sub-menu').fadeIn(200);
			}).mouseleave(function(){;
				$(this).children('.sub-menu').fadeOut(100);
			});
		}
	});
	
	//Flickr Feed
	$('#flickr-feed').jflickrfeed({
		limit:6,
		qstrings:{ id: '52617155@N08' },
		itemTemplate: 
			'<li>' +
			'<a href="{{image_b}}"><img src="{{image_s}}" alt="{{title}}" /></a>' +
		'</li>'
	});
	
	//Footer subscribtion button animation
	$("#mce-EMAIL").click(function(){
		$(this).attr('value',' ');
	}).blur(function(){
		if ($(this).attr('value') == '') {
			$(this).attr('value','email address');
		}
	});
	
	//Form animation 
	$("#leave-reply-wrap form input, #leave-reply-wrap form textarea").focus(function(){
		$(this).css({boxShadow:"none",opacity:1,outline:"4px solid #f6f6f6"});
	}).blur(function(){
		$(this).css({boxShadow:"none",opacity:1,outline:"4px solid #f6f6f6"});
	});
	
	//Gallery animation
	$(".gallery-image").hover(function(){
		$(this).children().children("img").css({opacity:0.2});
		if ( !(parseInt($.browser.version, 10) < 9) ) {
			$(this).children().children(".magnifier-icon, .magnifier-icon-sidebar").css({opacity:0.7});
		}
		$(this).children().children(".magnifier-icon, .magnifier-icon-sidebar").css({display:"block"});
	},function(){
		$(this).children().children("img").css({opacity:0.8});
		if ( !(parseInt($.browser.version, 10) < 9) ) {
			$(this).children().children(".magnifier-icon, .magnifier-icon-sidebar").css({opacity:0});
		}
		$(this).children().children(".magnifier-icon, .magnifier-icon-sidebar").css({display:"none"});
	});
	
	
	//Main Blog animation
	$("#blog-slider li").hover(function(){
		$(this).find("img").css({opacity:0.2});
		if ( !(parseInt($.browser.version, 10) < 9) ) {
			$(this).find(".main-blog-magnifier").css({opacity:0.7});
		}
		$(this).find(".main-blog-magnifier").css({display:"block"});
	},function(){
		$(this).find("img").css({opacity:0.8});
		if ( !(parseInt($.browser.version, 10) < 9) ) {
			$(this).find(".main-blog-magnifier").css({opacity:0});
		}
		$(this).find(".main-blog-magnifier").css({display:"none"});
	});
	
	//Contact form animation 
	$("#contact-form form").hover(function(){
		$(this).children("#contact-form-title").css({opacity:0.5});
	},function(){
		$(this).children("#contact-form-title").css({opacity:0.3});
	});
	
	
	//Accordion widget initializing
	$(".accordion").accordion({
		icons: {
			'header':'accordionplus', 
			'headerSelected':'accordionminus'
		}
	});
	
	//Tabs widget initializing
	$(".tabs").tabs();
	
	
	//Lightbox plugin for Galleries
	$(".gallery-image a").lightBox();
	
	//Back to top button initialize
    $(window).scroll(function () { 
		if ($(this).scrollTop() > 400) {
			$("#back-to-top").show(500); 
		} 
		if ($(this).scrollTop() < 400) {
			$("#back-to-top").hide(500); 
		}
	});
	
	//Smooth scrolling
	$("#back-to-top").click(function(event){		
		event.preventDefault();
		$('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
	});
		
	//Online Appointment form
	$("#prefered_email").click(function(){
		$("#form-email-wrap").show(300);
		$("#form-telephone-wrap").hide();
	});
	
	$("#prefered_phone").click(function(){
		$("#form-telephone-wrap").show(300);
		$("#form-email-wrap").hide();
	});
	
	//Mobile menu
	$('#header-mobile-menu').change(function() {
		// set the window's location property to the value of the option the user has selected
		window.location = $(this).val();
	});	
	
	//Make current option in mobile menu selected
	$("#header-mobile-menu option").each(function() {
		var path = window.location.pathname;
		var pageName = path.substring(path.lastIndexOf('/') + 1);
		if ($(this).attr('value') == pageName) {
			$(this).attr('selected','selected');
		}
	});
	
	//Delete margin bottom in footer if IE8
	if ($.browser.msie  && parseInt($.browser.version, 10) === 8) {
		$("#copyright-info").css("margin-bottom","20px");
	}
	


});
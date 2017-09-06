var source = $("#post-template").html();
var commentSource = $("#comment-template").html();
var commentTemplate=Handlebars.compile(commentSource);
var $target = $('#post-list');
var template = Handlebars.compile(source);
var $next = $('#next');

var nextPost = 1;
var $commentShow = $('.showComment');
var comments = null;
var shownComments = 2;


$next.on('click', function (ev) {
	ev.preventDefault();
	fetchNext();
});

function fetchNext() {
	return fetch(`https://jsonplaceholder.typicode.com/posts/${nextPost++}`).then(function (response) {
		if (response.ok)
			return response.json();
	}).then(function (json) {
		$target.append(template(json));
		setupComments();
	}).catch(function (err) {
		console.log('error', err)
	});
}

fetchNext();



function setupComments() {
	shownComments=2;
	fetch(`https://jsonplaceholder.typicode.com/comments?postId=${nextPost - 1}`).then(function (response) {
		if (response.ok)
			return response.json();
	}).then(function (json) {

		comments = json;
		showComments();
	});
	
	$('.showComment').on('click', function (ev) {
		
		ev.preventDefault();
		$('.comment-wrapper').css('display', 'block');
	});
	var $commentBox = $('.target-comment');
	
	$commentBox.keypress(function (e) {
		if (e.which == 13 && $commentBox.val() != '') {

			comments.unshift({
				body: $commentBox.val(),
				name: 'Sakhi Mansoor',
				postId: nextPost - 1
			});
			$commentBox.val('');
			showComments();
		}
		
	});
	
	$('.view-comments').on('click',function(ev){
		ev.preventDefault();
		shownComments= shownComments + 4;
		showComments();
	});

	
}


function showComments(){

	var $commentList = $('.comment-list');
	
	$commentList.html('');
	for(var i=0;i<Math.min(shownComments,comments.length);i++){
		comment =comments[i];
		var commentHtml  = commentTemplate(comment);
		
		$commentList.append(commentHtml);
	}
}

var toggle=true;

	$(window).resize(function() {
		
	if($(window).width()>992){
		$('.affix').css('left','');
		$('.affix').css('background','');
		$('.affix').css('transition','');
		$('.affix').css('width','17%');
		$('.web-link').css('font-size','1vw');
		$('.sidebar').css('transition','');
		$('.sidebar-links').css('font-size','1vw');
		$('.img-overlay').css('display','none');
	}
	
	});

	$('#sidebar-toggle').on('click',function(){
	
		if(toggle)
		{
			$('.img-overlay').css('display','flex');
			$('.affix').css('background','#eaebef');
			$('.affix').css('left','0');
			$('.web-link').css('font-size','2vw');
			$('.sidebar-links').css('font-size','1.2rem');
			$('.affix').css('width','230px');
			$('.affix').css('z-index','99999');
		}
		else
		{
			$('.img-overlay').css('display','none');
			$('.affix').css('background','#eaebef');
			$('.affix').css('left','-100%');
			
		}
		toggle=!toggle;

	});

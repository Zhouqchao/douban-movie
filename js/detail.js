
var id = location.search.slice(1).split('=')[1];
$.ajax({
	url:'http://api.douban.com/v2/movie/subject/'+id,
	dataType:'jsonp'
}).done(function(movie){
	console.log(movie);
	renderMovie(movie);
	bindEvent();
})

function renderMovie(movie){
	document.title = movie.title;
	var tpl = `<div class="movie">
					<div class="cover">
						<img src="${movie.images.small}" alt="">
					</div>
					<div class="info">
						<h2 class="title">${movie.title}</h2>
						<p class="pubtime-country-type">${movie.year} / ${movie.countries[0]} / <span class="type"></span></p>
						<p class="original-name">原名：${movie.original_title}</p>
						<p class="pubtime-consise"></p>
						<p class="duration"></p>
						<p class="rating-counts">
							<span>豆瓣评分：</span>
							<span class="rating">${movie.rating.average}</span>
							<p class="counts">评论数：${movie.ratings_count} 人次</p>
						</p>
					</div>
					<div class="summary part">
						<h3>剧情简介</h3>
						${movie.summary}
					</div>
					<div class="filmer">
						<h3 class="title">影人</h3>
						<ul class="filmers">

						</ul>
					</div>
				</div>`;
	var types = movie.genres.join(' / ');
	var filmers = movie.directors.concat(movie.casts);

	console.log(filmers);	
	var _html ='';
	filmers.forEach(function(filmer){
		_html += `<li>
						<img src="${filmer.avatars.small}" alt="">
						<p class="name">${filmer.name}</p>
						<p>演员</p>
					</li>`;
	})		
	$('.page').append($(tpl));		
	$('.filmers').html(_html).find('li p').eq(1).text('导演');
	$('.page').find('.type').text(types);
}

function bindEvent(){

	$('.page').find('.summary').on('click',function(){
		console.log('toggle')
		$(this).toggleClass('part');
	})			
}
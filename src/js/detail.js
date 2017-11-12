import '../css/detail.css';
import $ from './jquery.min.js';

var getDetail = (function(){
	var getDetail = {
		init:function(){
			this.id = window.location.search.slice(1).split('=')[1];
			this.getDetailInfo();
		},
		getDetailInfo:function(){
			var _this = this;

			$.ajax({
				url:'http://api.douban.com/v2/movie/subject/'+_this.id,
				dataType:'jsonp'
			}).done(function(movie){
				document.title = movie.title;
				_this.renderMovie(movie);
				_this.bindEvent();
			})			
		},
		createTpl:function(movie){
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
			return $(tpl);
		},
		renderMovie:function(movie){
			var _this = this;

			var types = movie.genres.join(' / ');
			var filmers = movie.directors.concat(movie.casts);	
			var _html ='';
			filmers.forEach(function(filmer){
				if(!filmer.avatars){
					return false;
				}
				_html += `<li>
								<a href="./filmer?id=${filmer.id}">
									<img src="${filmer.avatars.small}" alt="">
									<p class="name">${filmer.name}</p>
									<p>演员</p>
								</a>
						 </li>`;
			})		
			$('.page').append(_this.createTpl(movie));		
			$('.filmers').html(_html).find('li p').eq(1).text('导演');
			$('.page').find('.type').text(types);
		},
		bindEvent:function(){
			$('.page').find('.summary').on('click',function(){
				$(this).toggleClass('part');
			})		
		}

	}
	return getDetail;
})();

getDetail.init();


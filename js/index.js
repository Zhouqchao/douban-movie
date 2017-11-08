
$(function(){

		// Tab组件
		new Tab(document.querySelector('.page'));

		// Top250 Tab
		var Top = {
			init:function($ct){
				this._data = {
					start:0,
					count:10
				},
				this.$loading = $ct.find('.loading');
				this.$top250 = $ct.find('.top250');
				this.$top250List = $ct.find('.top250-list');
				this.$main = $ct.find('main');
				this.isLoading = false;

				this.getMovieData(this._data);
				this.bindEvent();
			},
			createMovieNode:function(movie){
				var tpl = `<li class="movie-item">
								<a href="./detail.html?id=${movie.id}">
									<div class="movie-photo">
										<img src="${movie.images.small}" alt="">
									</div>				
									<div class="movie-detail">
										<h3 class="movie-title">${movie.title}</h3>
										<p class="rating-collection">
											<span class="rating">${movie.rating.average}</span>分/
											<span>${movie.collect_count}</span>收藏
										</p>
										<p class="pubtime-type">
											<span class="pubtime">${movie.year}</span>
											<span class="type">${movie.genres}</span>
										</p>
										<p class="doctor">${movie.directors[0].name}</p>
										<p class="actor"></p>
									</div>		
								</a>				
							</li>`;	
				return $(tpl);			
			},
			getMovieData:function(data){
				this.$loading.show();

				var _this = this;

				if(this.isLoading){
					return false;
				}

				this.isLoading = true;

				$.ajax({
					url:'http://api.douban.com/v2/movie/top250',
					type:'GET',
					data:data,
					dataType:'jsonp'
				}).done(function(res){		
					console.log(res);		
					_this.$loading.hide();
					var movies = res.subjects;
					_this.renderMovieList(movies);
					_this.isLoading = false;
					_this._data.start += _this._data.count;
				})					
			},
			renderMovieList:function(movies){
				var _this = this;
				//如果数据全部获取完毕
				if(movies.length === 0){
					var $p = $('<p class="no-more">没有更多了......</p>');
					this.$top250.append($p);
					return;
				}

				//渲染电影列表
				movies.forEach(function(movie){
					var $movieItem = _this.createMovieNode(movie);
					var actorList = [];
					movie.casts.forEach(function(actor){
						actorList.push(actor.name);
					})
					$movieItem.find('.actor').text('主演：' + actorList.join(' / '));

					_this.$top250List.append($movieItem);
				})
			},
			isToBottom:function(){
				if(this.$main.height() + this.$main.scrollTop() + 10 >= this.$top250.height()){
					return true;
				}
				return false;				
			},
			bindEvent:function(){
				var _this = this;
				var timer = null;

				this.$main.scroll(function(){	
					if(timer){
						clearTimeout(timer);
					}
					timer = setTimeout(function(){
						if(_this.isToBottom()){
							_this.getMovieData(_this._data);
						}
					},300)
				})					
			}
		}

		// US Tab
		var US = {
			init:function($ct){
				this.$USMovieList = $ct.find('.us-movie-list');
				this.getMovieData();
			},
			createMovieNode:function(movie){
				var tpl = `<li class="movie-item">
								<a href="./detail.html?id=${movie.id}">
									<div class="movie-photo">
										<img src="${movie.images.small}" alt="">
									</div>				
									<div class="movie-detail">
										<h3 class="movie-title">${movie.title}</h3>
										<p class="rating-collection">
											<span class="rating">${movie.rating.average}</span>分/
											<span>${movie.collect_count}</span>收藏
										</p>
										<p class="pubtime-type">
											<span class="pubtime">${movie.year}</span>
											<span class="type">${movie.genres}</span>
										</p>
										<p class="doctor">${movie.directors[0].name}</p>
										<p class="actor"></p>
									</div>		
								</a>				
							</li>`;	
				return $(tpl);			
			},
			getMovieData:function(){

				var _this = this;

				$.ajax({
					url:'http://api.douban.com/v2/movie/us_box',
					dataType:'jsonp'
				}).done(function(res){		
					console.log(res);	
					var movies = [];
					res.subjects.forEach(function(ele){
						movies.push(ele.subject);
					})
					_this.renderMovieList(movies);
				})					
			},
			renderMovieList:function(movies){
				var _this = this;

				//渲染电影列表
				movies.forEach(function(movie){
					var $movieItem = _this.createMovieNode(movie);
					var actorList = [];
					movie.casts.forEach(function(actor){
						actorList.push(actor.name);

					_this.$USMovieList.append($movieItem);
					$movieItem.find('.actor').text('主演：' + actorList.join(' / '));
					})
				})
			},			
		}

		// Search Tab
		var Search = {
			init:function($ct){
				this.$input = $ct.find('.search input');
				this.$searchBtn = $ct.find('.search-btn');
				this.$searchList = $ct.find('.search-list');
				this.bindEvent();
			},
			createMovieNode:function(movie){
				var tpl = `<li class="movie-item">
								<a href="./detail.html?id=${movie.id}">
									<div class="movie-photo">
										<img src="${movie.images.small}" alt="">
									</div>				
									<div class="movie-detail">
										<h3 class="movie-title">${movie.title}</h3>
										<p class="rating-collection">
											<span class="rating">${movie.rating.average}</span>分/
											<span>${movie.collect_count}</span>收藏
										</p>
										<p class="pubtime-type">
											<span class="pubtime">${movie.year}</span>
											<span class="type">${movie.genres}</span>
										</p>
										<p class="doctor">${movie.directors[0].name}</p>
										<p class="actor"></p>
									</div>	
								</a>					
							</li>`;	
				return $(tpl);	
			},
			getSearchMovies:function(keyword){
				var _this = this;

				$.ajax({
					url:'http://api.douban.com/v2/movie/search',
					data:{
						q:keyword
					},
					dataType:'jsonp'
				}).done(function(res){
					console.log(res);
					var movies = res.subjects;
					_this.renderSearchList(movies);
				})
			},
			renderSearchList:function(movies){
				var _this = this;

				//渲染电影列表
				movies.forEach(function(movie){
					var $movieItem = _this.createMovieNode(movie);
					var actorList = [];
					movie.casts.forEach(function(actor){
						actorList.push(actor.name);
					})
					$movieItem.find('.actor').text('主演：' + actorList.join(' / '));

					_this.$searchList.append($movieItem);
				})

			},
			bindEvent:function(){
				var _this = this;

				this.$searchBtn.on('click',function(){
					var keyword = _this.$input.val();
					_this.getSearchMovies(keyword);
				})
			}
		}

		Top.init($('.page'));
		Search.init($('.page'));
		US.init($('.page'));
});
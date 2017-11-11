import '../css/filmer.css';
import $ from './jquery.min.js';

	var getFilmer = (function(){
		var getFilmer = {
			init:function($ct){
				this.id = window.location.search.slice(1).split('=')[1];
				this.$filmer = $ct.find('#filmer');
				this.getFilmerData();
			},
			getFilmerData:function(){
				var _this = this;

				$.ajax({
					url:'http://api.douban.com/v2/movie/celebrity/'+this.id,
					dataType:'jsonp'
				}).done(function(filmer){
					console.log(filmer);
					document.title = filmer.name;
					_this.renderFilmer(filmer);
				})
			},
			createTpl:function(){
				var tpl = `<section class="avatar">
								<img src="" alt="">
							</section>
							<section class="name-collect">
								<div class="name-info">
									<h2 class="name-cn"></h2>
									<p class="name-en"></p>
								</div>
							</section>
							<section class="works">
								<h3>代表作品</h3>
								<ul class="workList"></ul>
							</section>`; 
				return $(tpl);
			},
			renderFilmer:function(filmer){
				var _this = this;
				_this.$filmer.html(_this.createTpl());
				$('.avatar img').attr('src',filmer.avatars.small);
				$('.name-cn').text(filmer.name);
				$('.name-en').text(filmer.name_en);
				var workList = [];
				filmer.works.forEach(function(work){
					var workItem = `<li>
						<a href="./detail?id=${work.subject.id}">
							<img src="${work.subject.images.small}" alt="${work.subject.title}">
							<h3 class="work-title">${work.subject.title}</h3>
							<p class="role">${work.roles[0]}</p>
						</a>
					</li>`;
					workList.push(workItem);
				});
				$('.workList').html(workList.join(''));
			}
		}		
		return getFilmer;
	})();

	getFilmer.init($('.page'));
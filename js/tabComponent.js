
var Tab = (function(){
      var Tab = function(ct){
        this.ct = ct;
        this.init();
        this.bind();
      }

      //初始化变量
      Tab.prototype.init = function(){
        this.menuList = this.ct.querySelectorAll('footer>div');
        this.contentList = this.ct.querySelectorAll('main>section');     
      }

      //绑定事件
      Tab.prototype.bind = function(){
          var self = this;

          this.menuList = [].slice.call(this.menuList);
          this.menuList.forEach(function(menu,i){
            menu.onclick = function(){
              // $(window).scrollTop(0);//每次切换tab都让滚动条滚到顶端

            

              self.menuList.forEach(function(menu,i){
                menu.classList.remove('active');
                self.contentList[i].classList.remove('active');
              })
              this.classList.add('active');
              self.contentList[i].classList.add('active');

              var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
              scrollTop = 0;   
            }
          });         
      }  

      return Tab;
})();









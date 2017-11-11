
module.exports =(function(){
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
             // document.body.scrollTop || document.documentElement.scrollTop = 0;  
              // 因为设置了body固定高度，所以scrollTop =0 /1;
              // 因为自定义了$('main')的scrollbar，所以应该这样设置：
              document.querySelector('main').scrollTop = 0;
              self.menuList.forEach(function(menu,i){
                menu.classList.remove('active');
                self.contentList[i].classList.remove('active');
              })
              this.classList.add('active');
              self.contentList[i].classList.add('active');
 
            }
          });         
      }  

      return Tab;
})();









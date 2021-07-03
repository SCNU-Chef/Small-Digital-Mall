document.write("<script language=javascript src='goodrel.js'><\/script>");
/*添加页面头部*/
function fillHead(){
    var header=document.getElementById("header");
    var content="";
    content+="<!--header-->\n" +
        "\t\t<div class=\"row mt-3 mb-2\" style=\"background-color: white;height: 125px\">\n" +
        "\n" +
        "\t\t\t<!--LOGO-->\n" +
        "\t\t\t<div class=\"col-2 text-center\">\n" +
        "\t\t\t\t<!--        跳到index页-->\n" +
        "\t\t\t\t<a class=\"navbar-brand mt-1\" href=\"index.html\" >\n" +
        "\t\t\t\t\t<!--            logo图片部分-->\n" +
        "\t\t\t\t\t<img src=\"logo_pic.jpg\" style=\"width: 65%;height: 85px\">\n" +
        "\t\t\t\t\t<!--            logo文字部分-->\n" +
        "\t\t\t\t\t<h5>京西数码</h5>\n" +
        "\t\t\t\t</a>\n" +
        "\t\t\t</div>\n" +
        "\n" +
        "\t\t\t<!--    搜索框&&导航栏-->\n" +
        "\t\t\t<div class=\"col-8 \">\n" +
        "\n" +
        "\t\t\t\t<div class=\"input-group mt-4\">\n" +
        "\t\t\t\t\t<input type=\"text\" value=\"\" id=\"textid\" class=\"form-control ml-5\" placeholder=\"请输入你想搜索的商品\" style=\"height: 34px;width: 15px;border-bottom-left-radius: 0.4rem;border-top-left-radius: 0.4rem;border-color: #00aeef\">\n" +
        "\t\t\t\t\t<a onclick=\"searchGoods()\" ><img src=\"search.png\" class=\"mr-5\" style=\"cursor:pointer;border-bottom-right-radius: 0.4rem;border-top-right-radius: 0.4rem\"></a>\n" +
        "\t\t\t\t</div>\n" +
        "\n" +
        "\t\t\t\t<div style=\"margin-top: 26px;\" class=\"mb-0 btn-group w-100\" >\n" +
        "\t\t\t\t\t<a type=\"button\" class=\"btn btn-info \" style=\"width: 150px;height: 40px;border-radius: 0rem\" href=\"index.html\"><h5>首页</h5></a>\n" +
        "\t\t\t\t\t<a type=\"button\" class=\"btn btn-info\" style=\"width: 150px;height: 40px\" href=\"allgoods.html\"><h5>商品</h5></a>\n" +
        "\t\t\t\t\t<div class=\"dropdown\">\n" +
        "\t\t\t\t\t\t<button  class=\"btn btn-info \" data-toggle=\"dropdown\" style=\"width: 150px;height: 40px;border-radius: 0rem\" href=\"\" >\n" +
        "\t\t\t\t\t\t\t<h5 >分类</h5>\n" +
        "\t\t\t\t\t\t</button>\n" +
        "\t\t\t\t\t\t<ul class=\"dropdown-menu\" >\n" +
        "\t\t\t\t\t\t\t<li style=\"padding-left: 20px\"> <a style=\"text-decoration: none\" class=\"text-dark\" name=\"dropdown_select\">精品手机</a></li>\n" +
        "\t\t\t\t\t\t\t<div class=\"dropdown-divider\"></div>\n" +
        "\t\t\t\t\t\t\t<li style=\"padding-left: 20px\"> <a style=\"text-decoration: none\" class=\"text-dark\" name=\"dropdown_select\">科技电脑</a></li>\n" +
        "\t\t\t\t\t\t\t<div class=\"dropdown-divider\"></div>\n" +
        "\t\t\t\t\t\t\t<li style=\"padding-left: 20px\"> <a style=\"text-decoration: none\" class=\"text-dark\" name=\"dropdown_select\">优选相机</a></li>\n" +
        "\t\t\t\t\t\t\t<div class=\"dropdown-divider\"></div>\n" +
        "\t\t\t\t\t\t\t<li style=\"padding-left: 20px\"> <a style=\"text-decoration: none\" class=\"text-dark\" name=\"dropdown_select\">游戏主机</a></li>\n" +
        "\t\t\t\t\t\t\t<div class=\"dropdown-divider\" style=\"border-color: #00aeef;\"></div>\n" +
        "\t\t\t\t\t\t</ul>\n" +
        "\t\t\t\t\t</div>\n" +
        "\t\t\t\t\t<a id=\"shop_cart\" type=\"button\" class=\"btn btn-info text-white\" style=\"width: 150px;height: 40px\"><h5>购物车</h5></a>\n" +
        "\t\t\t\t\t<a id=\"person_info\" type=\"button\" class=\"btn btn-info text-white\" style=\"width: 150px;height: 40px;border-radius: 0rem\"><h5>个人信息</h5></a>\n" +
        "\t\t\t\t</div>\n" +
        "\n" +
        "\t\t\t</div>\n" +
        "\n" +
        "\t\t\t<!--    登陆&&注册button-->\n" +
        "\t\t\t<div class=\"col-2 pr-0 mt-3 \">\n" +
        "\t\t\t\t<div id=\"head_btn\" class=\"btn-group ml-2\" >\n" +
        "\t\t\t\t<a id=\"login\" type=\"button\" href=\"login.html\" class=\"btn btn-info mt-4\" style=\"height: 40px;border-bottom-left-radius: 0.5rem;border-top-left-radius: 0.5rem\">\n" +
        "\t\t\t\t\t<h5 class=\"text-center \">登陆</h5>\n" +
        "\t\t\t\t</a>\n" +
        "\t\t\t\t<a id=\"regist\" type=\"button\" href=\"register.html\" class=\"btn btn-primary mt-4\" style=\"height: 40px;border-bottom-right-radius: 0.5rem;border-top-right-radius: 0.5rem\">\n" +
        "\t\t\t\t\t<h5 class=\"text-center \">注册</h5>\n" +
        "\t\t\t\t</a>\n" +
        "\t\t\t</div>\n" +
        "\t\t</div>\n" +
        "\n" +
        "\t</div>";
    header.innerHTML=content;

    var dropdown_select=document.getElementsByName("dropdown_select");
    for (let i=0;i<dropdown_select.length;i++){
        dropdown_select[i].onclick=(()=>{
            searchGoods(dropdown_select[i].innerText);
        });
    }

    var person_info=document.getElementById("person_info");
    var shop_cart=document.getElementById("shop_cart");
    if(localStorage.getItem("phone")!=null){//当前localStorage拥有key为phone且值不为空
        let head_btn=document.getElementById("head_btn");
        let log_btn=document.getElementById("login");
        let reg_btn=document.getElementById("regist");
        head_btn.removeChild(log_btn);
        head_btn.removeChild(reg_btn);

        let exit_btn=document.createElement("a");
        exit_btn.id="exit";
        exit_btn.type="button";
        exit_btn.className="btn btn-primary mt-4 text-white";
        exit_btn.onclick=(()=>{
            localStorage.clear();   //清除当前已登录进的手机号码
            console.log(localStorage.getItem("phone"));
            window.location.replace("index.html");//window.location.replace()是一个函数
        });
        exit_btn.style.height="40px";
        exit_btn.style.borderTopLeftRadius="0.5rem";
        exit_btn.style.borderTopRightRadius="0.5rem";
        exit_btn.style.borderBottomLeftRadius="0.5rem";
        exit_btn.style.borderBottomRightRadius="0.5rem";
        exit_btn.innerHTML="<h5 class='text-center'>退出登录</h5>";
        head_btn.appendChild(exit_btn);

        person_info.onclick=(()=>{
            window.location.href="person.html";
        });
        shop_cart.onclick=(()=>{
            window.location.href="shopcart.html";
        });
    }
    else{
        person_info.onclick=(()=>{
            alert("请先登录！");
        });
        shop_cart.onclick=(()=>{
            alert("请先登录！");
        });
    }
}
/*添加页面底部*/
function fillFoot(){
    var footer=document.getElementById("footer");
    var content="";
    content+="<!--footer-->\n" +
        "\t\t<div class=\"row mt-2 pt-3 footer1\" style=\"background-color: #abdde5\">\n" +
        "\n" +
        "\t\t\t<!--        左:导航表-->\n" +
        "\t\t\t<div class=\"col-6\">\n" +
        "\t\t\t\t<div class=\"row\">\n" +
        "\n" +
        "\t\t\t\t\t<div class=\"col-4\">\n" +
        "\t\t\t\t\t\t<h3 class=\"text-center\">新手指南</h3>\n" +
        "\t\t\t\t\t\t<ul class=\"list-unstyled p-1\">\n" +
        "\t\t\t\t\t\t\t<li class=\"text-center p-2\"><a href=\"\" class=\"text-muted\" style=\"padding-top: 5px;\">注册/登陆</a></li>\n" +
        "\t\t\t\t\t\t\t<li class=\"text-center p-2\"><a href=\"\" class=\"text-muted\" style=\"padding-top: 5px;\">app下载</a></li>\n" +
        "\t\t\t\t\t\t\t<li class=\"text-center p-2\"><a href=\"\" class=\"text-muted\" style=\"padding-top: 5px;\">购物导航</a></li>\n" +
        "\t\t\t\t\t\t</ul>\n" +
        "\t\t\t\t\t</div>\n" +
        "\n" +
        "\t\t\t\t\t<div class=\"col-4\">\n" +
        "\t\t\t\t\t\t<h3 class=\"text-center\">常见问题</h3>\n" +
        "\t\t\t\t\t\t<ul class=\"list-unstyled p-1\">\n" +
        "\t\t\t\t\t\t\t<li class=\"text-center p-2\"><a href=\"\" class=\"text-muted\" style=\"padding-top: 5px;\">服务投诉</a></li>\n" +
        "\t\t\t\t\t\t\t<li class=\"text-center p-2\"><a href=\"\" class=\"text-muted\" style=\"padding-top: 5px;\">物流问题</a></li>\n" +
        "\t\t\t\t\t\t\t<li class=\"text-center p-2\"><a href=\"\" class=\"text-muted\" style=\"padding-top: 5px;\">联系客服</a></li>\n" +
        "\t\t\t\t\t\t</ul>\n" +
        "\t\t\t\t\t</div>\n" +
        "\n" +
        "\t\t\t\t\t<div class=\"col-4\">\n" +
        "\t\t\t\t\t\t<h3 class=\"text-center\">关于我们</h3>\n" +
        "\t\t\t\t\t\t<ul class=\"list-unstyled p-1\">\n" +
        "\t\t\t\t\t\t\t<li class=\"text-center p-2\"><a href=\"\" class=\"text-muted\" style=\"padding-top: 5px;\">关于我们</a></li>\n" +
        "\t\t\t\t\t\t\t<li class=\"text-center p-2\"><a href=\"\" class=\"text-muted\" style=\"padding-top: 5px;\">联系我们</a></li>\n" +
        "\t\t\t\t\t\t\t<li class=\"text-center p-2\"><a href=\"\" class=\"text-muted\" style=\"padding-top: 5px;\">营业执照</a></li>\n" +
        "\t\t\t\t\t\t</ul>\n" +
        "\t\t\t\t\t</div>\n" +
        "\n" +
        "\t\t\t\t</div>\n" +
        "\t\t\t</div>\n" +
        "\n" +
        "\n" +
        "\t\t\t<!--        中:联系电话-->\n" +
        "\t\t\t<div class=\"col-3 text-center\">\n" +
        "\t\t\t\t<h3 class=\"text-center mt-4\">4008-823-823</h3>\n" +
        "\t\t\t\t<h5 class=\"text-center\">仅市内电话收费</h5>\n" +
        "\t\t\t\t<button class=\"btn btn-danger mt-4\">\n" +
        "\t\t\t\t\t<img src=\"envelope.png\" style=\"margin-right: 5px\">\n" +
        "\t\t\t\t\t联系我们</button>\n" +
        "\t\t\t</div>\n" +
        "\n" +
        "\n" +
        "\t\t\t<!--        右:二维码-->\n" +
        "\t\t\t<div class=\"col-3\">\n" +
        "\t\t\t\t<div class=\"row\">\n" +
        "\t\t\t\t\t<div class=\"col-6 p-0 text-center mt-2\">\n" +
        "\t\t\t\t\t\t<img src=\"QRcode1.jpg\" height=\"120px\" width=\"120px\" style=\"border-radius: 2rem\">\n" +
        "\t\t\t\t\t\t<p class=\"text-center mt-2\">打赏我们</p>\n" +
        "\t\t\t\t\t</div>\n" +
        "\t\t\t\t\t<div class=\"col-6 p-0 text-center mt-2\">\n" +
        "\t\t\t\t\t\t<img src=\"QRcode2.jpg\" height=\"120px\" width=\"120px\" style=\"border-radius: 2rem\">\n" +
        "\t\t\t\t\t\t<p class=\"text-center mt-2\">关注我们</p>\n" +
        "\t\t\t\t\t</div>\n" +
        "\t\t\t\t</div>\n" +
        "\t\t\t</div>\n" +
        "\n" +
        "\t\t</div>\n" +
        "\n" +
        "\n" +
        "\t\t<div class=\"row mt-2 pt-3 footer2\"style=\"background-color: #abdde5\">\n" +
        "\n" +
        "\t\t\t<!--        左:导航表-->\n" +
        "\t\t\t<div class=\"col-12\">\n" +
        "\t\t\t\t<div class=\"row\">\n" +
        "\n" +
        "\t\t\t\t\t<div class=\"col-4\">\n" +
        "\t\t\t\t\t\t<h3 class=\"text-center\">新手指南</h3>\n" +
        "\t\t\t\t\t\t<ul class=\"list-unstyled p-1\">\n" +
        "\t\t\t\t\t\t\t<li class=\"text-center p-2\"><a href=\"\" class=\"text-muted\" style=\"padding-top: 5px;\">注册/登陆</a></li>\n" +
        "\t\t\t\t\t\t\t<li class=\"text-center p-2\"><a href=\"\" class=\"text-muted\" style=\"padding-top: 5px;\">app下载</a></li>\n" +
        "\t\t\t\t\t\t\t<li class=\"text-center p-2\"><a href=\"\" class=\"text-muted\" style=\"padding-top: 5px;\">购物导航</a></li>\n" +
        "\t\t\t\t\t\t</ul>\n" +
        "\t\t\t\t\t</div>\n" +
        "\n" +
        "\t\t\t\t\t<div class=\"col-4\">\n" +
        "\t\t\t\t\t\t<h3 class=\"text-center\">常见问题</h3>\n" +
        "\t\t\t\t\t\t<ul class=\"list-unstyled p-1\">\n" +
        "\t\t\t\t\t\t\t<li class=\"text-center p-2\"><a href=\"\" class=\"text-muted\" style=\"padding-top: 5px;\">服务投诉</a></li>\n" +
        "\t\t\t\t\t\t\t<li class=\"text-center p-2\"><a href=\"\" class=\"text-muted\" style=\"padding-top: 5px;\">物流问题</a></li>\n" +
        "\t\t\t\t\t\t\t<li class=\"text-center p-2\"><a href=\"\" class=\"text-muted\" style=\"padding-top: 5px;\">联系客服</a></li>\n" +
        "\t\t\t\t\t\t</ul>\n" +
        "\t\t\t\t\t</div>\n" +
        "\n" +
        "\t\t\t\t\t<div class=\"col-4\">\n" +
        "\t\t\t\t\t\t<h3 class=\"text-center\">关于我们</h3>\n" +
        "\t\t\t\t\t\t<ul class=\"list-unstyled p-1\">\n" +
        "\t\t\t\t\t\t\t<li class=\"text-center p-2\"><a href=\"\" class=\"text-muted\" style=\"padding-top: 5px;\">关于我们</a></li>\n" +
        "\t\t\t\t\t\t\t<li class=\"text-center p-2\"><a href=\"\" class=\"text-muted\" style=\"padding-top: 5px;\">联系我们</a></li>\n" +
        "\t\t\t\t\t\t\t<li class=\"text-center p-2\"><a href=\"\" class=\"text-muted\" style=\"padding-top: 5px;\">营业执照</a></li>\n" +
        "\t\t\t\t\t\t</ul>\n" +
        "\t\t\t\t\t</div>\n" +
        "\n" +
        "\t\t\t\t</div>\n" +
        "\t\t\t</div>\n" +
        "\n" +
        "\n" +
        "\t\t\t<!--        中:联系电话-->\n" +
        "\t\t\t<div class=\"col-6 text-center\">\n" +
        "\t\t\t\t<h3 class=\"text-center mt-3\">4008-823-823</h3>\n" +
        "\t\t\t\t<h5 class=\"text-center\">仅市内电话收费</h5>\n" +
        "\t\t\t\t<button class=\"btn btn-danger mt-2\">\n" +
        "\t\t\t\t\t<img src=\"img/envelope.png\" style=\"margin-right: 5px\" >\n" +
        "\t\t\t\t\t联系我们</button>\n" +
        "\t\t\t</div>\n" +
        "\n" +
        "\n" +
        "\t\t\t<!--        右:二维码-->\n" +
        "\t\t\t<div class=\"col-6\">\n" +
        "\t\t\t\t<div class=\"row\">\n" +
        "\t\t\t\t\t<div class=\"col-6 p-0 text-center\">\n" +
        "\t\t\t\t\t\t<img src=\"QRcode1.jpg\" height=\"120px\" width=\"120px\" style=\"border-radius: 2rem\">\n" +
        "\t\t\t\t\t\t<p class=\"text-center\">打赏我们</p>\n" +
        "\t\t\t\t\t</div>\n" +
        "\t\t\t\t\t<div class=\"col-6 p-0 text-center\">\n" +
        "\t\t\t\t\t\t<img src=\"QRcode2.jpg\" height=\"120px\" width=\"120px\" style=\"border-radius: 2rem\">\n" +
        "\t\t\t\t\t\t<p class=\"text-center\">关注我们</p>\n" +
        "\t\t\t\t\t</div>\n" +
        "\t\t\t\t</div>\n" +
        "\t\t\t</div>\n" +
        "\n" +
        "\t\t</div>\n" +
        "\n" +
        "\t\t<br/>\n" +
        "\t\t<div class=\"footnotes\">©2020 京西数码集团有限公司 版权所有 京ICP证xxxxxxxxxxx</div>";
    footer.innerHTML=content;
}
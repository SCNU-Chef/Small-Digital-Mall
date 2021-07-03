function addToCart(){
    var pid= window.location.search.split('=')[1];
    let n= document.getElementById("goods_num").value;
    let phone=localStorage.getItem("phone");
    if(phone==null){
        alert("请先登录");
        return false;
    }
    $.ajax({
        method: 'POST',
        url: 'http://10.252.74.83:8080/shopping_cart/insert',
        data: {"phone":phone,"num":n,"pid":pid},
        success: function (data) {//成功获取到服务器返回的数据
            console.log(data[0]);
            alert("加入购物车成功");
        },
        error: function(xhr, err){
            console.log('异步请求注册API失败：')
        },
    })
}
function searchGoods(type){
    let pclass;
    var str = document.getElementById("textid").value;
    if (str===null){
        alert("你的输入为空");
        return false;
    }
    if(str==="手机"||str==="精品手机"||type==="精品手机") {
        pclass="phone"
    }
    else if(str==="电脑"||str==="科技电脑"||type==="科技电脑") {
        pclass="computer";
    }
    else if(str==="相机"||str==="优选相机"||type==="优选相机") {
        pclass="camera";
    }
    else if(str==="主机"||str==="游戏主机"||type==="游戏主机"){
        pclass="game_host";
    }
    let URL="goods_search.html?pclass="+pclass;
    window.location.href=URL;
}
/*去到商品详情页*/
function goToDetails(pid){
    let URL="goods_detail.html?pid="+pid;
    window.location.href=URL;
}
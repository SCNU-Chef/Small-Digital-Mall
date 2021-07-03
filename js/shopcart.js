/*表格全选功能*/
var phone=localStorage.getItem("phone");
function selAll(){
	//获取全选复选框对象（通过id）
	var selall=document.getElementById("selall");
	//获取单选复选框对象（通过name）
	var selme=document.getElementsByName("selme");
	var flag;
	//如果全选复选框被选中
	if(selall.checked){
		for (var i=0;i<selme.length;i++) {
			selme[i].checked=true;
		}
	}
	//如果全选复选框取消勾选
	else{
		for (var i=0;i<selme.length;i++) {
			selme[i].checked=false;
		}
	}
	$.ajax({
		method: 'POST',
		url: 'http://10.252.74.83:8080/shopping_cart/select_all',
		data:{"phone":phone},
		success: function (data) {//成功获取到服务器返回的数据
			console.log('select_all successful');
		},
		error: function(xhr, err){
			console.log('全选失败');
		},
	})
}
/*单行选择功能*/
function selMe(that,pid,is_checked){
	var selall=document.getElementById("selall");
	var selme=document.getElementsByName("selme");
	console.log("pid="+pid);
	console.log('checked='+is_checked);
	$.ajax({
		method: 'POST',
		url: 'http://10.252.74.83:8080/shopping_cart/select_single',
		data:{"phone":phone,"pid":pid,"is_checked":is_checked},
		success: function (data) {//成功获取到服务器返回的数据
			console.log('select_single successful');
		},
		error: function(xhr, err){
			console.log('fail');
		},
	})

	var flag;
	for(var j=0;j<selme.length;j++){
		if(!selme[j].checked){
			flag=false;
			break;
		}
		else{
			flag=true;
		}
	}
	selall.checked=flag;
}
/*插入商品表*/
function insertGoods(data,data2){
	var objTable=document.getElementById("myadd");

	for(var i = 0;i<data.length;i++) {
		var pid=data2[i].pid;
		var is_checked=data2[i].is_checked;
		//为每项商品新建一行
		var objTr=document.createElement("tr");
		objTr.className="goods_row";

		//填充该行（该行每个单元格接收从商品详情页传过来的内容）
		var trtd1 = document.createElement("td");
		if(is_checked===1){
			trtd1.innerHTML = "<input type='checkbox' name='selme' onclick='selMe(this,"+pid+",this.checked)' checked/>";
		}else{
			trtd1.innerHTML = "<input type='checkbox' name='selme' onclick='selMe(this,"+pid+",this.checked)'/>";
		}
		trtd1.style.textAlign = "center";
		objTr.appendChild(trtd1);

		var trtd2 = document.createElement("td");
		trtd2.style.paddingLeft = "20px";
		trtd2.innerHTML = "<img style='height: 100px;width: 100px;float: left' name='goods_pic' src='"+data[i].img+"' alt='None-Pic' style='float: left;'/>" +
			"<p name='goods_describe' style='margin-left: 20px;margin-top: 30px'>" + data[i].pname + "</p>";
		objTr.appendChild(trtd2);

		var trtd3 = document.createElement("td");
		trtd3.style.textAlign = "center";
		trtd3.innerHTML = "<p name='goods_price'>" + data[i].price + "</p>";
		objTr.appendChild(trtd3);

		var trtd4 = document.createElement("td");
		trtd4.style.textAlign = "center";
		trtd4.innerHTML = "<input name='goods_num' type='number' min='1' value='"+data2[i].product_count +
			"' style='width: 50px;text-align: center;' onclick='calPrice(this,"+pid+")'/>";
		objTr.appendChild(trtd4);

		var trtd5 = document.createElement("td");
		trtd5.style.textAlign = "center";
		trtd5.innerHTML = "<p name='goods_tolprice'>" + "￥" + data[i].price*data2[i].product_count + "</p>";
		objTr.appendChild(trtd5);

		var trtd6 = document.createElement("td");
		trtd6.innerHTML = "<a href='#' onclick='deleteGoods(this,"+pid+")'>删除</a></br>" +
			"<a href='#'>移入关注</a>"
		trtd6.style.textAlign = "center";
		objTr.appendChild(trtd6);

		objTable.appendChild(objTr);
	}
	var selall=document.getElementById("selall");
	var selme=document.getElementsByName("selme");
	if(selme.length===0){
		selall.checked=false;
	}
	var flag;
	for(var j=0;j<selme.length;j++){
		if(!selme[j].checked){
			flag=false;
			break;
		}
		else{
			flag=true;
		}
	}
	selall.checked=flag;
}
/*删除表格的某一行*/
function deleteGoods(that,pid){
	//that.parentNode:父亲节点为超链接所在的单元格
	//that.parentNode.parentNode:单元格所在的行
	//注意单元格标题行为第0行
	$.ajax({
		method: 'POST',
		url: 'http://10.252.74.83:8080/shopping_cart/delete_single',
		data:{"phone":phone,"pid":pid},
		success: function (data) {//成功获取到服务器返回的数据
			console.log('delete_single successful');
		},
		error: function(xhr, err){
			console.log('异步请求注册API失败：')
		},
	})

	var curRow=that.parentNode.parentNode.rowIndex;//获取当前行
	console.log(curRow);
	var objTable=document.getElementById("myadd");
	if(confirm("你确定要删除该商品吗？")){
		objTable.deleteRow(curRow);
	}
	var selall=document.getElementById("selall");
	var selme=document.getElementsByName("selme");
	//判断当前表格所有行是否被全删除
	if(selme.length===0){
		selall.checked=false;
	}
}
/*删除选中的商品*/
function deleteSelect(){
	$.ajax({
		method: 'POST',
		url: 'http://10.252.74.83:8080/shopping_cart/delete_selected',
		data:{"phone":phone},
		success: function (data) {//成功获取到服务器返回的数据
			console.log('delete selected successful');
		},
		error: function(xhr, err){
			console.log('异步请求注册API失败：')
		},
	})
	var objTable=document.getElementById("myadd");
	var selall=document.getElementById("selall");
	var selme=document.getElementsByName("selme");
	for(var i=0;i<selme.length;i++){
		if(selme[i].checked){
			objTable.deleteRow(selme[i].parentNode.parentNode.rowIndex);
			i--;
		}
	}
	if(selme.length===0){
		selall.checked=false;
	}
}
/*动态计算某类商品总价*/
function calPrice(that,pid){
	var curRow=that.parentNode.parentNode.rowIndex;//获取当前行下标
	console.log(curRow);
	var sum=document.getElementsByName("goods_num")[curRow-1].value;
	var price=document.getElementsByName("goods_price")[curRow-1].innerText;
	console.log(price);
	var total=document.getElementsByName("goods_tolprice")[curRow-1];
	total.innerText="¥"+sum*price;

	$.ajax({
		method: 'POST',
		url: 'http://10.252.74.83:8080/shopping_cart/add_or_sub',
		data:{"phone":phone,"product_count":sum,"pid":pid},
		success: function (data) {//成功获取到服务器返回的数据
			console.log('add_or_sub successful');
		},
		error: function(xhr, err){
			console.log('异步请求注册API失败：')
		},
	})

}
/*携带商品信息跳转至订单结账页*/
function checkOut(){
	var d = new Date();
	var str = '';
	str += d.getFullYear() + '年'; //获取当前年份
	str += d.getMonth() + 1 + '月'; //获取当前月份（0——11）
	str += d.getDate() + '日';
	str += d.getHours() + '时';
	str += d.getMinutes() + '分';
	str += d.getSeconds() + '秒';
	var bucket=new Array();
	$.ajax({
		method: 'POST',
		url: 'http://10.252.74.83:8080/products/get_product',
		success: function (data) {//获取商品的价格,加入bucket
			console.log('get_product successful');
			var cnt=0;
			for(var i = 0;i<data.length;i++){
				bucket.push(data[i].price);
				cnt++;
				if(cnt===data.length){
					$.ajax({
						method: 'POST',
						url: 'http://10.252.74.83:8080/shopping_cart/all_pro_of_shopping_cart3',
						data:{"phone":phone},
						success: function (data1) {//获取购物车中被选中的商品
							console.log('all_pro_of_shopping_cart3 successful');
							var count=Number(0);
							var product_list=new String();
							for(var i=0;i<data1.length;i++){
								count=count+data1[i].product_count*bucket[data1[i].pid-1];
								product_list=product_list+data1[i].pid+'*'+data1[i].product_count+'+';
							}
							if(count==0){
								alert('你还未选中任何商品!');
								return false;
							}
							$.ajax({
								method: 'POST',
								url: 'http://10.252.74.83:8080/order/create_orderlist',
								data:{"phone":phone,"product_list":product_list,"count":count,"ordertime":str},
								success: function (data) {//将product_list总价count和下单时间str写入orderlist数据库
									console.log('create_orderlist successful');
									$.ajax({
										method: 'POST',
										url: 'http://10.252.74.83:8080/shopping_cart/delete_shopping_cart',
										data:{"phone":phone},
										success: function (data) {//删除购物车中的已被结算的商品
											console.log('delete_shopping_cart successful');
											window.location.href="orderlist.html";
											alert('付款成功');
										},
										error: function(xhr, err){
											console.log('异步请求注册API失败：')
										},
									})
								},
								error: function(xhr, err){
									console.log('异步请求注册API失败：')
								},
							})
						},
						error: function(xhr, err){
							console.log('异步请求注册API失败：')
						},
					})
				}
			}
		},
		error: function(xhr, err){
			console.log('异步请求注册API失败：')
		},
	})
}

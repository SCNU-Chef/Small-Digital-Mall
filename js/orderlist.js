/*在window.on中调用*/
function insertTable(orderlist,pid,num,imgbucket,namebucket,pricebucket,name,address){//orderlist是订单数据的数组,pid每行是单笔订单的pid,共有orderlist.length行,num同理
	//依据表单内容新建一个表格，并将其追加到div下
	//获取需要放置新table的div
	var content=document.getElementById("body_content");
	console.log(pricebucket);
	for(var i=0;i<orderlist.length;i++){//数组里有几个json对象,就有几个table
		//创建放置新订单的table
		var objTable=document.createElement("table");
		objTable.className="table table-bordered orders_total";
		//table的首行
		var objTr1=document.createElement("tr");//不需要创建结束标记
		//首行首列
		var tr1td1=document.createElement("td");
		tr1td1.innerHTML="<p style='font-size: 15px;font-weight: bold'>订单号</p><p name='oid' style='font-size: 10px'>"+orderlist[i].oid+"</p>";
		objTr1.appendChild(tr1td1);

		var tr1td2=document.createElement("td");
		tr1td2.innerHTML="<p>下单时间</p><p>"+orderlist[i].order_time+"</p>";
		objTr1.appendChild(tr1td2);

		var tr1td3=document.createElement("td");
		tr1td3.innerHTML="<p><a href='#'>联系商家</a></p>";
		objTr1.appendChild(tr1td3);
		objTable.appendChild(objTr1);

		//首行编辑成功，编辑table的第二行
		var objTr2=document.createElement("tr");//不需要创建结束标记
		//第二行首列（根据该笔订单购买商品的种类数目来决定是否拆分该列（在列中新建一个表格））
		var newTable1=document.createElement("table");
		newTable1.className="table goods_pics";
		var tr2td1=document.createElement("td");
		tr2td1.className="p-0";
		tr2td1.appendChild(newTable1);
		for(var j=0;j<pid[i].length;j++){
			if (pid[i][j]!="undefined"&&pid[i][j]!=null&&pid[i][j]!=""){
				var tr=document.createElement("tr");
				tr.innerHTML="<img style='width: 100px;height: 100px;' src='"+imgbucket[pid[i][j]-1]+"' alt='None Pic' class='img-rounded' />";
				tr2td1.appendChild(tr);
			}
		}
		tr2td1.appendChild(newTable1);
		objTr2.appendChild(tr2td1);

		//第二行第二列，同上（根据该笔订单购买商品的种类数目来决定是否拆分该列（在列中新建一个表格））
		var newTable2=document.createElement("table");
		newTable2.className="table goods_discribe";
		var tr2td2=document.createElement("td");
		tr2td2.className="p-0";
		for(var j=0;j<pid[i].length;j++){
			// console.log(namebucket[1]);
			if (pid[i][j]!="undefined"&&pid[i][j]!=null&&pid[i][j]!=""){
				var tr=document.createElement("tr");
				tr.innerHTML="<td style='height: 100px;margin-left: 40px'><p style='text-align:center;'>"+namebucket[pid[i][j]-1]+"</p></td>";
				newTable2.appendChild(tr);
			}
		}
		tr2td2.appendChild(newTable2);
		objTr2.appendChild(tr2td2);

		//第二行第三列，同上（根据该笔订单购买商品的种类数目来决定是否拆分该列（在列中新建一个表格））
		var newTable3=document.createElement("table");
		newTable3.className="table goods_num";
		var tr2td3=document.createElement("td");
		tr2td3.className="p-0";
		for(var j=0;j<num[i].length;j++){
			if (num[i][j]!="undefined"&&num[i][j]!=null&&num[i][j]!=""){
				var tr=document.createElement("tr");
				tr.innerHTML="<td height='100px'><p>数量</p><p>"+num[i][j]+"</p></td>";
				newTable3.appendChild(tr);
			}

		}
		tr2td3.appendChild(newTable3);
		objTr2.appendChild(tr2td3);

		var tr2td4=document.createElement("td");
		tr2td4.innerHTML="<p>收货人姓名："+name+"</p><p>收货人地址："+address+"</p>";
		tr2td4.style.textAlign="center";
		objTr2.appendChild(tr2td4);

		let total_price=new Number(0);
		console.log(pricebucket[Number(pid[0][0]-1)]);
		var tr2td5=document.createElement("td");//操作
		for(var j=0;j<pid[i].length;j++) {
			if (pid[i][j] != "undefined" && pid[i][j] != null && pid[i][j] != "") {
				total_price+=Number(num[i][j])*pricebucket[Number(pid[i][j]-1)];
			}
		}
		tr2td5.innerHTML="<p>总金额</p>"+"￥"+total_price;
		tr2td5.style.textAlign="center";
		objTr2.appendChild(tr2td5);

		var tr2td6=document.createElement("td");//操作
		tr2td6.innerHTML="<p>订单操作</p><p><a href='#' onclick='delGood(this)'>删除订单</a></p><p><a href='#'>评价</a>|"+
			"<a href='#'>晒单</a></p><p><a href='#'>申请售后</a></p>";
		tr2td6.style.textAlign="center";
		objTr2.appendChild(tr2td6);
		//第二行编辑成功，将第二行添加进table
		objTable.appendChild(objTr2);

		//将整个table添加进div
		content.appendChild(objTable);
	}
}
/*删除当前订单*/
function delGood(that){
	// var tablearr=document.getElementsByClassName("orders_total");
	var curTable=that.parentNode.parentNode.parentNode.parentNode;//获取当前商品的table
	var oid=curTable.childNodes[0].childNodes[0].childNodes[1].innerText;
	console.log(oid);
	var body=document.getElementById("body_content");
	if(confirm("你确定要删除该订单吗？")){
		body.removeChild(curTable);
		$.ajax({
			method: 'POST',
			url: 'http://10.252.74.83:8080/order/delete_orderlist',
			data:{"oid":oid},
			success: function (data) {//成功获取到服务器返回的数据
				console.log('delete_orderlist successful');
			},
			error: function(xhr, err){
				console.log('异步请求注册API失败：')
			},
		})
	}

}

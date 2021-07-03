function dateload(){
    var myDate = new Date();

    var day=document.getElementById('day');
    var dayStr="";
    if(myDate.getDate()<10){
        dayStr="0"+myDate.getDate();
    }else {
        dayStr=myDate.getDate();
    }
    day.innerText=dayStr;

    var mon=document.getElementById('month');
    var monStr="星期"+"日一二三四五六".charAt(myDate.getDay());
    mon.innerText=monStr;

    var ym=document.getElementById('ym');
    var year=myDate.getFullYear();
    var month=myDate.getMonth()+1;
    var dateStr=year+"."+month;
    ym.innerText=dateStr;
}
//查找当前用户信息
function searchUser(){
    //通过key来获取value
    var uphone = localStorage.getItem("phone");
    console.log(uphone);
    $.ajax({
        method: 'POST',
        url: 'http://10.252.74.83:8080/user/search_user',
        data: {            //传到服务器的数据
            "uphone":uphone
        },
        success: function (data) {//成功获取到服务器返回的数据
            //开始对HTML元素做更改
            var name=document.getElementById("name");
            name.innerText=data[0].uname;
            var phone=document.getElementById("phone");
            phone.innerText=data[0].phone;
            var email=document.getElementById("email");
            email.innerText=data[0].email;
            var address=document.getElementById("address");
            address.innerText=data[0].address;
        },
        error: function(xhr, err){
            console.log('获取失败');
        },
    })
}
//更新当前用户信息
function changeInfo(){
    /*设置一个页面内弹出窗口*/
// window.open 弹出新窗口的命令；
// 'page.html' 弹出窗口的文件名；
// 'newwindow' 弹出窗口的名字（不是文件名），非必须，可用空''代替；
// height=100 窗口高度；
// width=400 窗口宽度；
// top=0 窗口距离屏幕上方的象素值；
// left=0 窗口距离屏幕左侧的象素值；
// toolbar=no 是否显示工具栏，yes为显示；
// menubar，scrollbars 表示菜单栏和滚动栏。
// resizable=no 是否允许改变窗口大小，yes为允许；
// location=no 是否显示地址栏，yes为允许；
// status=no 是否显示状态栏内的信息（通常是文件已经打开），yes为允许；
    let uphone=localStorage.getItem("phone");
    var old_name,old_phone,old_pwd,old_email,old_address;
    $.ajax({
        method: 'POST',
        url: 'http://10.252.74.83:8080/user/search_user',
        data:{"uphone":uphone},
        success:function(data){
            old_phone=data[0].phone;
            old_name=data[0].uname;
            old_pwd=data[0].upwd;
            old_email=data[0].email;
            old_address=data[0].address;
            let newWin=window.open("", "newwin", "height=500, width=500,toolbar=no,scrollbars="+scroll+",menubar=no,resizable=no");
            newWin.document.write("<html><title>例子</title>");
            newWin.document.write("<body bgcolor='white'>");
            newWin.document.write("新的用户名：<input type='text' id='new_name' value="+old_name+"></br>");
            newWin.document.write("新的密码：<input type='text' id='new_pwd' value="+old_pwd+"></br>");
            newWin.document.write("新的邮箱：<input type='text' id='new_email' value="+old_email+"></br>");
            newWin.document.write("新的地址：<input type='text' id='new_address' value="+old_address+"></br>");
            newWin.document.write("<button id='new_submit'>提交");
            newWin.document.write("</body>");
            newWin.document.write("</html>");
            let button=newWin.document.getElementById("new_submit");
            button.onclick=(()=>{
                /*修改个人信息后进行的新提交*/
                let new_name=newWin.document.getElementById("new_name").value;
                let new_pwd=newWin.document.getElementById("new_pwd").value;
                let new_email=newWin.document.getElementById("new_email").value;
                let new_address=newWin.document.getElementById("new_address").value;
                $.ajax({
                    method: 'POST',
                    url: 'http://10.252.74.83:8080/user/update_user',
                    data:{"uphone":uphone,"uname":new_name,"upwd":new_pwd,"email":new_email,"address":new_address},
                    success:function(data){
                        //这里路由返回的是一个修改数据库的Json提示信息对象，不包含个人信息的Json对象
                        newWin.close();
                        alert("修改个人信息成功");
                    },
                    error: function(xhr, err){
                        console.log('异步请求API失败：')
                    },
                })
            });
            newWin.document.close();
        },
        error: function(xhr, err){
            console.log('异步请求API失败：')
        },
    })
}

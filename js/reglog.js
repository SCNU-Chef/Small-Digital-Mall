function reg(){
    var uname = document.getElementById("uname");
    var upwd = document.getElementById("upwd");
    var reupwd = document.getElementById("reupwd");
    var uphone = document.getElementById("uphone");
    var uemail = document.getElementById("uemail");

    if(uname.value==null || uname.value.trim()===""){
        alert("抱歉！您的用户名不能为空哦~");
        return false;
    }
    if(upwd.value==null || upwd.value.trim()===""){
        alert("抱歉！您的密码不能为空哦~");
        return false;
    }
    if(reupwd.value==null || reupwd.value.trim()===""){
        alert("抱歉！您第二次输入的密码不能为空哦~");
        return false;
    }
    if(upwd.value!==reupwd.value){
        alert("抱歉！您两次输入的密码不一致~");
        return false;
    }
    if(uphone.value==null || uphone.value.trim()===""){
        alert("抱歉！您的电话号码不能为空哦~");
        return false;
    }
    if(uphone.value.length === 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|)+\d{8})$/.test(uphone.value)){
    }else{
        alert("请输入真正的电话号码");
        return false;
    }

    if(uemail.value==null || uemail.value.trim()===""){
        alert("抱歉！您的邮箱不能为空哦~");
        return false;
    }
    var reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
    if (!reg.test(uemail.value)) { //正则验证不通过，格式不对
        alert("邮箱格式不正确！");
        return false;
    }
    $.ajax({
        method: 'POST',
        url: 'http://10.252.74.83:8080/user/register',
        data: {            //传到服务器的数据
            "uname":uname.value,
            "upwd":upwd.value,
            "uphone":uphone.value,
            "uemail":uemail.value
        },
        success: function (data) {//成功获取到服务器返回的数据
            console.log('获取服务器返回的数据成功');
            if(data.msg==="success"){
                alert('注册成功!');
                console.log("regist success");
                location.replace("login.html");
            }else{
                alert('注册失败，该手机号码已被注册过!');
                console.log("regist fail");
            }
        },
        error: function(xhr, err){
            console.log('获取失败');
        },
    })
}

function login(){
    var phone = document.getElementById("uphone");
    var pwd = document.getElementById("upwd");
    if(phone.value==null || phone.value.trim()===""){
        alert("请输入您的电话号码！");
        return false;
    }
    if(phone.value.length === 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|)+\d{8})$/.test(phone.value)){
    }else{
        alert("请输入真正的电话号码");
        return false;
    }
    if(pwd.value==null || pwd.value.trim()===""){
        alert("抱歉！您的密码不能为空哦~");
        return false;
    }

    $.ajax({
        method: 'POST',
        url: 'http://10.252.74.83:8080/user/login',
        data: {            //传到服务器的数据
            "uphone":phone.value,
            "upwd":pwd.value
        },
        success: function (data) {//成功获取到服务器返回的数据
            console.log('获取服务器返回的数据成功');
            // console.log(data.msg);
            if(data.msg==="success"){
                let phone1=document.getElementById("uphone").value;
                console.log(phone1);
                //添加key-value数据到sessionStorage
                localStorage.setItem("phone", phone1);
                //通过key来获取value
                var dt = localStorage.getItem("phone");
                console.log(dt);
                //清空所有的key-value数据。
                //localStorage.clear();
                // alert(localStorage.length);
                alert('登录成功!');
                location.replace("index.html");
            }else{
                alert('手机号码或密码错误!');
            }
        },
        error: function(xhr, err){
            console.log('获取服务器返回的数据失败');
        },
    })

}

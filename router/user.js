const express=require('express');
const r=express.Router();
const pool=require('../pool');
/*用户注册*/
r.post('/login',(req,res)=>{
    let obj=req.body;
    let s="success";
    let f="fail";
    pool.query('select * from user where phone=? and upwd=?',[obj.uphone,obj.upwd],(err,result)=>{
        if(err)throw err;
        if(result.length!==0){
            console.log(s);
            res.json({"msg":s});
        }else{
            console.log(f);
            res.json({"msg":f});
        }
    })

})
/*用户登录*/
r.post('/register',(req,res)=>{
    let obj=req.body;
    let s="success";
    let f="fail";
    pool.query('select * from user where phone = ?',[obj.uphone],(err,result)=>{
        if(err)throw err;
        if(result.length===0){
            pool.query('insert into user(phone,uname,upwd,email,address) values(?,?,?,?,null)',[obj.uphone,obj.uname,obj.upwd,obj.uemail],(err,result1)=>{
                if(err) throw(err);
            })
            res.json({"msg":s});
        }else{
            res.json({"msg":f});
        }
    })
})
/*搜索当前登录的用户信息*/
r.post('/search_user',(req,res)=>{
    let uphone=req.body.uphone;
    pool.query('select * from user where phone=?',[uphone],(err,result)=>{
        if(err)throw err;
        if(result.length!==0) {
            res.json(result);
        }
    })
})
/*更新当前用户信息*/
r.post('/update_user',(req,res)=>{
    let uphone=req.body.uphone;
    let uname=req.body.uname;
    let upwd=req.body.upwd;
    let email=req.body.email;
    let address=req.body.address;
    console.log(address);
    pool.query('update user set uname=?,upwd=?,email=?,address=? where phone=?',[uname,upwd,email,address,uphone],(err,result)=>{
        if(err)throw err;
        if(result.length!==0) {
            res.json(result);
        }
    })
})
module.exports=r;
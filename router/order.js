const express=require('express');
const r=express.Router();
const pool=require('../pool');

//返回orderlist表单的数据
r.post('/get_orderlist',(req,res)=>{
    var phone = req.body.phone;
    pool.query('select * from orderlist where phone = ?',[phone],(err,result)=>{
        res.json(result);
    })
})

//生成orderlist数据库
r.post('/create_orderlist',(req,res)=>{
    var order_time=req.body.ordertime;
    var phone=req.body.phone;
    var product_list=req.body.product_list;
    var count=Number(req.body.count);

    Math.seed=Math.random();
    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    oid=String((Math.ceil(Math.seed))%10000);
    pool.query('INSERT INTO orderlist VALUES(?,?,?,?,?,?)',[oid,phone,count,product_list,'',order_time],(err,result)=>{
        res.json(phone);
    })
})

//删除某个订单
r.post('/delete_orderlist',(req,res)=>{
    var oid = req.body.oid;
    pool.query('delete from orderlist where oid = ?',[oid],(err,result)=>{
        res.json(result);
    })
})

module.exports=r;
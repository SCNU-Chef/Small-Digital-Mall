const express=require('express');
const r=express.Router();
const pool=require('../pool');

//返回product表单的数据
r.post('/get_product',(req,res)=>{
    pool.query('select * from product',(err,result)=>{
        res.json(result);
    })
})

//根据pid返回商品数据
r.post('/get_product_by_pid',(req,res)=>{
    var pid = req.body.pid;
    pool.query('select * from product where pid = ?',[pid],(err,result)=>{
        if(err) throw err;
        res.json(result);
    })
})

//根据传入的商品分类参数搜索对应类型pclass的全部商品并返回
r.post('/search_product',(req,res)=>{
    var pclass=req.body.pclass;
    pool.query('select * from product where pclass = ?',[pclass],(err,result)=>{
        res.json(result);
    })
})

module.exports=r;
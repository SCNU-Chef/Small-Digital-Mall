const express=require('express');
const r=express.Router();
const pool=require('../pool');
//往购物车内插入某类商品
r.post('/insert',(req,res)=>{
    var phone=req.body.phone;
    var pid = req.body.pid;
    let obj=req.body;
    var num=parseInt(obj.num);
    Math.seed=Math.random();
    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    sid=String((Math.ceil(Math.seed))%10000);
    pool.query('select * from shopping_cart where pid=? and phone=?',[pid,phone],(err,result)=>{
        if(err) throw err;
        if(result.length===0){//如果购物车中不存在相同的商品
            pool.query('INSERT INTO shopping_cart VALUES(?,?,?,?,?)',[String(sid),phone,pid,num,0],(err,result)=>{
                if(err) throw err;
                console.log("insert");
                console.log(result);
                res.json(result);
            })
        }else{//如果购物车中存在相同的商品
            var product_count=result[0].product_count;
            pool.query('UPDATE shopping_cart SET product_count=? WHERE pid=?',[num+product_count,pid],(err,result)=>{
                if(err) throw err;
            });
            console.log("update");
            console.log(result);
            res.json(result);
        }
    })
})

//添加或删除某类商品
r.post('/add_or_sub',(req,res)=>{
    var product_count=req.body.product_count;
    var phone=req.body.phone;
    var pid=String(req.body.pid);
    pool.query('update shopping_cart set product_count=? where phone=? and pid=?',[product_count,phone,pid],(err,result)=>{
        if(err) throw err;
    })
    res.json(phone);
})

//订单生成后,用于删除购物车的数据
r.post('/delete_shopping_cart',(req,res)=>{
    var phone=req.body.phone;
    pool.query('delete from shopping_cart where phone = ? and is_checked=1',[phone],(err,result)=>{
        res.json(phone);
    })
})

//删除选中的商品
r.post('/delete_selected',(req,res)=>{
    var phone=req.body.phone;
    pool.query('delete from shopping_cart where phone=? and is_checked=1',[phone],(err,result)=>{
        if(err) throw err;
    })
    res.json(phone);
})

//删除单个种类的商品
r.post('/delete_single',(req,res)=>{
    var pid = req.body.pid;
    var phone=req.body.phone;
    pool.query('delete from shopping_cart where phone=? and pid =?',[phone,pid],(err,result)=>{
        res.json(result);
    })
})

//单选checkbox的路由
r.post('/select_single',(req,res)=>{
    var pid=req.body.pid;
    var is_checked=req.body.is_checked==='true'?1:0;
    var phone =req.body.phone;
    console.log("pid="+pid);
    console.log("is_checked="+is_checked);
    if(is_checked===0){
        pool.query('update shopping_cart set is_checked=0 where phone = ? and pid = ?',[phone,pid],(err,result)=>{
            if(err) throw err;
            console.log('00000');
        })
    } else{
        pool.query('update shopping_cart set is_checked=1 where phone = ? and pid = ?',[phone,pid],(err,result)=>{
            if(err) throw err;
            console.log('11111');
        })
    }
    res.json(phone);
})

//全选checkbox的路由
r.post('/select_all',(req,res)=>{
    var phone=req.body.phone;
    pool.query('select * from shopping_cart where phone = ? and is_checked=0',[phone],(err,result)=>{
        if(err) throw err;
        if(result.length!==0){//仍有没有被选中的商品
            pool.query('update shopping_cart set is_checked=1 where phone = ? and is_checked=0',[phone],(err,result)=>{
                if(err) throw err;
            })
        }else{//商品全都被选中了,没有没被选中的商品
            pool.query('update shopping_cart set is_checked=0 where phone = ?',[phone],(err,result)=>{
                if(err) throw err;
            })
        }
    })
    res.json(phone);
})

//返回shopping_cart表单中所有商品的信息
r.post('/all_pro_of_shopping_cart',(req,res)=>{
    var phone=req.body.phone;
    var resu=[];
    pool.query('select * from shopping_cart where phone = ?',[phone],(err,result1)=>{
        console.log('success');
        let cnt=0;
        for(var i=0;i<result1.length;i++){
            pool.query('select * from product where pid=?',[result1[i].pid],(err,result2)=>{
                resu.push(result2[0]);
                cnt++;
                if(cnt == result1.length){
                    res.json(resu);
                }
            })
        }
    })
})

//返回shopping_cart的信息
r.post('/all_pro_of_shopping_cart2',(req,res)=>{
    var phone=req.body.phone;
    pool.query('select * from shopping_cart where phone = ?',[phone],(err,result1)=>{
        res.json(result1)
    })
})

//返回shopping_cart被选中的物品的信息
r.post('/all_pro_of_shopping_cart3',(req,res)=>{
    var phone=req.body.phone;
    pool.query('select * from shopping_cart where phone = ? and is_checked=1',[phone],(err,result)=>{
        res.json(result);
    })
})

module.exports=r;
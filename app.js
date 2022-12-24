const ex = require("express");
const app = ex();
const session = require('express-session')
const middleware = require('./middleware')
const bodyparser = require('body-parser');
app.use(session({
    secret:"Hello World",
    resave:true,
    saveUninitialized:false
}))
 
  


const m = new Map();
// app.use(express.static(path.join(__dirname , 'public'))); 
app.set("view engine" , "ejs");
app.use(bodyparser.urlencoded({extended:true}));

app.listen(3000 , ()=> {
    console.log("Server is running at port 3000")
})
app.get('/' , middleware ,  (req , res)=>{
    res.render('index' , {user : req.session.user});
})
app.get('/login' , (req,res)=>{
    
    res.render('login')
})
app.post('/api/login' , (req,res)=>{
    const email = req.body.email; 
    const otp = req.body.otp;
    let flag = false;
    if(m.has(email)) {
        let t1 = new Date();
        let t2 = m.get(email)[1];
        let diff = Math.abs(t1.getTime() - t2.getTime())/1000 ;
        let s1 = "";
        s1+=otp;
        let s2 = "";
        s2 += m.get(email)[0];
        if(diff  <= 30 && s1 == s2) flag = true;
    }
    if(flag) {
        req.session.user = email ;
        console.log("logged in successfully")
        res.send("success") ;
    }
    else res.send("failed")
})
app.get('/logout' , (req,res)=>{
    m.delete(req.session.user)
    req.session.user = null
    res.redirect('/');
} )
app.post('/api/generateOtp' ,(req,res)=>{
    const email  = req.body.email;
    let otp = '';
    otp+=Math.min( Math.round(Math.random()*10) , 9);
    otp+=Math.min( Math.round(Math.random()*10) , 9);
    otp+=Math.min( Math.round(Math.random()*10) , 9);
    otp+=Math.min( Math.round(Math.random()*10) , 9);
    let diff = 40 ;
    if(m.has(email)){
        let t1 = new Date();
        let t2 = m.get(email)[1];
        diff = Math.min(Math.abs(t1.getTime() - t2.getTime())/1000  , 40 )
    }
    if(diff >= 30){
        m.set(email , [otp , new Date()])
        console.log(otp)

        res.send("success")
    }else {
        console.log("Hi")
        res.send( (30 - diff) + "sec remaining to resend otp");
    }
})
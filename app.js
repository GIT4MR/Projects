const express=require("express");

const app=express();

const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

const request=require("request");

const https=require("https");
// const request  = require("request");

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signUp.html")
})
app.post("/failure.html",function(req,res){
    res.sendFile(__dirname+"/signUp.html");
})
app.post("/",function (req,res) {
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.Email;

    console.log(fname,lname,email)
    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data);
    const url="https://us8.api.mailchimp.com/3.0/lists/84ad334e50";
    const options={
        method:"POST",
        auth:"rizzinlaptop@gmail.com:f5919c0f83fccb09b0c16bb1c4db1dd1-us8"

    }
    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(response.statusCode);
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});


app.listen(process.env.PORT||3000,function(){
    console.log("Server is running on port : 3000");
})

// f5919c0f83fccb09b0c16bb1c4db1dd1-us8
// Audience ID : 84ad334e50
// 58cec0b344e1af673460e5ec0c2ae541-us8
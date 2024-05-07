const express=require('express');
const app=express();
const port=80;
const fs=require('fs');
const path=require('path');
const bodyparser=require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance');

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

var Contact = mongoose.model('Contact', contactSchema);


app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views',path.join(__dirname,"views"));

app.get('/',(req,res)=>{

    const params={};
    res.status(200).render('home.pug',params);

})
app.get('/contact',(req,res)=>{

    const params={};
    res.status(200).render('contact.pug',params);

})
app.post('/contact',(req,res)=>{
    var myData= new Contact(req.body);
    myData.save().then(()=>{
        res.send('this item has been saved to database');

    }).catch(()=>{
        res.status(400).send("item was not saved to database");
    })
    

})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})





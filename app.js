const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const path = require('path');
const Scraper = require('./models/scraper')
const scraper = new Scraper();





app.set('view engine', 'ejs') 
app.use(bodyParser.urlencoded({extended:false})) 
app.use(bodyParser.json())


app.use("/public", express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) =>{
    //res.sendFile(path.join(__dirname, 'views', 'index.html')
    res.render('index')

})

app.post("/test", async(req, res) =>{
    let message = await scraper.getContent(req.body.url);
    await console.log(message)
    await res.send({"message": message})
    // let message = scraper.getContent(req.body.url).then(()=>{
    //     console.log(message).then(()=>{
    //         res.send({"name": "bobby"})
    //     })
    // })
    
})

app.listen(5000, (req, res) =>{console.log("working")})
const express = require('express') //load the library express using require keyword
const hbs = require('hbs')
const geocode = require('./utilis/geocode')
const forecast = require('./utilis/forecast')
const app = express()        //calling the express() function to create app
const path = require('path') // The Path module provides a way of working with directories and file paths.

//Define path for Express Config
const publicdirectory = path.join(__dirname,'../public') // join method to join two paths.
const viewdirectory = path.join(__dirname,'../template/views') 
const partialdirectory = path.join(__dirname,'../template/partial') 


//setup handler and views location
app.set('view engine','hbs')
app.set('views',viewdirectory)
hbs.registerPartials(partialdirectory)

// Setup static directory to serve
app.use(express.static(publicdirectory)) //app.use() function is used to mount //express.static to serve static files, such as images, CSS, JavaScript, etc.


app.get('',(req,res)=>{
    res.render('index',{
        title:'Welcome app',
        name:'Sameeksha'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        name:'Sameeksha'
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        message:'Help me!!!',
        title:'help Page',
        name:'Sameeksha'
    })
})

app.get('/weather',(req,res) =>{  //app.get() function routes the HTTP GET Requests //The Response object (res) specifies the HTTP response which is sent by an Express app when it gets an HTTP request. //The express.js request object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
    if(!req.query.address){
        return res.send({
            error:"Please provide the address"
        })
    }

    geocode(req.query.address, (error,{latitude, longitude,place}= {} ) =>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastres) =>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:forecastres,
                location:place,
                address:req.query.address
            })
        })
    })
    
    // res.send({
    //     address:req.query.address,
    //     forecast:'Cloudy',
    //     location:'Lucknow'
    // })
})

app.get('/help*',(req,res)=>{
    res.render('404error',{
        title:'Error Page',
        message:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404error',{
        title:'Error Page',
        message:'Page not found'
    })
})


app.listen(3000,()=>{ //Set the port for our local application, requires path and callback as an argument. default host is localhost and port is 3000.
    console.log("Server is up on port 3000")
})


// app.get('/help',(req,res) => {
//     res.send([{
//         name:'Sameeksha',
//         song:'stupid heart'
//     },{
//         name:'Muda',
//         song:'My'
//     }])
// })

// app.get('/about',(req,res) => {
//     res.send('<h1>About Page</h1>')
// })


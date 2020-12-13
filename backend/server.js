const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require('./data')

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res){
    const about = {
        avatar_url: "https://media-exp1.licdn.com/dms/image/C4E03AQFn1u-ULICipw/profile-displayphoto-shrink_200_200/0/1606535871059?e=1611792000&v=beta&t=YDMTnUIY7Efe805rkqzmsyUYdAXcfofJvAFOwIQvl1k",
        name: "Wendell Barcelos",
        role: "Full stack engineer", 
        description:`Programador full-stack, apaixonado pelas melhores tecnologias de desenvolvimento back-end, front-end e mobile.
        Colaborador da <a href='https://react-brasil-slack.herokuapp.com/'   target="_blank">React Brazil</a>.`,
        links: [
            { name: "Github", url: "https://github.com/wendellbarcelos"},
            { name: "Linkedin", url: "https://www.linkedin.com/in/wendell-barcelos/"},
            { name: "Gmail", url: "mailto:wendellbarcelos.wb@gmail.com"}
        ]
    }

    return res.render("about", { about })
})

server.get("/videos", function(req, res){

    return res.render("videos", { items: videos })
})

server.get("/video", function(req, res){
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id
    })

    if (!video) {
        return res.send("Video not found!")
    }

    return res.render("video", { item: video })
})

server.listen(5000, function(){
    console.log("server is running")
})
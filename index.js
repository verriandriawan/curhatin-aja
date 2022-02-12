const express = require("express")
const config = require("./config")

const app = express()

app.set('views', process.cwd() + '/src/views')
app.set('view engine', 'ejs')

app.use(express.static("src/public"))

const Router = (page, data) => {
    data = config.responseData(config, data)
    return (req, resp) => {
        resp.render(`pages/${page}`, data)
    }
}

app.get('/', Router('index', {title: 'Consul'}))
app.get('/login', Router('login', {title: 'Login'}))
app.get('/register', Router('register', {title: 'Register'}))
app.get('/reset', Router('reset', {title: 'Reset Password'}))

app.listen(3000)
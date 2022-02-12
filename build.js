process.env['NODE_ENV'] = "build"

const fs = require("fs")
const ejs = require('ejs')
const rimraf = require("rimraf")
const config = require("./config")
const ncp = require("ncp")

const pwd = process.cwd()
const pages = `${pwd}/src/views/pages`

const defaultData = {
    index: {title: "Consule"},
    login: {title: "Login"},
    register: {title: "Register"},
    request: {title: "Request new password"},
    reset: {title: "Reset password"},
}

fs.rmSync(`${pwd}/dist`, {recursive: true})
fs.mkdirSync(`${pwd}/dist`, {recursive:true})

fs.readdir(pages, (err, paths) => {
    paths.forEach(file => {
        if (file.slice(-3) === "ejs") {
            let filename = file.replace('.ejs', '')
            file = `${pages}/${file}`

            let buf = fs.readFileSync(file)
            let data = config.responseData(config, defaultData[filename])
            
            ejs.renderFile(file,data, {}, (err, result) => {
                fs.writeFileSync(`${pwd}/dist/${filename}.html`, result)
            })
        }
    })
})

ncp(`${pwd}/src/public/assets`, `${pwd}/dist/assets`)
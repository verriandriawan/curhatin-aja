const baseUrl = 'http://localhost:3000'
const assetPath = 'assets'

const isBuild = process.env.NODE_ENV === "build"
const basePath = isBuild ? '/consul' : '/'

const routes = {
    base: isBuild ? `` : '/', 
    login: isBuild ? `login.html` : '/login',
    register: isBuild ? 'register.html' :  '/register',
    request: isBuild ? 'request.html' : '/request',
    reset: isBuild ? 'reset.html' : '/reset',
    single_page: isBuild ? 'single-page.html' : '/single-page',
    dashboard: isBuild ? 'dashboard.html' : '/dashboard'
}

const defaultData = {
    index: {title: "Consule"},
    login: {title: "Login"},
    register: {title: "Register"},
    request: {title: "Request new password"},
    reset: {title: "Reset password"},
    single_page: {title: "Single Page"},
    dashboard: {title: "Dashboard"}
}


const responseData = (config, data) => {
    data = data || {}
    data.assetUrl = (file) => {
        let result = isBuild ? `${basePath}/${assetPath}${file}` : `${config.assetUrl}/${file}`
        return result
    }
    
    data.getRoute = (route) => {
        route = config.routes[route]
        return isBuild ? `${basePath}/${route}` : route
    }
    return data
}

module.exports = {
    baseUrl,
    assetPath,
    assetUrl: `${baseUrl}/${assetPath}`,
    
    routes,
    defaultData,
    responseData
}
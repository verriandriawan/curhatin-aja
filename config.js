const baseUrl = 'http://localhost:3000'
const assetPath = 'assets'

const isBuild = process.env.NODE_ENV === "build"
const basePath = isBuild ? '/consul' : '/'

const routes = {
    base: basePath,
    login: isBuild ? `login.html` : '/login',
    register: isBuild ? 'register.html' :  '/register',
    request: isBuild ? 'request.html' : '/request',
    reset: isBuild ? 'reset.html' : '/reset'
}

const responseData = (config, data) => {
    data = data || {}
    data.assetUrl = (file) => {
        let result = isBuild ? `${basePath}/${assetPath}${file}` : `${config.assetUrl}/${file}`
        console.log(result)
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
    responseData
}
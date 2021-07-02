export const PATHS = {
    HOME: {route:'/', name:'home'},
    LOGIN: {route:'/login', name:'login'},
    REGISTER: {route: '/sign-up', name: 'register'}
}

export const getRoute= (pathname) => {
    if (pathname === PATHS.HOME.route) return PATHS.HOME.name
    else return pathname.substr(1)
}
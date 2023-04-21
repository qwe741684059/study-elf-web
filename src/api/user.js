import request from '@/utils/request'

export function login(user) {
    return request({
        url: 'auth/login',
        method: 'post',
        data: user
    })
}

export function getInfo() {
    return request({
        url: 'auth/info',
        method: 'get'
    })
}

export function logout() {
    return request({
        url: 'auth/logout',
        method: 'delete'
    })
}

export function register(user) {
    return request({
        url: 'user/insertUser',
        data: user,
        method: 'post'
    })
}
export function updateAvatar(file) {
    return request({
        url: 'user/updateAvatar',
        data: file,
        method: 'post'
    })
}

export function updateUser(user) {
    return request({
        url: 'user/updateUser',
        data: user,
        method: 'post'
    })
}
import request from '@/utils/request'

export function addMemorandum(memorandumForm) {
    return request({
        url:'/memorandum/insertMemorandum',
        method:'post',
        data:memorandumForm
    })
}

export function selectMemorandumList(userId) {
    return request({
        url: '/memorandum/selectMemorandumList',
        method: 'post',
        data: userId
    })
}

export function deleteMemorandum(memorandum) {
    return request({
        url: '/memorandum/deleteMemorandum',
        method: 'post',
        data: memorandum
    })
}

export function updateMemorandum(memorandum) {
    return request({
        url: '/memorandum/updateMemorandum',
        method: 'post',
        data: memorandum
    })
}

export function getTimeList(userId) {
    return request({
        url: '/memorandum/getTimeList',
        method: 'post',
        data: userId
    })
}
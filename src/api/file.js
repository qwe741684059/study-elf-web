import request from '@/utils/request'

export function addFile(file) {
    return request({
        url: 'file/insertFile',
        method: 'post',
        data: file
    })
}

export function selectFileListByFilePath(filePathVO) {
    return request({
        url: 'file/selectFileListByFilePath',
        method: 'post',
        data: filePathVO
    })
}

export function deleteFile(file) {
    return request({
        url: 'file/deleteFile',
        method: 'post',
        data: file
    })
}

export function updateFile(file) {
    return request({
        url: 'file/updateFile',
        method: 'post',
        data:file
    })
}
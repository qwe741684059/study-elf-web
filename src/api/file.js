import request from '@/utils/request'

export function addFile(file) {
    return request({
        url: 'file/insertFile',
        method: 'post',
        data: file
    })
}

export function selectFileListByFilePath(filePath) {
    return request({
        url: 'file/selectFileListByFilePath',
        method: 'post',
        data: filePath
    })
}
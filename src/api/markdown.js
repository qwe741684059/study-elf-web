import request from '@/utils/request'

export function insertMarkdown(markdown) {
    return request({
        url:'/markdown/insertMarkdown',
        method:'post',
        data:markdown
    })
}

export function updateMarkdown(markdown) {
    return request({
        url:'/markdown/updateMarkdown',
        method:'post',
        data:markdown
    })
}

export function selectMarkdownByPath(filePathVO) {
    return request({
        url:'/markdown/selectByPath',
        method:'post',
        data:filePathVO
    })
}

export function selectMarkdownByMarkdownId(markdownId) {
    return request({
        url:'/markdown/selectByMarkdownId',
        method:'post',
        data:markdownId
    })
}

export function deleteMarkdown(markdown) {
    return request({
        url:'/markdown/deleteMarkdown',
        method:'post',
        data:markdown
    })
}
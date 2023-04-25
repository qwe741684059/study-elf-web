import request from '@/utils/request'

export function addCourse(course) {
    return request({
        url: 'course/insertCourse',
        method: 'post',
        data: course
    })
}

export function selectCourseList(userId) {
    return request({
        url: 'course/selectCourseList',
        method: 'post',
        data: userId
    })
}

export function deleteCourse(course) {
    return request({
        url: 'course/deleteCourse',
        method: 'post',
        data: course
    })
}
export function updateCourse(rawCourse, updateCourse) {
    return request({
        url: 'course/updateCourse',
        method: 'post',
        data: [rawCourse, updateCourse]
    })
}


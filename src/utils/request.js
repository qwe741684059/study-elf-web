import axios from "axios";
import Config from "@/settings"
import {getToken} from "@/utils/auth";
import {ElNotification} from "element-plus";

import router from "@/router";

const _this = this

const service = axios.create({
    baseURL: "http://localhost:8181",
    timeout: Config.timeout
})

service.interceptors.request.use(
    config => {
        if (getToken()) {
            // 如果有token，则让每个请求头都带着token
            config.headers['Authorization'] = getToken()
        }
        config.headers['Content-Type'] = 'application/json'
        return config
    }
)

service.interceptors.response.use(
    response => {
        return response
    },
    error => {
        let code = 0
        try {
            code = error.response.data.status
        } catch (e) {
            if (error.toString().indexOf('Error: timeout') !== -1) {
                ElNotification.error({
                    title: '請求网络超时',
                    duration: 50000
                })
            }
        }
        console.log(code)
        if (code) {
            if (code === 401) {
                console.log("失败")
                // _this.$store.dispatch('LogOut').then(() => {
                //     Cookies.set('point', 401)
                //     location.reload()
                // })
            } else if (code === 403) {
                console.log("403错误代码")
            } else {
                const errorMsg = error.response.data.message
                if (errorMsg !== undefined) {
                    ElNotification.error({
                        title: errorMsg,
                        duration:5000
                    })
                }
            }
        } else {
            ElNotification.error({
                title: "请求接口失败",
                duration: 5000
            })
        }
    }
)
export default service
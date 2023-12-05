import service from "@/services/service.js";

export const requestLogin = (data) => {
    return service.post({
        url: '/login',
        data
    })
}
/**
 * 获取所有单词
 * @param category
 * @returns {Promise | Promise<unknown>}
 */
export const findAllByCategory = (category) => {
    return service.get({
        url: '/words/findAllByCategory',
        params: {
            category
        }
    })
}

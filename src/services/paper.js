import service from "@/services/service.js";

export const findAllByCategory = (name) => {
    return service.get({
        url: '/Paper/selectPaperByName',
        params: {
            name
        }
    })
}

/**
 * 排序图
 * @param category
 * @returns {Promise | Promise<unknown>}
 */

export const selectBar = (category) => {
    return service.get({
        url: '/Bar/selectBar',
        params: {
            category
        }
    })
}

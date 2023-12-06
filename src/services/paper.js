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

/**
 * 更具 categories 查找论文
 * @param categories
 * @returns {Promise | Promise<unknown>}
 */

export const selectByCategory = (categories) => {
    return service.get({
        url: '/Paper/selectByCategory',
        params: {
            categories
        }
    })
}


/**
 * 网络图
 * @returns {Promise | Promise<unknown>}
 */
export const selectForce = (category) => {
    return service.get({
        url: '/Force/selectForce',
        params: {
            category
        }
    })
}
export const getHighChartData = (category) => {
    return service.get({
        url: '/Bar/selectBar',
        params: {
            category
        }
    })
}
export const getHighChartIndex = (category) => {
    return service.get({
        url: '/Bar/selectName',
        params: {
            category
        }
    })
}


/**
 * 查找与作者相关的人
 * @param name
 * @returns {Promise | Promise<unknown>}
 */
export const selectByName = (name) => {
    return service.get({
        url: '/Force/selectByName',
        params: {
            name
        }
    })
}

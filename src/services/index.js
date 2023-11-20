import service from "@/services/service.js";

export const requestLogin = (data) => {
    return service.post({
        url: '/login',
        data
    })
}

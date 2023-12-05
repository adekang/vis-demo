import service from "@/services/service.js";

export const findAllByCategory = (name) => {
    return service.get({
        url: '/Paper/selectPaperByName',
        params: {
            name
        }
    })
}

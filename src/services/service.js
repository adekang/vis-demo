import axios from 'axios';

const BASE_URL = '/api';
const TIMEOUT = 3000;

class service {
    constructor(baseURL, timeout = 10000) {
        this.instance = axios.create({
            baseURL,
            timeout,
        });

        this.instance.interceptors.request.use(
            config => {
                return config;
            },
            err => {
                return Promise.reject(err)
            }
        );

        this.instance.interceptors.response.use(
            res => {
                return res;
            },
            err => {
                return Promise.reject(err)
            }
        );
    }

    request(config) {
        return new Promise((resolve, reject) => {
            this.instance
                .request(config)
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    get(config) {
        return this.request({...config, method: 'get'});
    }

    post(config) {
        return this.request({...config, method: 'post'});
    }
}

export default new service(BASE_URL, TIMEOUT);

import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from 'pinia'
import router from '@/router/index';
import 'ant-design-vue/dist/reset.css';
import DataVVue3 from '@kjgl77/datav-vue3'

const app = createApp(App)

app.use(DataVVue3)
app.use(createPinia())
app.use(router)
app.mount('#app')

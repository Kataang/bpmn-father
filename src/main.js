import {createApp} from 'vue'
import Father from './App.vue'

const app = createApp(Father) // ���ڲ���
// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// ȫ��css����ӷ�����

app.use(ElementPlus, {size: 'default', locale: zhCn})
app.mount('#app')

import {createApp} from 'vue'
import Father from './App.vue'

const app = createApp(Father) // 用于测试
// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 全局css的添加方法：

app.use(ElementPlus, {size: 'default', locale: zhCn})
app.mount('#app')

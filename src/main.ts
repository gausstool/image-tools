import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import './styles/index.css';
import './styles/gauss-ui/g-desc.css';
import './styles/gauss-ui/g-divider.css';
import './styles/gauss-ui/g-menu.css';

const app = createApp(App)
app.use(ElementPlus)
app.mount('#root')
import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';

Vue.use(VueCompositionApi);

import App from './App.vue';

new Vue({ render: createElement => createElement(App) }).$mount('#app');
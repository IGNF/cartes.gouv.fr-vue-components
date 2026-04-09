import CgfrHeader from './components/CgfrHeader.vue';
import CgfrFooter from './components/CgfrFooter.vue';
import CgfrModal from './components/CgfrModal.vue';
import CgfrModalTheme from './components/CgfrModalTheme.vue';
import CgfrModalCookies from './components/CgfrModalCookies.vue';

export { CgfrHeader, CgfrFooter, CgfrModal, CgfrModalTheme, CgfrModalCookies };

export default {
  install(app) {
    app.component('CgfrHeader', CgfrHeader);
    app.component('CgfrFooter', CgfrFooter);
    app.component('CgfrModal', CgfrModal);
    app.component('CgfrModalTheme', CgfrModalTheme);
    app.component('CgfrModalCookies', CgfrModalCookies);
  },
};

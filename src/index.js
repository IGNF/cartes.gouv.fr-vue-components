import CgfrHeader from './components/CgfrHeader.vue';
import CgfrFooter from './components/CgfrFooter.vue';
import CgfrModal from './components/CgfrModal.vue';
import CgfrModalTheme from './components/CgfrModalTheme.vue';
import CgfrModalCookies from './components/CgfrModalCookies.vue';
import CgfrSqlEditor from './components/CgfrSqlEditor.vue';
import CgfrFollow from './components/CgfrFollow.vue';
import CgfrSelectList from './components/CgfrSelectList.vue';

export {
  CgfrHeader,
  CgfrFooter,
  CgfrModal,
  CgfrModalTheme,
  CgfrModalCookies,
  CgfrSqlEditor,
  CgfrFollow,
  CgfrSelectList,
};

export default {
  install(app) {
    app.component('CgfrHeader', CgfrHeader);
    app.component('CgfrFooter', CgfrFooter);
    app.component('CgfrModal', CgfrModal);
    app.component('CgfrModalTheme', CgfrModalTheme);
    app.component('CgfrModalCookies', CgfrModalCookies);
    app.component('CgfrSqlEditor', CgfrSqlEditor);
    app.component('CgfrFollow', CgfrFollow);
    app.component('CgfrSelectList', CgfrSelectList);
  },
};

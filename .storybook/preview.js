import { setup } from '@storybook/vue3-vite';
import { createMemoryHistory, createRouter } from 'vue-router';
import '@gouvfr/dsfr/dist/dsfr/dsfr.min.css';
import '@gouvfr/dsfr/dist/utility/icons/icons.min.css';
import '@gouvminint/vue-dsfr/styles';
import '../src/assets/icons.scss';

setup((app) => {
  document.documentElement.lang = 'fr';
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/:pathMatch(.*)*', component: { render: () => null } }],
  });
  app.use(router);
  return router.isReady();
});

export default {
  parameters: {
    controls: { expanded: true },
  },
};

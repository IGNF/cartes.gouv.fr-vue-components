import { expect, fn } from 'storybook/test';
import { h, ref } from 'vue';
import CgfrHeaderNavigationMenu from '../src/components/CgfrHeaderNavigationMenu.vue';
import { accountMenu, helpMenu, sampleUser } from './fixtures/navigation.js';

export default {
  title: 'Composants internes/CgfrHeaderNavigationMenu',
  component: CgfrHeaderNavigationMenu,
  args: { id: 'storybook-menu', menu: helpMenu, onLogin: fn(), onLogout: fn() },
  render: (args) => ({
    setup() {
      const expandedId = ref('');
      return () =>
        h('nav', { class: 'fr-nav', 'aria-label': 'Navigation de démonstration' }, [
          h('ul', { class: 'fr-nav__list' }, [
            h(CgfrHeaderNavigationMenu, {
              ...args,
              expandedId: expandedId.value,
              onToggleId: (id) => (expandedId.value = expandedId.value === id ? '' : id),
            }),
          ]),
        ]);
    },
  }),
};

export const Menu = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: 'Aide' });
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const guide = await canvas.findByRole('link', { name: 'Guide d’utilisation' });
    await expect(guide).toBeVisible();
    const icon = guide.querySelector('.fr-icon-book-2-line');
    await expect(icon).not.toBeNull();
    await expect(getComputedStyle(icon, '::before').maskImage).toMatch(/^url\(/);
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};

export const Connexion = {
  args: { menu: accountMenu, authenticated: false },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Se connecter' }));
    await expect(args.onLogin).toHaveBeenCalledOnce();
  },
};

export const Compte = { args: { menu: accountMenu, authenticated: true, user: sampleUser } };

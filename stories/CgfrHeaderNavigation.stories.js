import { expect, fn } from 'storybook/test';
import CgfrHeaderNavigation from '../src/components/CgfrHeaderNavigation.vue';
import { accountMenu, helpMenu, sampleUser } from './fixtures/navigation.js';

export default {
  title: 'Composants internes/CgfrHeaderNavigation',
  component: CgfrHeaderNavigation,
  args: { items: [helpMenu, accountMenu], onLogin: fn(), onLogout: fn() },
};

export const Visiteur = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: 'Aide' });
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(await canvas.findByRole('link', { name: 'Guide d’utilisation' })).toBeVisible();
    await userEvent.keyboard('{Escape}');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};

export const Connecte = { args: { authenticated: true, user: sampleUser } };

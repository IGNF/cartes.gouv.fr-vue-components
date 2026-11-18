import { expect, fn } from 'storybook/test';
import CgfrHeader from '../src/components/CgfrHeader.vue';
import { sampleUser } from './fixtures/navigation.js';

export default {
  title: 'Composants/CgfrHeader',
  component: CgfrHeader,
  parameters: { layout: 'fullscreen' },
  args: { onLogin: fn(), onLogout: fn() },
};

export const Visiteur = {
  play: async ({ args, canvas, userEvent }) => {
    await expect(canvas.getByRole('img', { name: 'Logo de cartes.gouv.fr' })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Se connecter' }));
    await expect(args.onLogin).toHaveBeenCalledOnce();
  },
};

export const Compact = { args: { compact: true, badgeText: 'Explorer', iamDisable: true } };

export const Connecte = { args: { authenticated: true, user: sampleUser } };

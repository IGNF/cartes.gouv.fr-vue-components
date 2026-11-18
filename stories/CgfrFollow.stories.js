import { expect } from 'storybook/test';
import CgfrFollow from '../src/components/CgfrFollow.vue';

export default {
  title: 'Composants/CgfrFollow',
  component: CgfrFollow,
  args: { open: true, newsletterUrl: 'https://example.com/lettre-information' },
};

export const Ouvert = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'S’inscrire' })).toBeVisible();
    await expect(canvas.getByRole('link', { name: 'Rejoindre la communauté' })).toBeVisible();
  },
};

export const Ferme = { args: { open: false } };

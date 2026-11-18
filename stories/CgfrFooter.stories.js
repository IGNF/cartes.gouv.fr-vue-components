import { expect } from 'storybook/test';
import CgfrFooter from '../src/components/CgfrFooter.vue';

export default {
  title: 'Composants/CgfrFooter',
  component: CgfrFooter,
  parameters: { layout: 'fullscreen' },
};

export const Standard = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('contentinfo')).toBeVisible();
  },
};

export const Compact = {
  args: { compact: true },
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: 'Plus d’informations' });
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    const close = canvas.getByRole('button', { name: 'Fermer' });
    await expect(close).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(close);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};

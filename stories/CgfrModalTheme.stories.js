import { expect, waitFor, within } from 'storybook/test';
import CgfrModalTheme from '../src/components/CgfrModalTheme.vue';
import { renderModal } from './fixtures/renderModal.js';

export default {
  title: 'Composants/CgfrModalTheme',
  component: CgfrModalTheme,
  render: renderModal(CgfrModalTheme, 'theme'),
};

export const ChangerLeTheme = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Ouvrir la modale' }));
    const dialog = within(canvas.getByRole('dialog', { name: 'Paramètres d’affichage' }));
    const light = dialog.getByRole('radio', { name: 'Thème clair' });
    const dark = dialog.getByRole('radio', { name: 'Thème sombre' });
    const root = document.documentElement;
    const wasDark = root.dataset.frTheme === 'dark';
    const next = wasDark ? light : dark;

    await userEvent.click(next);
    await expect(next).toBeChecked();
    await waitFor(() => expect(root).toHaveAttribute('data-fr-theme', wasDark ? 'light' : 'dark'));
    await userEvent.click(wasDark ? dark : light);
    await userEvent.click(dialog.getByRole('button', { name: 'Fermer' }));
  },
};

import { expect, fn, within } from 'storybook/test';
import CgfrModal from '../src/components/CgfrModal.vue';
import { renderModal } from './fixtures/renderModal.js';

export default {
  title: 'Composants/CgfrModal',
  component: CgfrModal,
  args: { name: 'storybook-modal', title: 'Informations', size: 'md', onClose: fn() },
  render: renderModal(CgfrModal, undefined, {
    default: () => 'Contenu de la modale de démonstration.',
  }),
};

export const Standard = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Ouvrir la modale' }));
    const dialog = canvas.getByRole('dialog', { name: args.title });
    await expect(dialog).toHaveTextContent('Contenu de la modale de démonstration.');
    await userEvent.click(within(dialog).getByRole('button', { name: 'Fermer' }));
    await expect(args.onClose).toHaveBeenCalledOnce();
    await expect(canvas.queryByRole('dialog')).not.toBeInTheDocument();
  },
};

export const Grande = { args: { size: 'lg' } };

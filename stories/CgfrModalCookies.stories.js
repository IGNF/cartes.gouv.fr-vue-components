import { expect, fn, within } from 'storybook/test';
import CgfrModalCookies from '../src/components/CgfrModalCookies.vue';
import { renderModal } from './fixtures/renderModal.js';

export default {
  title: 'Composants/CgfrModalCookies',
  component: CgfrModalCookies,
  args: { onAcceptConsent: fn(), onRefuseConsent: fn() },
  render: renderModal(CgfrModalCookies, 'cookies'),
};

async function chooseConsent({ args, canvas, userEvent }, label, event) {
  await userEvent.click(canvas.getByRole('button', { name: 'Ouvrir la modale' }));
  const dialog = canvas.getByRole('dialog', { name: 'Panneau de gestion des cookies' });
  await userEvent.click(within(dialog).getByRole('button', { name: label }));
  await expect(args[event]).toHaveBeenCalledOnce();
  await expect(canvas.queryByRole('dialog')).not.toBeInTheDocument();
}

export const Accepter = {
  play: (context) => chooseConsent(context, 'Tout accepter', 'onAcceptConsent'),
};

export const Refuser = {
  play: (context) => chooseConsent(context, 'Tout refuser', 'onRefuseConsent'),
};

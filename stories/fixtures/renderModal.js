import { h, onBeforeUnmount, watch } from 'vue';
import { useModals } from '../../src/composables/useModals.js';

export function renderModal(Component, name, slots) {
  return (args) => ({
    setup() {
      const { open, close } = useModals();
      const modalName = () => name ?? args.name;
      watch(modalName, (_current, previous) => close(previous));
      onBeforeUnmount(() => close(modalName()));

      return () => [
        h(
          'button',
          { type: 'button', class: 'fr-btn', onClick: () => open(modalName()) },
          'Ouvrir la modale'
        ),
        h(Component, args, slots),
      ];
    },
  });
}

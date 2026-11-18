import { expect, screen } from 'storybook/test';
import { h, ref, watch } from 'vue';
import CgfrSelectList from '../src/components/CgfrSelectList.vue';

export default {
  title: 'Composants/CgfrSelectList',
  component: CgfrSelectList,
  args: {
    label: 'Couches cartographiques',
    options: [
      { label: 'Routes', value: 'routes' },
      { label: 'Bâtiments', value: 'batiments' },
      { label: 'Relief', value: 'relief', disabled: true },
    ],
    modelValue: [],
  },
  render: (args) => ({
    setup() {
      const selected = ref(args.modelValue);
      watch(
        () => args.modelValue,
        (value) => (selected.value = value)
      );

      return () =>
        h(CgfrSelectList, {
          ...args,
          modelValue: selected.value,
          'onUpdate:modelValue': (value) => (selected.value = value),
        });
    },
  }),
};

export const FiltrageEtSelection = {
  play: async ({ canvas, userEvent }) => {
    const select = canvas.getByRole('combobox', { name: 'Couches cartographiques' });
    await userEvent.click(select);
    // Le panneau est téléporté dans le body, hors du canvas.
    const search = await screen.findByPlaceholderText('Rechercher');
    await userEvent.type(search, 'Routes');
    await expect(screen.queryByRole('checkbox', { name: 'Bâtiments' })).not.toBeInTheDocument();
    const routes = screen.getByRole('checkbox', { name: 'Routes' });
    await userEvent.click(routes);
    await expect(routes).toBeChecked();
    await expect(select).toHaveTextContent('Couches cartographiques (1)');
    await userEvent.click(routes);
    await userEvent.keyboard('{Escape}');
  },
};

export const Preselection = { args: { modelValue: ['batiments'] } };
export const Desactive = { args: { disabled: true } };

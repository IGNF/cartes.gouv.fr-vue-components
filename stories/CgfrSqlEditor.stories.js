import { expect, fn } from 'storybook/test';
import { h, ref, watch } from 'vue';
import CgfrSqlEditor from '../src/components/CgfrSqlEditor.vue';

const exampleQuery = 'SELECT nom FROM communes;';

export default {
  title: 'Composants/CgfrSqlEditor',
  component: CgfrSqlEditor,
  args: {
    title: 'Requête SQL',
    modelValue: exampleQuery,
    'onUpdate:modelValue': fn(),
  },
  render: (args) => ({
    setup() {
      const query = ref(args.modelValue);
      watch(
        () => args.modelValue,
        (value) => (query.value = value)
      );

      return () =>
        h(CgfrSqlEditor, {
          ...args,
          modelValue: query.value,
          'onUpdate:modelValue': (value) => {
            query.value = value;
            args['onUpdate:modelValue'](value);
          },
        });
    },
  }),
};

export const Edition = {
  play: async ({ args, canvas, userEvent }) => {
    const editor = canvas.getByRole('textbox');
    await expect(editor).toHaveTextContent(exampleQuery);
    await userEvent.click(editor);
    await userEvent.keyboard('{End}{Backspace} LIMIT 10;');
    await expect(editor).toHaveTextContent('SELECT nom FROM communes LIMIT 10;');
    await expect(args['onUpdate:modelValue']).toHaveBeenLastCalledWith(
      'SELECT nom FROM communes LIMIT 10;'
    );
  },
};

export const Vide = { args: { modelValue: '', minHeight: '180px' } };

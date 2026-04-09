import { ref } from 'vue';

const openModals = ref({});

export function useModals() {
  const open = (name) => {
    openModals.value[name] = true;
  };

  const close = (name) => {
    delete openModals.value[name];
  };

  const isOpen = (name) => {
    return !!openModals.value[name];
  };

  return {
    open,
    close,
    isOpen,
  };
}

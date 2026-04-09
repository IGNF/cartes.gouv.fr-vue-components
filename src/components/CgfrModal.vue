<script setup>
import { computed } from 'vue';
import { DsfrModal } from '@gouvminint/vue-dsfr';
import { useModals } from '../composables/useModals.js';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: 'md',
  },
  actions: {
    type: Array,
    default: undefined,
  },
});

const emit = defineEmits(['close']);

const modals = useModals();

const isOpen = computed(() => modals.isOpen(props.name));

const onClose = () => {
  modals.close(props.name);
  emit('close');
};
</script>

<template>
  <DsfrModal
    :opened="isOpen"
    :title="props.title"
    :size="props.size"
    :actions="props.actions"
    @close="onClose"
  >
    <slot />
  </DsfrModal>
</template>

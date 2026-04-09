<script setup>
import { ref, onUnmounted } from 'vue';
import CgfrHeaderNavigationMenu from './CgfrHeaderNavigationMenu.vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  authenticated: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Object,
    default: () => ({}),
  },
  iamDisable: {
    type: Boolean,
    default: false,
  },
});

const expandedMenuId = ref(undefined);

// INFO
// Afficher/masquer le menu dont l'id est passé en paramètre
const toggle = (id) => {
  // ajoute/enleve des events pour fermer les menus au click/echap
  let expanded = id !== expandedMenuId.value;
  if (expanded) {
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onKeyDown);
  } else {
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onKeyDown);
  }

  if (id === expandedMenuId.value) {
    expandedMenuId.value = undefined;
    return;
  }
  expandedMenuId.value = id;
};
const handleElementClick = (el) => {
  if (el === document.getElementById(props.id)) {
    return;
  }

  if (!el?.parentNode) {
    toggle(expandedMenuId.value);
    return;
  }

  handleElementClick(el.parentNode);
};
const onDocumentClick = (e) => {
  handleElementClick(e.target);
};
const onKeyDown = (e) => {
  if (e.key === 'Escape') {
    toggle(expandedMenuId.value);
  }
};

onUnmounted(() => {
  // on s'assure d'enlever les events au unmount (même si c'est pas censé arriver)
  document.removeEventListener('click', onDocumentClick);
  document.removeEventListener('keydown', onKeyDown);
});
</script>

<template>
  <nav class="fr-nav" role="navigation" aria-label="Menu principal">
    <ul class="fr-nav__list">
      <CgfrHeaderNavigationMenu
        v-for="(item, idx) of items"
        :key="idx"
        :menu="item"
        :expanded-id="expandedMenuId"
        :authenticated="authenticated"
        :user="user"
        @toggle-id="toggle($event)"
      />
    </ul>
  </nav>
</template>

<script setup>
import { DsfrButton, DsfrCheckboxSet, DsfrSearchBar } from '@gouvminint/vue-dsfr';
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: 'Sélectionner des options',
  },
  legend: {
    type: String,
    default: 'Options disponibles',
  },
  hint: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
  validMessage: {
    type: String,
    default: '',
  },
  searchLabel: {
    type: String,
    default: 'Filtrer les options',
  },
  searchPlaceholder: {
    type: String,
    default: 'Rechercher',
  },
  openLabel: {
    type: String,
    default: 'Ouvrir la liste',
  },
  closeLabel: {
    type: String,
    default: 'Fermer la liste',
  },
  selectAllLabel: {
    type: String,
    default: 'Tout sélectionner',
  },
  deselectAllLabel: {
    type: String,
    default: 'Tout désélectionner',
  },
  emptySearchMessage: {
    type: String,
    default: 'Aucune option ne correspond à votre recherche.',
  },
  panelMaxHeight: {
    type: String,
    default: '20rem',
  },
});

const model = defineModel({
  type: Array,
  default: () => [],
});

const isOpen = ref(false);
const searchQuery = ref('');
const containerRef = ref(null);
// Référence du select déclencheur : sert d'ancre visuelle pour positionner le panel téléporté.
const triggerRef = ref(null);
// Référence du panel rendu dans <body> via Teleport.
const panelRef = ref(null);
// Styles calculés dynamiquement (position fixed + coordonnées écran).
const panelStyle = ref({});

const componentId = `cgfr-select-list-${Math.random().toString(36).slice(2, 11)}`;

const normalizedOptions = computed(() =>
  props.options.map((option, index) => {
    if (typeof option === 'object' && option !== null) {
      const fallbackValue = option.value ?? option.id ?? `${index}`;
      return {
        id: option.id || `${componentId}-option-${index}`,
        name: option.name || `${componentId}-option-${index}`,
        label: option.label ?? option.text ?? String(fallbackValue),
        value: option.value ?? fallbackValue,
        hint: option.hint,
        disabled: option.disabled,
      };
    }

    return {
      id: `${componentId}-option-${index}`,
      name: `${componentId}-option-${index}`,
      label: String(option),
      value: option,
      disabled: false,
    };
  })
);

const filteredOptions = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  if (!query) {
    return normalizedOptions.value;
  }

  return normalizedOptions.value.filter((option) => option.label.toLowerCase().includes(query));
});

const enabledOptionValues = computed(() =>
  normalizedOptions.value.filter((option) => !option.disabled).map((option) => option.value)
);

const areAllEnabledSelected = computed(() => {
  if (!enabledOptionValues.value.length) {
    return false;
  }

  return enabledOptionValues.value.every((value) => model.value.includes(value));
});

const selectToggleLabel = computed(() =>
  areAllEnabledSelected.value ? props.deselectAllLabel : props.selectAllLabel
);

const selectedCountLabel = computed(() => {
  const count = model.value.length;

  if (count === 0) {
    return props.label;
  }

  return `${props.label} (${count})`;
});

const toggleOpen = () => {
  if (props.disabled) {
    return;
  }

  isOpen.value = !isOpen.value;
};

const openList = () => {
  if (props.disabled) {
    return;
  }

  isOpen.value = true;
};

const closeList = () => {
  isOpen.value = false;
};

// Le panel est téléporté hors du composant (dans <body>),
// donc on le positionne manuellement à partir de la géométrie du select.
const updatePanelPosition = () => {
  if (!triggerRef.value) {
    return;
  }

  const rect = triggerRef.value.getBoundingClientRect();

  panelStyle.value = {
    position: 'fixed',
    top: `${rect.bottom}px`,
    left: `${rect.left}px`,
    zIndex: '10000',
    maxWidth: '400px',
  };
};

const toggleSelectAll = () => {
  if (areAllEnabledSelected.value) {
    model.value = [];
    return;
  }

  model.value = [...enabledOptionValues.value];
};

const handleClickOutside = (event) => {
  // Avec Teleport, le panel n'est plus enfant de containerRef,
  // il faut donc vérifier le clic à la fois sur le conteneur local et sur le panel téléporté.
  if (!containerRef.value && !panelRef.value) {
    return;
  }

  if (containerRef.value?.contains(event.target) || panelRef.value?.contains(event.target)) {
    return;
  }

  closeList();
};

const addOpenListeners = () => {
  // Recalcule la position quand la page bouge (scroll/resize)
  // et ferme la liste en clic extérieur.
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('resize', updatePanelPosition);
  window.addEventListener('scroll', updatePanelPosition, true);
};

const removeOpenListeners = () => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', updatePanelPosition);
  window.removeEventListener('scroll', updatePanelPosition, true);
};

watch(isOpen, async (value) => {
  if (value) {
    // Attend le rendu du panel téléporté, puis calcule sa position réelle à l'écran.
    await nextTick();
    updatePanelPosition();
    addOpenListeners();
    return;
  }

  removeOpenListeners();
});

onBeforeUnmount(() => {
  removeOpenListeners();
});
</script>

<template>
  <div ref="containerRef" style="position: relative">
    <div class="fr-select-group">
      <label class="fr-label" :for="`${componentId}-trigger`">
        {{ label }}
        <span v-if="hint" class="fr-hint-text">{{ hint }}</span>
      </label>

      <select
        ref="triggerRef"
        :id="`${componentId}-trigger`"
        class="fr-select"
        :disabled="disabled"
        :aria-expanded="isOpen"
        :aria-controls="`${componentId}-panel`"
        @mousedown.prevent="toggleOpen"
        @click.prevent
        @keydown.enter.prevent="openList"
        @keydown.space.prevent="openList"
      >
        <option :value="selectedCountLabel">{{ selectedCountLabel }}</option>
      </select>
      <span class="fr-sr-only">{{ isOpen ? closeLabel : openLabel }}</span>
    </div>

    <!--
      Teleport sort le panel du flux DOM local (ex: accordion avec overflow/scroll)
      pour éviter qu'il soit rogné par ses parents.
    -->
    <Teleport to="body">
      <div
        v-if="isOpen"
        :id="`${componentId}-panel`"
        ref="panelRef"
        class="fr-p-3v panel"
        :style="panelStyle"
      >
        <div class="fr-grid-row fr-mb-3v">
          <DsfrButton
            tertiary
            :disabled="disabled || !enabledOptionValues.length"
            @click="toggleSelectAll"
          >
            {{ selectToggleLabel }}
          </DsfrButton>
        </div>

        <DsfrSearchBar
          v-model="searchQuery"
          :label="searchLabel"
          :placeholder="searchPlaceholder"
          button-text=""
          :disabled="disabled"
          class="fr-mb-3v"
        />

        <div
          v-if="filteredOptions.length"
          :style="{ maxHeight: panelMaxHeight, overflowY: 'auto' }"
        >
          <DsfrCheckboxSet
            v-model="model"
            :legend="legend"
            :options="filteredOptions"
            :required="required"
            :disabled="disabled"
            :error-message="errorMessage"
            :valid-message="validMessage"
          />
        </div>

        <p v-else class="fr-text--sm fr-mt-2v">
          {{ emptySearchMessage }}
        </p>
      </div>
    </Teleport>
  </div>
</template>
<style scoped>
.panel {
  border: 1px solid var(--border-default-grey);
  background: var(--background-default-grey);
}
</style>
<script setup>
import { computed, ref, useAttrs } from 'vue';
import { DsfrButton, DsfrFooter } from '@gouvminint/vue-dsfr';
import { getFooterDefaults } from './CgfrFooter.defaults.js';

const props = defineProps({
  compact: {
    type: Boolean,
    default: false,
  },
  baseUrl: {
    type: String,
    default: undefined,
  },
});

let open = ref(false);

let openAttrs = {
  label: 'Plus d’informations',
  icon: 'fr-icon-arrow-up-s-line',
};

let closeAttrs = {
  label: 'Fermer',
  icon: 'fr-icon-close-line',
};

let openCloseAttrs = computed(() => {
  return open.value ? closeAttrs : openAttrs;
});

const toggleFooter = () => {
  open.value = !open.value;

  let top = open.value ? document.body.scrollHeight : 0;
  setTimeout(() => {
    window.scrollTo({
      left: 0,
      top,
      behavior: top !== 0 ? 'smooth' : 'auto',
    });
  }, 0);
};

const attrs = useAttrs();

const footerProps = computed(() => {
  const defaults = getFooterDefaults({
    baseUrl: props.baseUrl,
  });

  return {
    ...defaults,
    ...attrs,
  };
});
</script>

<template>
  <div class="cgfr-footer">
    <DsfrButton
      v-if="compact"
      class="btn-toggle"
      :icon-only="!open"
      :label="openCloseAttrs.label"
      :aria-label="!open ? openCloseAttrs.label : null"
      :icon="openCloseAttrs.icon"
      icon-right
      tertiary
      no-outline
      :aria-expanded="open"
      aria-controls="footer"
      @click="toggleFooter"
    />
    <DsfrFooter
      v-bind="footerProps"
      :class="{
        'fr-footer--compact': compact,
        'fr-footer--compacted': compact && !open,
      }"
    />
  </div>
</template>

<style lang="scss">
@use '../assets/mq' as *;

.cgfr-footer {
  position: relative;
}
.fr-footer__logo {
  max-height: 5.625rem;
}
.btn-toggle {
  position: absolute;
  right: 1rem;
  top: 0.5rem;
}

// le footer dans le header (mode mobile)
.fr-header .cgfr-footer .fr-modal {
  background: transparent;
}
@include max(lg) {
  .fr-header {
    .fr-footer {
      margin-top: 2rem;
      padding-top: 3rem;
      box-shadow: inset 0 1px 0 0 var(--border-default-grey);
    }
    .fr-footer .fr-container {
      padding: 0;
    }
    .fr-footer__partners-logos {
      flex-wrap: wrap;
      margin-right: 0;
    }
    .fr-footer__partners-main + .fr-footer__partners-sub {
      padding-left: 0;
    }
    .fr-footer__partners-sub > ul {
      flex: 1;
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
    }
    .fr-footer__partners-sub > ul > li {
      margin: 0;
    }
  }
}

// footer compact
.fr-footer--compact {
  padding-top: 4rem;
}
.fr-footer--compacted {
  padding-top: 0;
  padding-right: 4rem;
  height: 3.5rem;
  box-shadow: inset 0 2px 0 0 var(--border-plain-blue-france);

  .fr-footer__body,
  .fr-footer__partners,
  .fr-footer__bottom-copy {
    display: none;
  }
  .fr-footer__bottom {
    margin-top: 0;
    box-shadow: none;
  }
}
</style>

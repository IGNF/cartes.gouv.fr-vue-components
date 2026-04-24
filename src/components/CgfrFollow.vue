<script setup>
import { DsfrNewsLetter, DsfrFollow } from '@gouvminint/vue-dsfr';

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  newsletterUrl: {
    type: String,
    default: undefined,
  },
});

function openNewsletter() {
  window.open(props.newsletterUrl, '_blank');
}
</script>

<template>
  <DsfrFollow v-show="open">
    <div class="fr-col">
      <DsfrNewsLetter
        title="Inscrivez-vous à notre lettre d’information"
        description="Retrouvez toutes les actualités directement par courriel chaque trimestre."
        button-text="S'inscrire"
        placeholder="Votre email"
        only-callout
        @click="openNewsletter"
      />
    </div>
    <div class="fr-col">
      <h3 class="fr-h5 fr-follow__title">Communauté</h3>
      <p class="fr-text--sm fr-follow__desc">
        Rejoignez la communauté Géoplateforme - cartes.gouv.fr pour suivre les actualités et
        échanger avec les membres.
      </p>
      <a
        class="fr-link"
        target="_blank"
        href="https://www.expertises-territoires.fr/jcms/pl1_557493/fr/communaute-geoplateforme-et-cartes-gouv"
        >Rejoindre la communauté</a
      >
    </div>
  </DsfrFollow>
</template>

<style lang="scss">
@use '../assets/mq' as *;
</style>

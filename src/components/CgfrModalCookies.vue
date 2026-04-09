<script setup lang="js">
import { useModals } from '../composables/useModals';
import CgfrModal from './CgfrModal.vue';
import { DsfrConsent } from '@gouvminint/vue-dsfr';
import { ref } from 'vue';

let modals = useModals();

const refConsent = ref(null);

const url = '/donnees-personnelles';
</script>

<template>
  <CgfrModal v-if="modals.isOpen('cookies')" name="cookies" title="Panneau de gestion des cookies">
    <div id="my-consent-description">
      <h5>Eulerian Analytics</h5>
      En cliquant sur 'Tout accepter', vous consentez à l'utilisation des cookies pour nous aider à
      améliorer notre site web en collectant et en rapportant des informations sur votre utilisation
      grâce à Eulerian Analytics. <br />
      Si vous n'êtes pas d'accord, veuillez cliquer sur 'Tout refuser'. Votre expérience de
      navigation ne sera pas affectée.
    </div>
    <div>
      <p id="my-consent-buttons" ref="refConsent">
        <DsfrConsent @accept-all="onAcceptConsentAll()" @refuse-all="onRefuseConsentAll()">
          Préférences pour tous les services.
          <a :href="url">Données personnelles et cookies</a>
        </DsfrConsent>
      </p>
    </div>
  </CgfrModal>
</template>

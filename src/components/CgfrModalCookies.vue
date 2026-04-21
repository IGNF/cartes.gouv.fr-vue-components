<script setup lang="js">
import { useModals } from '../composables/useModals';
import CgfrModal from './CgfrModal.vue';
import { DsfrConsent } from '@gouvminint/vue-dsfr';
import { ref, onMounted } from 'vue';

const emit = defineEmits(['accept-consent', 'refuse-consent', 'close-consent']);

let modals = useModals();

const refConsent = ref(null);

const url = '/donnees-personnelles';

const onAcceptConsentAll = () => {
  emit('accept-consent');
  modals.close('cookies');
}
const onRefuseConsentAll = () => {
  emit('refuse-consent');
  modals.close('cookies');
}

onUpdated(() => {
  if (refConsent.value) {
    // HACK vuedsfr
    var btn = refConsent.value.querySelector('button[title="Refuser tous les cookies"]');
    console.log(btn)
    btn.classList.add("fr-btn--secondary");
    var ul = refConsent.value.querySelector('ul');
    ul.classList.replace("fr-btns-group--inline-reverse", "fr-btns-group--inline");
  }
})
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
      <p 
        id="my-consent-buttons"
        ref="refConsent"
      >
        <DsfrConsent 
          @accept-all="onAcceptConsentAll()" 
          @refuse-all="onRefuseConsentAll()"
        >
          Préférences pour tous les services.
          <a :href="url">Données personnelles et cookies</a>
        </DsfrConsent>
      </p>
    </div>
  </CgfrModal>
</template>

<style>
/* Surcharge sur le composant DsfrConsent : 
  > on n'affiche pas le bouton 'Personnaliser les cookies' 
*/
#my-consent-buttons button[title="Personnaliser les cookies"] {
  display: none;
}
#my-consent-description {
  padding-bottom: 1em;
}
/* Surcharge sur le composant DsfrConsent : 
  > on centre les boutons 
*/
.fr-btns-group--inline-sm.fr-btns-group--right.fr-btns-group--inline-reverse {
  justify-content: end;
}
</style>
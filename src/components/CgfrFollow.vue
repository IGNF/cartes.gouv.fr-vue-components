<script setup>
import { computed, ref, useAttrs } from 'vue';
import { DsfrNewsLetter } from '@gouvminint/vue-dsfr';

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  baseUrl: {
    type: String,
    default: undefined,
  },
});


</script>

<template>
  <DsfrFollow
  v-show="open">
    <DsfrNewsLetter
    title="Inscrivez-vous à notre lettre d’information"
    description="Retrouvez toutes les actualités directement par courriel chaque trimestre."
    buttonText="S'inscrire"
    placeholder="Votre email"
    onlyCallout
    />
    <div>
        <h3></h3>
    </div>
  </DsfrFollow>
</template>

<style lang="scss">
@use '../assets/mq' as *;

</style>

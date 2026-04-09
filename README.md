# cartes.gouv.fr-vue-components

Bibliothèque de composants Vue 3 réutilisables pour cartes.gouv.fr, basés sur [VueDSFR](https://vue-ds.fr/).

---

## Build

```bash
npm install
npm run build
# génère:
#   dist/index.js
#   dist/index.css
```

---

## Développement local (npm link)

### 1. Dans ce repo (lib)

```bash
npm install
npm link
npm run dev # watcher
```

### 2. Dans le repo consommateur

```bash
npm link cartes.gouv.fr-vue-components
```

---

## Intégration — Mode Vue 3

### 1. Installation

```bash
npm install git+https://github.com/IGNF/cartes.gouv.fr-vue-components # branche main
npm install @gouvminint/vue-dsfr @gouvfr/dsfr vue
```

### 2. Styles dans `main.js`

```js
import '@gouvfr/dsfr/dist/dsfr/dsfr.min.css';
import '@gouvminint/vue-dsfr/styles'
import 'cartes.gouv.fr-vue-components/dist/index.css';
```

### 3. Utilisation dans `.vue`

```vue
<script setup>
import { CgfrHeader, CgfrFooter } from 'cartes.gouv.fr-vue-components';
</script>

<template>
  <CgfrHeader badge-text="Explorer" compact />
  <main>...</main>
  <CgfrFooter :base-url="baseUrlExternal" />
</template>
```

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

## Tester les composants avec Storybook

- `npm run storybook` ouvre le catalogue sur [localhost:6006](http://localhost:6006). Choisissez un composant dans le menu, puis testez ses variantes ou modifiez ses propriétés dans l’onglet **Controls**.
- `npx playwright install chromium` installe le navigateur nécessaire aux tests automatisés (à faire une fois par environnement, puis après une mise à jour de Playwright si nécessaire).
- `npm run test-storybook` exécute les tests d’interaction dans Chromium, sans démarrer Storybook. Le menu d’une story permet de la tester seule ; en CLI, `npm run test-storybook -- CgfrSelectList` teste toutes les variantes de ce composant.
- `npm run build-storybook` génère un site statique dans `storybook-static/`.

Les dix composants (y compris les deux composants internes de navigation) sont testés depuis leurs sources. Storybook et ses tests ne sont ni exécutés par `npm run build` ni inclus dans le paquet npm publié.

---

## Déploiement du package

```bash
# crée la version
npm version [major|minor|patch] # modifie le package.json, crée un tag
npm version preminor --preid=beta # ex pour une version prerelease

# push avec le tag
git push origin <branche> --follow-tags

# le workflow github déclenche la création d'une release et la publication du package
```

----

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
npm install @ignf/cartes.gouv.fr-vue-components # (! registry GitHub)
npm install @gouvminint/vue-dsfr @gouvfr/dsfr vue
```

  > **Note:** Cette librairie est publiée sur le registry GitHub, il est donc nécessaire de configurer un Personal Access Token GitHub (PAT) et d’ajouter le scope `@ignf` dans votre `.npmrc`:
  > ```txt
  > @ignf:registry=https://npm.pkg.github.com
  > //npm.pkg.github.com/:_authToken=ghp_xxxxxxxxxxxxxxxxxx
  > ```


### 2. Styles dans `main.js`

```js
import '@gouvfr/dsfr/dist/dsfr/dsfr.min.css';
import '@gouvfr/dsfr/dist/utility/icons/icons.min.css';
import '@gouvminint/vue-dsfr/styles'
```

Le CSS de cette bibliothèque est chargé automatiquement avec l’import du package. Les icônes DSFR standard nécessitent toujours la feuille `utility/icons/icons.min.css`.

### 3. Utilisation dans `.vue`

```vue
<script setup>
import { CgfrHeader, CgfrFooter } from '@ignf/cartes.gouv.fr-vue-components';
</script>

<template>
  <CgfrHeader badge-text="Explorer" compact />
  <main>...</main>
  <CgfrFooter :base-url="baseUrlExternal" />
</template>
```

import { useBaseUrl, buildBaseUrl, getCurrentUrl } from '../composables/useBaseUrl';

export function getHeaderDefaults(options = {}) {
  const baseUrl = useBaseUrl(options.baseUrl);
  const iamDisable = options.iamDisable;

  let defaults = {
    serviceTitle: 'cartes.gouv.fr',
    serviceDescription: 'Le service public des cartes et données du territoire',
    logoText: ['république', 'française'],
    items: [
      {
        title: 'Aide',
        icon: 'ri-question-fill',
        links: [
          {
            text: 'Questions Fréquentes',
            to: buildBaseUrl(baseUrl, '/aide/fr/'),
            target: '_blank',
            icon: 'fr-icon-question-mark',
          },
          {
            text: "Guide d'utilisation",
            to: buildBaseUrl(
              baseUrl,
              '/aide/fr/guides-utilisateur/visualiseur-cartographique/generalites-visualiseur/'
            ),
            target: '_blank',
            icon: 'fr-icon-book-2-line',
          },
          {
            text: 'Nous contacter',
            to: buildBaseUrl(baseUrl, '/nous-ecrire'),
            target: '_blank',
            icon: 'fr-icon-mail-line',
          },
        ],
      },
      {
        title: 'Services',
        icon: 'ri-grid-fill',
        links: [
          {
            text: 'Explorer les cartes',
            to: buildBaseUrl(baseUrl, '/explorer-les-cartes'),
            icon: 'fr-icon-road-map-line',
          },
          {
            text: 'Rechercher une donnée',
            to: buildBaseUrl(baseUrl, '/rechercher-une-donnee/search'),
            icon: 'fr-icon-search-line',
          },
          {
            text: 'Publier une donnée',
            to: buildBaseUrl(baseUrl, '/publier-une-donnee'),
            icon: 'fr-icon-database-line',
          },
          {
            text: 'Découvrir cartes.gouv.fr ',
            to: buildBaseUrl(baseUrl, '/decouvrir'),
            target: '_blank',
            button: true,
          },
        ],
      },
    ],
  };

  if (!iamDisable) {
    defaults.items.push({
      title: 'Mon espace',
      icon: 'ri-account-circle-fill',
      connexionMenu: true,
      urls: {
        login: {
          text: 'Se connecter',
          url: getCurrentUrl(baseUrl),
        },
        logout: {
          text: 'Se déconnecter',
          url: getCurrentUrl(baseUrl),
        },
      },
      links: [
        {
          text: 'Tableau de bord',
          to: buildBaseUrl(baseUrl, '/tableau-de-bord'),
          icon: 'fr-icon-dashboard-3-line',
        },
        {
          text: 'Mon compte',
          to: buildBaseUrl(baseUrl, '/mon-compte'),
          icon: 'fr-icon-user-line',
        },
      ],
    });
  }

  return defaults;
}

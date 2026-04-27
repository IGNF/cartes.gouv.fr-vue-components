import { useModals } from '../composables/useModals';
import { useBaseUrl, buildBaseUrl } from '../composables/useBaseUrl';

const modals = useModals();

export function getFooterDefaults(options = {}) {
  const baseUrl = useBaseUrl(options.baseUrl);

  return {
    homeLink: buildBaseUrl(baseUrl, '/'),
    descText:
      'Cartes.gouv.fr est le service public des cartes et données du territoire français. Porté par l’IGN et ses partenaires, il offre à tous un accès à la référence de la cartographie publique et permet à chacun de créer, d’héberger et de publier ses propres données et représentations.',
    legalLink: buildBaseUrl(baseUrl, '/mentions-legales'),
    personalDataLink: buildBaseUrl(baseUrl, '/donnees-personnelles'),
    cookiesLink: buildBaseUrl(baseUrl, '/cookies'),
    beforeMandatoryLinks: [
      {
        label: 'Plan du site',
        href: buildBaseUrl(baseUrl, '/plan-du-site'),
      },
    ],
    mandatoryLinks: [
      {
        label: 'Accessibilité : partiellement conforme',
        href: buildBaseUrl(baseUrl, '/accessibilite'),
      },
      {
        label: 'Mentions légales',
        href: buildBaseUrl(baseUrl, '/mentions-legales'),
      },
      {
        label: 'Conditions générales d’utilisation',
        href: buildBaseUrl(baseUrl, '/cgu'),
      },
      {
        label: 'Données personnelles',
        href: buildBaseUrl(baseUrl, '/donnees-personnelles'),
      },
    ],
    afterMandatoryLinks: [
      {
        label: 'Gestion des cookies',
        button: true,
        to: '/',
        onclick: () => modals.open('cookies'),
      },
      {
        label: 'Paramètres d’affichage',
        button: true,
        class: 'fr-icon-theme-fill fr-link--icon-left',
        to: '/',
        onclick: () => modals.open('theme'),
      },
    ],
    ecosystemLinks: [
      { label: 'info.gouv.fr', href: 'https://info.gouv.fr' },
      { label: 'service-public.gouv.fr', href: 'https://service-public.gouv.fr' },
      { label: 'legifrance.gouv.fr', href: 'https://legifrance.gouv.fr' },
      { label: 'data.gouv.fr', href: 'https://data.gouv.fr' },
    ],
    partners: {
      title: 'Nos partenaires',
      mainPartner: {
        href: 'https://www.ign.fr/',
        logo: 'https://cartes.gouv.fr/img/footer/partenaires/ign.png',
        name: 'IGN',
      },
      subPartners: [
        {
          href: 'https://www.transformation.gouv.fr/',
          logo: 'https://cartes.gouv.fr/img/footer/partenaires/min_fp.jpg',
          name: 'Ministère de la transformation et de la fonction publiques',
        },
        {
          href: 'https://www.ecologie.gouv.fr/',
          logo: 'https://cartes.gouv.fr/img/footer/partenaires/min_ecologie.jpg',
          name: 'Ministère de la Transition Écologique et de la Cohésion des Territoires',
        },
        {
          href: 'https://cnig.gouv.fr/',
          logo: 'https://cartes.gouv.fr/img/footer/partenaires/logo-rf-cnig.jpg',
          name: 'Conseil national de l’information géolocalisée',
        },
      ],
    },
    newsletterUrl: buildBaseUrl(baseUrl, '/lettre-d-information'),
  };
}

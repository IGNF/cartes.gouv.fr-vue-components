/**
 * @description
 * Composable pour gérer la base URL des liens externes de l'entête et du pied de page
 * vers le projet 'cartes.gouv.fr'
 * (Ceci est en fonction de l'environnement de build / deploiement)
 *
 * @example
 * // en developpement, http://localhost:[port]
 * // en production, https://cartes.gouv.fr
 */

const DEFAULT_BASE_URL = 'https://cartes.gouv.fr';

export function buildBaseUrl(baseUrl, path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

export function getCurrentUrl(baseUrl) {
  if (typeof window !== 'undefined' && window.location?.href) {
    return window.location.href;
  }

  return buildBaseUrl(baseUrl || DEFAULT_BASE_URL, '/');
}

export function useBaseUrl(baseUrl) {
  return baseUrl || DEFAULT_BASE_URL;
}

export const helpMenu = {
  title: 'Aide',
  links: [{ text: 'Guide d’utilisation', to: '#guide', icon: 'fr-icon-book-2-line' }],
};

export const accountMenu = {
  title: 'Mon espace',
  connexionMenu: true,
  urls: { login: { text: 'Se connecter' }, logout: { text: 'Se déconnecter' } },
  links: [{ text: 'Mon compte', to: '#compte' }],
};

export const sampleUser = {
  first_name: 'Camille',
  last_name: 'Martin',
  email: 'camille.martin@example.com',
};

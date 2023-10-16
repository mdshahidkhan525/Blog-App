export const isUserLoggedIn = () => {
  const sessionData = localStorage.getItem('session');
  return sessionData !== null;
};

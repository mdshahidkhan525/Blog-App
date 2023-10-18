export const isUserLoggedIn = () => {
  const sessionData = localStorage.getItem('token');
  return sessionData !== null;
};

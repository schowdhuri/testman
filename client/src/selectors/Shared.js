export const isLoading = state => Boolean(state.isLoading.length);

export const getUsers = state => state.users.all;

export const isLoggedIn = state => Boolean(state.session.user);
export const getUser = state => state.session.user;

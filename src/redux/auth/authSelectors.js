export const getUserId = (state) => state.auth.id;
export const getUserEmail = (state) => state.auth.email;
export const getUserName = (state) => state.auth.name;
export const getUserPhoto = (state) => state.auth.photo;
export const getIsAuth = (state) => state.auth.isAuth;
export const getAuthLoading = (state) => state.auth.isLoading;
export const getAuthError = (state) => state.auth.error;

import { USER } from '../consts';

export const setUser = payload => ({
  type: USER.SET,
  payload,
});

export default {
  setUser,
};

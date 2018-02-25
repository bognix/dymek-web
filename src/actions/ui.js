import { UI } from '../consts';

export const showSnackbar = ({ color, message }) => ({
  type: UI.SHOW_SNACKBAR,
  payload: {
    message,
    color,
  },
});

export const hideSnackbar = () => ({
  type: UI.HIDE_SNACKBAR,
});

export default {
  showSnackbar,
  hideSnackbar,
};

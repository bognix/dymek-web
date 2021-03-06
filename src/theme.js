import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { red500, green500, yellow700 } from 'material-ui/styles/colors';


const theme = getMuiTheme();

export const COLORS = theme.palette;

export const COLOR_ERROR = red500;
export const COLOR_SUCCESS = green500;
export const COLOR_WARN = yellow700;

export default theme;

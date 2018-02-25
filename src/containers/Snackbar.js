import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { hideSnackbar } from '../actions/ui';


const mapStateToProps = ({ ui }) => ({
  open: ui.snackbar.visible,
  message: ui.snackbar.message,
  autoHideDuration: 4000,
  bodyStyle: {
    backgroundColor: ui.snackbar.color,
  },
});

const mapDistpatchToProps = dispatch => ({
  onRequestClose: () => dispatch(hideSnackbar()),
});

export default connect(mapStateToProps, mapDistpatchToProps)(Snackbar);

import { connect } from 'react-redux';
import MapView from '../components/MapView';
import { postMarker } from '../actions';

const mapStateToProps = ({ markers }) => ({
  markers: markers.list,
  canPost: markers.canPost,
});

const mapDispatchToProps = dispatch => ({
  addMarker: payload => dispatch(postMarker(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapView);

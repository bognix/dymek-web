import { connect } from 'react-redux';
import MapView from '../components/MapView';

const mapStateToProps = state => ({
  markers: state.markers.list,
});

export default connect(mapStateToProps)(MapView);

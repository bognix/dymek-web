import React, { Component } from 'react';

export default (WrappedComponent) => {
  class WithGeolocation extends Component {
    constructor(props) {
      super(props);

      // Poznań coordinates
      this.state = {
        longitude: 16.931992,
        latitude: 52.409538,
      };

      this.geoSuccess = this.geoSuccess.bind(this);
      this.geoError = this.geoError.bind(this);
    }
    componentWillMount() {
      navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError);
    }

    geoSuccess(position) {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }

    geoError() {
      this.setState({
        longitude: 16.931992,
        latitude: 52.409538,
      });
    }

    render() {
      return (
        <WrappedComponent
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          {...this.props}
        />
      );
    }
  }

  return WithGeolocation;
};

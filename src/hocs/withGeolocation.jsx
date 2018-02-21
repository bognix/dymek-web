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
    }
    componentWillMount() {
      navigator.geolocation.getCurrentPosition(this.geoSuccess);
    }

    geoSuccess(position) {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
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

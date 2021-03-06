/* eslint react/jsx-filename-extension: "off" */

import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';

import CreateMarkerMutation from '../mutations/CreateMarkerMutation';
import { COLOR_SUCCESS, COLOR_ERROR } from '../theme';

class AddMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false,
      error: false,
    };
    this.addMarker = this.addMarker.bind(this);
    this.onSnackbarClosed = this.onSnackbarClosed.bind(this);
  }

  onSnackbarClosed() {
    this.setState({
      saved: false,
      error: false,
    });
  }

  addMarker(payload) {
    return new Promise((resolve, reject) => {
      CreateMarkerMutation.commit(payload, (error) => {
        if (error) {
          this.setState({ error: true, saved: true });
          return reject();
        }
        return reject();
      }, () => {
        this.setState({ error: false, saved: true });
        return resolve();
      });
    });
  }

  render() {
    const { error, saved } = this.state;

    return (
      <div className={this.props.className}>
        {this.props.render({
          addMarker: this.addMarker, error, saved,
        })}
        <Snackbar
          open={saved}
          message={error ? 'Nie udało się zapisać zgłoszenia :( Spróbuj ponownie' : 'Dziękujemy za zgłoszenie!'}
          autoHideDuration={4000}
          bodyStyle={{
          backgroundColor: error ? COLOR_ERROR : COLOR_SUCCESS,
        }}
          onRequestClose={this.onSnackbarClosed}
        />
      </div>
    );
  }
}

export default AddMarker;

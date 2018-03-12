/* eslint react/jsx-filename-extension: "off" */

import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionDone from 'material-ui/svg-icons/action/done';
import Snackbar from 'material-ui/Snackbar';

import CreateMarkerMutation from '../mutations/CreateMarkerMutation';
import { COLOR_SUCCESS, COLORS, COLOR_ERROR } from '../theme';

const ButtonStyle = {
  position: 'absolute',
  bottom: '75px',
  right: '75px',
};

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
    CreateMarkerMutation.commit(payload, (error) => {
      if (error) {
        this.setState({ error: true, saved: true });
      }
    }, () => {
      this.setState({ error: false, saved: true });
    });
  }

  render() {
    const { latitude, longitude } = this.props;
    const canPost = true;

    const LabelStyle = {
      color: canPost ? COLORS.alternateTextColor : COLORS.alternateTextColor,
    };

    return (
      <div>
        <FlatButton
          label={canPost ? 'Zgłoś zanieczyszczenie w swojej okolicy' : 'Dziękujemy za zgłoszenie!'}
          labelPosition="after"
          backgroundColor={canPost ? COLORS.accent1Color : COLORS.primary1Color}
          hoverColor={canPost ? COLORS.primary1Color : COLORS.accent1Color}
          labelStyle={LabelStyle}
          style={ButtonStyle}
          onClick={() => this.addMarker({ lat: latitude, lng: longitude })}
          icon={canPost ? <ContentAdd /> : <ActionDone />}
          disabled={!canPost}
        />,
        <Snackbar
          open={this.state.saved}
          message={this.state.error ? 'Nie udało się zapisać zgłoszenia :( Spróbuj ponownie' : 'Dziękujemy za zgłoszenie!'}
          autoHideDuration={4000}
          bodyStyle={{
          backgroundColor: this.state.error ? COLOR_ERROR : COLOR_SUCCESS,
        }}
          onRequestClose={this.onSnackbarClosed}
        />
      </div>
    );
  }
}

export default AddMarker;

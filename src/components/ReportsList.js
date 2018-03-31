import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import { COLOR_ERROR, COLOR_SUCCESS, COLOR_WARN, COLORS } from '../theme';
import UpdateReportMutation from '../mutations/UpdateReportMutation';

const tableHeaders = ['#', 'data', 'adres', 'typ zgłoszenia', 'status', 'akcje'];

class ReportsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      saved: false,
      error: false,
    };

    this.onSnackbarClosed = this.onSnackbarClosed.bind(this);
  }

  onSnackbarClosed() {
    this.setState({
      saved: false,
      error: false,
    });
  }

  changeStatus(id, status) {
    UpdateReportMutation.commit({ status, id }, () => {
      this.setState({
        saved: true,
        error: false,
      });
    }, () => {
      this.setState({
        error: true,
        saved: true,
      });
    });
  }

  render() {
    const { reports } = this.props;
    const { saved, error } = this.state;

    return (
      <div>
        <Table fixedHeader={false} style={{ width: '100%', tableLayout: 'auto' }}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} fixedHeader={false}>
            <TableRow selectable={false}>
              {tableHeaders.map(header => (
                <TableHeaderColumn key={header}>{header}</TableHeaderColumn>
            ))}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {reports.map((item, index) => (
              <TableRow key={item.report.id} selectable={false}>
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>{item.report.createdAt}</TableRowColumn>
                <TableRowColumn>bla bla</TableRowColumn>
                <TableRowColumn>{item.report.type}</TableRowColumn>
                <TableRowColumn>{item.report.status}</TableRowColumn>
                <TableRowColumn>
                  <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 350 }}>
                    <RaisedButton
                      label="Rozwiąż"
                      backgroundColor={COLOR_SUCCESS}
                      labelColor={COLORS.alternateTextColor}
                      onClick={() => this.changeStatus(item.report.id, 'RESOLVED')}
                    />
                    <RaisedButton
                      label="Przyjmij"
                      backgroundColor={COLOR_WARN}
                      labelColor={COLORS.alternateTextColor}
                      onClick={() => this.changeStatus(item.report.id, 'ACKNOWLEDGED')}
                    />
                    <RaisedButton
                      label="Odrzuć"
                      backgroundColor={COLOR_ERROR}
                      labelColor={COLORS.alternateTextColor}
                      onClick={() => this.changeStatus(item.report.id, 'REJECTED')}
                    />
                  </div>
                </TableRowColumn>
              </TableRow>
          ))}
          </TableBody>
        </Table>
        <Snackbar
          open={saved}
          message={error ? 'Nie udało się zapisać zmiany :( Spróbuj ponownie' : 'Dziękujemy za ogarnięcie sprawy!'}
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

export default ReportsList;

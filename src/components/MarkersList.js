import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import { COLOR_ERROR, COLOR_SUCCESS, COLOR_WARN, COLORS } from '../theme';

const tableHeaders = ['#', 'data', 'adres', 'typ zgłoszenia', 'akcje'];

const MarkersList = ({ markers }) => (
  <Table fixedHeader={false} style={{ width: '100%', tableLayout: 'auto' }}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false} fixedHeader={false}>
      <TableRow selectable={false}>
        {tableHeaders.map(header => (
          <TableHeaderColumn key={header}>{header}</TableHeaderColumn>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      {markers.map((item, index) => (
        <TableRow key={item.marker.id} selectable={false}>
          <TableRowColumn>{index}</TableRowColumn>
          <TableRowColumn>{item.marker.createdAt}</TableRowColumn>
          <TableRowColumn>bla bla</TableRowColumn>
          <TableRowColumn>{item.marker.type}</TableRowColumn>
          <TableRowColumn>
            <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 350 }}>
              <RaisedButton
                label="Rozwiąż"
                backgroundColor={COLOR_SUCCESS}
                labelColor={COLORS.alternateTextColor}
              />
              <RaisedButton
                label="Przyjmij"
                backgroundColor={COLOR_WARN}
                labelColor={COLORS.alternateTextColor}
              />
              <RaisedButton
                label="Odrzuć"
                backgroundColor={COLOR_ERROR}
                labelColor={COLORS.alternateTextColor}
              />
            </div>
          </TableRowColumn>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default MarkersList;

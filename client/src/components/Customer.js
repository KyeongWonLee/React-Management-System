import React from 'react';
import {TableRow, TableCell} from '@material-ui/core';
import CustomerDelete from './CustomerDelete';

class Customer extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (<TableRow>
            <TableCell>{this.props.id}</TableCell>
            <TableCell>{<img src={this.props.image} alt='profile'/>}</TableCell>
        <TableCell>{this.props.name}</TableCell>
        <TableCell>{this.props.birthday}</TableCell>
        <TableCell>{this.props.gender}</TableCell>
        <TableCell>{this.props.job}</TableCell> 
        <TableCell><CustomerDelete id={this.props.id} sendPropsCallApi={this.props.sendPropsCallApi}/></TableCell>
        </TableRow>);
    }
}


export default Customer;
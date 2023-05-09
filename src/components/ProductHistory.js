import React, { Component } from 'react'
import { connect } from 'react-redux'
import Table from 'react-bootstrap/Table';
import {
    getBookingHistory,
    clearBookingHistory,
} from "../redux/actions/booking_history_action"

class ProductHistory extends Component {

    componentDidMount(){
        this.props.getBookingHistory(this.props.id);
    }

    componentWillUnmount(){
        this.props.clearBookingHistory();
    }

    render() {
        return (
            <>
        {
        this.props.list.length > 0 ? 
            <Table striped hover bordered>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Booked From</th>
                        <th>Booked Until</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.list.map(r => (
                        <tr>
                            <td>{r.user.name}</td>
                            <td>{r.bookedFrom}</td>
                            <td>{r.bookedUntil}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        : <p><b>This Product Has Not Been Booked Yet!</b></p>
        }
        </>
        
        )
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBookingHistory: (id) => dispatch(getBookingHistory(id)),
    clearBookingHistory: () => dispatch(clearBookingHistory()),
  };
};

const mapStateToProps = ({ bookingHistoryReducer }) => ({
    list: bookingHistoryReducer.list,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductHistory)
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';


class EditClient extends Component {

  onSubmit = e => {
    e.preventDefault();

    const { client, firestore, history } = this.props;

    const updateClient = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      phone: this.phone.value,
      balance: this.balance.value === '' ? 0 : this.balance.value
    }

    firestore.update({ collection: 'clients', doc: client.id }, updateClient)
      .then(history.push('/'));
  }

  render() {

    const { client } = this.props;
    const { disableBalanceOnEdit } = this.props.settings;

    if (client) {

      return (
        <Fragment>
          <div className="row">
            <div className="col-md-6 mb-2">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" /> {' '}
                Back To Dashboard
              </Link>
            </div>
            <div className="col-md-6 mb-2" />
          </div>

          <div className="card">
            <div className="card-header">Edit Client</div>
            <div className="card-body">
              <form onSubmit={ this.onSubmit }>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input 
                    type="text" 
                    className="form-control"
                    name="firstName"
                    minLength="2"
                    required
                    ref={ c => this.firstName = c } 
                    defaultValue={ client.firstName }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input 
                    type="text" 
                    className="form-control"
                    name="lastName"
                    minLength="2"
                    required
                    ref={ c => this.lastName = c } 
                    defaultValue={ client.lastName }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">E-Mail</label>
                  <input 
                    type="email" 
                    className="form-control"
                    name="email" 
                    ref={ c => this.email = c } 
                    defaultValue={ client.email }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input 
                    type="phone" 
                    className="form-control"
                    name="phone"
                    minLength="10"
                    required
                    ref={ c => this.phone = c } 
                    defaultValue={ client.phone }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="balance">Balance</label>
                  <input 
                    type="text" 
                    className="form-control"
                    name="balance"
                    ref={ c => this.balance = c } 
                    defaultValue={ client.balance }
                    disabled={ disableBalanceOnEdit }
                  />
                </div>

                <input type="submit" value="Submit" className="btn btn-primary btn-block" />

              </form>
            </div>
          </div>
        </Fragment>
      )
    } else {

      return <Spinner />
    } 
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  client: PropTypes.object,
  settings: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [{ collection: 'clients', storeAs: 'client', doc: props.match.params.id }]),
  connect(({ firestore: { ordered }, settings }, props) => ({
    client: ordered.client && ordered.client[0],
    settings
  }))
)(EditClient);


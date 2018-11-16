import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit } from '../../actions/settingsActions';

class Settings extends Component {

  allowRegistrationChange = () => {
    const { setAllowRegistration } = this.props;
    
    setAllowRegistration();
  }

  disableBalanceOnAddChange = () => {
    const { setDisableBalanceOnAdd } = this.props;

    setDisableBalanceOnAdd();
  }

  disableBalanceOnEditChange = () => {
    const { setDisableBalanceOnEdit } = this.props;

    setDisableBalanceOnEdit();
  }

  render() {

    const { allowRegistration, disableBalanceOnAdd, disableBalanceOnEdit } = this.props.settings;

    return (
      <div>
        <div className="row">
          <div className="col-md-6 mb-2">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> {' '}
              Back to Dashboard
            </Link>
          </div>
          <div className="col-md-6 mb-2" />
        </div>

        <div className="card">
          <div className="card-header">Edit Settings</div>
          <div className="card-body">
            <form>
              
              <div className="form-check">
                <input 
                  type="checkbox" 
                  name="allowRegistration" 
                  className="form-check-input"
                  checked={!!allowRegistration}
                  onChange={this.allowRegistrationChange}
                />
                <label className="form-check-label" htmlFor="allowRegistration">Allow Registration</label> {' '}
              </div>

              <div className="form-check">
                <input 
                  type="checkbox" 
                  name="allowRegistration" 
                  className="form-check-input"
                  checked={!!disableBalanceOnAdd}
                  onChange={this.disableBalanceOnAddChange}
                />
                <label className="form-check-label" htmlFor="allowRegistration">Disable Balance On Add</label> {' '}  
              </div>

              <div className="form-check">
                <input 
                  type="checkbox" 
                  name="allowRegistration" 
                  className="form-check-input"
                  checked={!!disableBalanceOnEdit}
                  onChange={this.disableBalanceOnEditChange}
                />
                <label className="form-check-label" htmlFor="allowRegistration">Disable Balance On Edit</label> {' '}
              </div>



            </form>
          </div>
        </div>
      </div>
    )
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setAllowRegistration: PropTypes.func.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired
};

export default connect((state, props) => ({
  auth: state.firebase.auth,
  settings: state.settings
}), { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit})(Settings);

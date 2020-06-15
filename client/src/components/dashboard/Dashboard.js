import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Spinner from "../layout/spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({ getCurrentProfile, auth, profile, deleteAccount }) => {
  // The function passed to useEffect will run after the render is committed to the screen. Like a combo of DidMount, WillMount, and ... another one
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return profile.loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome, {auth.user && auth.user.name}
      </p>
      {profile.profile !== null ? (
        //^ TODO: IF BROKEN, THEN REMOVE THE '.profile' part in line above
        // User has a profile
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.profile.experience} />
          <Education education={profile.profile.education} />

          <div className="my-2">
            {" "}
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus"></i>Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        // User does NOT have a profile
        <Fragment>
          <p>You have not yet set up a profile</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);

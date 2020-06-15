import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/spinner";
import ProfileItem from "./ProfileItem";

import { getAllProfiles } from "../../actions/profile";

const Profiles = ({
  getAllProfiles,
  profile: { loading },
  profile,
  profiles,
}) => {
  useEffect(() => {
    getAllProfiles();
    console.log(`profile is  + ${profile.profiles}`);
  }, [loading]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} another={profile} />
              ))
            ) : (
              <h4> No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  profiles: state.profile.profiles,
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);

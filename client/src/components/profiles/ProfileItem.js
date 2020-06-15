import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllProfiles } from "../../actions/profile";

const ProfileItem = (props) => {
  useEffect(() => {
    getAllProfiles();
    console.log(props.profile);
  }, []);

  return (
    <Fragment>
      <div>test</div>
      <div>{props.profile.profiles[0].company}</div>
    </Fragment>

    // // <div className="profile bg-light">
    // //   <img src={avatar} alt="" className="round-img" />
    // //   <div>
    // //     <h2>{name}</h2>
    // //     <p>
    // //       {status} {company && <span>at {company}</span>}
    // //     </p>
    // //     <p className="my-1">{location && <span>{location}</span>}</p>
    // //     <Link to={`/profile/${_id}`} className="btn btn-primary">
    // //       View Profile
    // //     </Link>
    // //   </div>

    // // {
    // /* <ul>
    //     {skills.slice(0, 4).map((skill, index) => (
    //       <li key={index} className="text-primary">
    //         <li className="fas fa-check"></li> {skill}
    //       </li>
    //     ))}
    //   </ul> */
    // // }
    // // </div>
  );
};

ProfileItem.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,

  profile: PropTypes.object.isRequired,
  profiles: PropTypes.array.isRequired,
  another: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  profiles: state.profile.profiles,
});

export default connect(mapStateToProps, { getAllProfiles })(ProfileItem);

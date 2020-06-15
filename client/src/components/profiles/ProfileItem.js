import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({
  this_profile: {
    location,
    skills,
    company,
    status,
    user: { _id, name, avatar },
  },
}) => {
  console.log(_id);

  return (
    <Fragment>
      <div className="profile bg-light">
        <img src={avatar} alt="..." className="round-img" />
        <div>
          <h2>{name}</h2>
          <p>
            {status} {company && <span>at {company}</span>}
          </p>
          <p className="my-1">{location && <span>{location}</span>}</p>
          <Link to={`/profile/${_id}`} className="btn btn-primary">
            View Profile
          </Link>
        </div>
        {
          <ul>
            {skills.slice(0, 4).map((skill, index) => (
              <li key={index} className="text-primary">
                <li className="fas fa-check"></li> {skill}
              </li>
            ))}
          </ul>
        }
      </div>
    </Fragment>
  );
};

ProfileItem.propTypes = {
  this_profile: PropTypes.object.isRequired,
};

export default ProfileItem;

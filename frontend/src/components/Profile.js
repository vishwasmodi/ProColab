import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dp from "../static/avatar.png";
import dataActions from "../actions/dataActions";
import ProfileProjectCard from "./ProfileProjectCard";

const Profile = (username) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dataActions.getProfile(username.username))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);
  const profile = useSelector((state) => state.getprofile.profile);
  console.log(profile);
  return (
    <div>
      <div class="h-56 bg-gradient-to-r from-sky-500 to-indigo-500"></div>
      <img class="z-10 absolute top-28 left-20 h-60 " src={dp} alt="" />
      <div class="absolute top-24 left-12 h-80 w-80 rounded-full border-r-4 border-slate-500 shadow-xl"></div>

      {!loading ? (
        <div>
          <div>
            <div class="">{profile.user.name}</div>
            <div class="">{profile.user.username}</div>
            <div class="">{profile.user.email}</div>
          </div>
          <div>
            {profile.ownProjects.map((project) => (
              <ProfileProjectCard
                id={project._id}
                name={project.name}
                description={project.description}
                githubRepo={project.githubRepo}
                techStack={project.techStack}
                colaborators={project.colaborators}
                votes={project.votes}
                colaboratorsLimit={project.colaboratorsLimit}
                user={project.user}
                userName={project.userName}
              />
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Profile;

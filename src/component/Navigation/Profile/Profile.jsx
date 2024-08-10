import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import axiosinstance from '../../../Hoc/Axios';

function Profile() {
  const [profile, setProfile] = useState(null);

  const getdata = () => {
    try {
      axiosinstance
        .get('user/profile')
        .then((res) => {
          console.log(res);
          setProfile(res.data.userData); // corrected to setProfile with userData directly
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  if (!profile) {
    return (
      <div>
        <span className="visually-hidden spinner-border" role="status">
          <ClipLoader
            color='#CBDCD9'
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </span>
      </div>
    );
  }

  return (
    <div className={`flex  justify-evenly text-xs mx-auto bg-transparent w-fit rounded-lg`}>
      <img
        src={`${import.meta.env.VITE_API_URL}/public/${profile.image}`} // corrected the image URL
        alt="Profile"
        className="h-7 w-7 mt-2 rounded-full "
      />
      <div className='lg:flex lg:flex-col  hidden pt-5 font-semibold px-1'>
        <div className="text-white w-fit flex flex-row text-sm  ">
          <p className='text-lg -mt-4 ml-2'>{profile.firstName}</p>
         
        </div>
      </div>
    </div>
  );
}

export default Profile;

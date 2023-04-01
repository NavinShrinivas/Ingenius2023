// component to disple username
import { useRouter } from 'next/router';
import { useIsMount } from '@/components/mount';
import { useEffect, useState } from 'react';
import axios from 'axios';
const User = () => {
    const router = useRouter();
    const { user } = router.query;
    const [userName, setUserName] = useState("");
    const [userData, setUserData] = useState(null);
    const isMount = useIsMount();
    const handleCheckboxChange = async (event) => {
        const { name, checked } = event.target;
        console.log('name', name);
        console.log('checked', checked);
        setUserData(prevUserData => ({
            ...prevUserData,
            [name]: checked
          }));
        try {
          await axios.post(`NavinsBackend/api/${name}`, { user, key: name, value: checked });
        } catch (error) {
          console.error(error);
        }
      };
    useEffect(() => {
      if (isMount) {
        
        const fetchUserData = async () => {
            try {
              const res = await axios.post(`https://anythingusers.free.beeceptor.com/`, { user });
              setUserData(res.data.data);
              setUserName(res.data.user);
              console.log('res.data', res.data);
            } catch (error) {
              console.error(error);
            }
          };
          fetchUserData();
      } else {
        console.log('Subsequent Render');
      }
    }, [user, isMount]);
    const renderCheckboxes = () => {
        if (!userData) {
          return <div>Loading...</div>;
        }
        return Object.keys(userData).map(key => {
          return (

            <div key={key}>
              <input
                type="checkbox"
                name={key}
                id={key}
                checked={userData[key]}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={key}>{key}</label>
            </div>
          );
        });
      };
    return ( <div>
       {userData &&<h1>{userName}</h1>}
        
        {renderCheckboxes()}
    </div>)
    }
    export default User;
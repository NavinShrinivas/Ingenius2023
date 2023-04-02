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

            <div 
            className=''
            key={key}>
              <input
                type="checkbox"
                name={key}
                id={key}
                checked={userData[key]}
                onChange={handleCheckboxChange}
                className='w-4 h-4 accent-pink-500 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              <label 
              className='mx-4 px-4'
              htmlFor={key}>{key}</label>
            </div>
          );
        });
      };
    return ( <div
        className=' container flex h-screen flex-col items-center justify-center '
    >
      <div
      className='boxOfchecksAndName flex flex-col items-center justify-center bg-slate-400 shadow-lg gap-5 p-16 '
      >
      <div
       className='text-4xl font-mono'
       >
          {userData &&<h1>{userName}</h1>}
       </div>
       
        <div
        className='flex font-mono  flex-col text-xl gap-4 '
        >
          {renderCheckboxes()}
        </div>
      </div>
      
        
    </div>)
    }
    export default User;
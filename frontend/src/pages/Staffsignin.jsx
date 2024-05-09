import { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux' ;
import { signInStart ,signInSuccess ,signInFailure} from '../redux/user/userSlice' ;

import b1 from '../Image/s5.jpg';


const styles = {
    backgroundImage: `url(${b1})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '500px',
  };

export default function Staffsignin()  {
    const [formData,setFormData] = useState({})
    const{loading, error}=useSelector((state)=>state.user);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleChange = (e)=>{
      setFormData(
        {
          ...formData,
          [e.target.id]: e.target.value,
      });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
          dispatch(signInStart());
          const res = await fetch('/backend/auth/signin',
          {
            method:'POST',
            headers: {
            'Content-Type':'application/json',
            },
            body: JSON.stringify(formData),
          });
        const data = await res.json();
        console.log(data);
        if(data.success == false){
          dispatch(signInFailure(data.message));
          return;
  
        }
        dispatch(signInSuccess(data));
        const username = formData.username;
        if(username == 'admin@gmail.com'){//password = 12345
          navigate('/admin');
        }else if(username == 'supervisor@gmail.com'){//password = 12345
            navigate('/progresssupervisor');

        }
      }catch(error){
        dispatch(signInFailure(error.message));
  
  
      }
      
      
    };
    
    return (
      
      <div style={styles}>
        <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7 text-yellow-700'> Employee </h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input type="email" placeholder='username'className='border p-3 bg-slate-300  rounded-lg' id='username'onChange={handleChange}/>
          <input type="password" placeholder='password'className='border bg-slate-300  p-3 rounded-lg' id='password'onChange={handleChange}/>
          <button disabled={loading} className=' font-bold bg-blue-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ?'Loading...':'Sign in'}</button>
          
        </form>
        
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
      </div>
    )
  }
  
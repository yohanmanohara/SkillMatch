"use client";
import Image from 'next/image';
import React from 'react';
import HeroImage from "../../../../public/HeroImage.png";
import Button from '@mui/material/Button';
import "../../../styles/globals.css";
import GoogleIcon from '@/components/Icons/GoogleIcon';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showSignIn, setShowSignIn] = React.useState(true);
  const [showForgetPassword, setShowForgetPassword] = React.useState(false);
  const [name, setName] = React.useState('');
  const [verificationCode, setverificationCode] = React.useState('');
  const [conPassword, setConPassword] = React.useState('');
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleToggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const haddleforgot = async (e:any) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
    } catch (error) {
      console.log('Error sending email');
     
    }
  };

  const haddlecode = async (e:any) =>
    {
      e.preventDefault();
      if(password !== conPassword){
        alert('passwords do not match');
        return;
      };

      try {
        const response = await fetch('/api/reset', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email,verificationCode, password }),
        });
    
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log('Error resetting password');
      }

    }





  const haddlesignup = async (e:any) => {
    e.preventDefault();
    if(password !== conPassword){
      alert('passwords do not match');
      return;
    };
  
    try{
     const res= await fetch ('/api/register', {	
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name , email, password, setConPassword}),
      }
      );
  
      if (res.ok)
        {
          setName('');
          setEmail('');
          setPassword('');
          setConPassword('');
          router.push('/employer/hiring/jobs');
          
          
         
        }
        else{
          setName('');
          setEmail('');
          setPassword('');
          setConPassword('');
          
          console.log('not registers  ');
          alert('Already have account');
        }
  
    }catch (error){
  
      console.log('An error occured',error);
      alert('An error occured');
    }
  
  
  
  }
  
  


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        router.push('/employee/overview');
        console.log('Post job is true');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleForm = () => {
    setShowSignIn(!showSignIn);
  };

  const handleForgetPassword = () => {
    setShowForgetPassword(!showForgetPassword);
  };



  const handleSignInWithGoogle = async () => {
    try {
      const result = await signIn('google', {
        callbackUrl: '/employer/hiring/jobs',
        
      });

    
    } catch (error) {
      console.error('Error signing in with Google:', error);
      // Handle any other errors that may occur during sign-in
    }
  };



  return (
    <div className='flex items-start justify-center gap-40'>
      <div>
        <div className='text-8xl font-bold'>Your Step into a new career</div>
        <Button
          sx={{
            border: '2px solid black',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            height: '50px',
            width: '470px',
            color: '#606060',
            fontFamily: 'Inter',
            '&:hover': {
              borderColor: 'blue',
              color: 'blue',
            },
          }}
          onClick={handleSignInWithGoogle }
         
        >
          <div style={{ display: 'flex', flexDirection: 'row', gap: '3px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '160px' }}>
              <div>
                <span style={{ fontWeight: 'bold', textTransform: 'lowercase' }}>Continue as </span>
                <span style={{ textTransform: 'lowercase' }}>User@gmail.com</span>
              </div>
              <div>
                <GoogleIcon />
              </div>
            </div>
          </div>
        </Button>
        <div>
          <div className='font-space-mono w-[380px]'>
            By clicking Continue to join or Sign In, you agree to Recruitwise’s
            <span className='text-secondary-600'> User Agreement, Privacy Policy</span> and
            <span className='text-secondary-600'> Cookie Policy</span>
          </div>
          <div className='flex gap-3 text-[20px] font-bold'>
            <hr style={{ borderTop: '1px solid #000000', margin: '15px', width: '221px' }} />
            or
            <hr style={{ borderTop: '1px solid #000000', margin: '15px 0', width: '221px' }} />
          </div>
          {!showForgetPassword ? (
            <div>
              {showSignIn ? (
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <div>
                      <FormLabel sx={{ fontWeight: 'bold' }}>Email</FormLabel>
                      <Input
                        placeholder="abc@gmail.com"
                        sx={{
                          width: '470px',
                          height: '42px',
                          borderRadius: '30px',
                          borderColor: 'black',
                          border: '2px solid black',
                        }}
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <FormLabel sx={{ fontWeight: 'bold' }}>Password</FormLabel>
                      <Input
                        placeholder="xxxxxxxxxxxxxxxxx"
                        sx={{
                          width: '470px',
                          borderRadius: '30px',
                          height: '42px',
                          borderColor: 'black',
                          border: '2px solid black',
                        }}
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </FormControl>
                  <div>
                    <span className='font-space-mono font-bold'>
                      <span className='text-[#2421C4]' onClick={handleForgetPassword}>
                        Forgot Password?
                      </span>
                    </span>
                  </div>
                  <div>
                    <Button
                      sx={{
                        backgroundColor: '#2421C4',
                        color: 'white',
                        borderRadius: '15px',
                        width: '154px',
                        height: '55px',
                        '&:hover': {
                          borderColor: 'blue',
                          color: 'white',
                          backgroundColor: '#303f9f',
                        },
                        fontSize: '17px',
                        fontWeight: 'bold',
                      }}
                      type="submit"
                    >
                      Sign In
                    </Button>
                  </div>
                  <span className='font-space-mono font-bold'>
                    New to RECRUITWISE?{' '}
                    <span className='text-[#2421C4]' onClick={handleToggleForm}>
                      Sign Up
                    </span>
                  </span>
                </form>
              ) : (
                <form onSubmit={haddlesignup}>
                  <FormControl>
                    <div>
                      <FormLabel sx={{ fontWeight: 'bold' }}>Name</FormLabel>
                      <Input
                        placeholder="abc qwe"
                        sx={{
                          width: '470px',
                          height: '42px',
                          borderRadius: '30px',
                          borderColor: 'black',
                          border: '2px solid black',
                        }}
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <FormLabel sx={{ fontWeight: 'bold' }}> Email</FormLabel>
                      <Input
                        placeholder="abc@gmail.com"
                        sx={{
                          width: '470px',
                          height: '42px',
                          borderRadius: '30px',
                          borderColor: 'black',
                          border: '2px solid black',
                        }}
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <FormLabel sx={{ fontWeight: 'bold' }}>Password</FormLabel>
                      <Input
                        placeholder="xxxxxxxxxxxxxxxxx"
                        sx={{
                          width: '470px',
                          borderRadius: '30px',
                          height: '42px',
                          borderColor: 'black',
                          border: '2px solid black',
                        }}
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <FormLabel sx={{ fontWeight: 'bold' }}>Confirm Password</FormLabel>
                      <Input
                        placeholder="xxxxxxxxxxxxxxxxx"
                        sx={{
                          width: '470px',
                          borderRadius: '30px',
                          height: '42px',
                          borderColor: 'black',
                          border: '2px solid black',
                        }}
                        type='password'
                        value={conPassword}
                        onChange={(e) => setConPassword(e.target.value)}
                        required
                      />
                    </div>
                  </FormControl>
                  <div>
                    <span className='font-space-mono font-bold'>
                      <span className='text-[#2421C4]' onClick={handleForgetPassword}>
                        Forgot Password?
                      </span>
                    </span>
                  </div>
                  <div>
                    <Button
                      sx={{
                        backgroundColor: '#2421C4',
                        color: 'white',
                        borderRadius: '15px',
                        width: '154px',
                        height: '55px',
                        '&:hover': {
                          borderColor: 'blue',
                          color: 'white',
                          backgroundColor: '#303f9f',
                        },
                        fontSize: '17px',
                        fontWeight: 'bold',
                      }}
                      type="submit"
                    >
                      Sign Up
                    </Button>
                  </div>
                  <span className='font-space-mono font-bold'>
                    New to RECRUITWISE?{' '}
                    <span className='text-[#2421C4]' onClick={handleToggleForm}>
                      Sign In
                    </span>
                  </span>
                </form>
              )}
            </div>
          ) : (
            <div>
                <form onSubmit={haddlecode}>
                   <FormControl>
                   <FormLabel sx={{ fontWeight: 'bold' }}>Enter the Email</FormLabel>
                   <div className='flex gap-4'>
                      <Input
                        placeholder="abc@gmail.com"
                        sx={{
                          width: '350px',
                          borderRadius: '30px',
                          height: '42px',
                          borderColor: 'black',
                          border: '2px solid black',
                        }}
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                       <Button
                      sx={{
                        backgroundColor: '#2421C4',
                        color: 'white',
                        borderRadius: '15px',
                        width: '103px',
                        height: '43px',
                        '&:hover': {
                          borderColor: 'blue',
                          color: 'white',
                          backgroundColor: '#303f9f',
                        },
                        fontSize: '10px',
                        fontWeight: 'bold',
                      }}
                     
                      onClick={haddleforgot}
                    >
                      Send the Code
                    </Button >
                    </div>
                   
                     

                      
                    <FormLabel sx={{ fontWeight: 'bold' }}>Enter the code</FormLabel>
                    <Input
                        placeholder="3092"
                        sx={{
                          width: '350px',
                          borderRadius: '30px',
                          height: '42px',
                          borderColor: 'black',
                          border: '2px solid black',
                        }}
                        type='text'
                        value={verificationCode}
                        onChange={(e) => setverificationCode(e.target.value)}
                        required
                      />
                      <FormLabel sx={{ fontWeight: 'bold' }}>Password</FormLabel>
                      <Input
                        placeholder="xxxxxxxxxxxxxxxxx"
                        sx={{
                          width: '470px',
                          borderRadius: '30px',
                          height: '42px',
                          borderColor: 'black',
                          border: '2px solid black',
                        }}
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                     <FormLabel sx={{ fontWeight: 'bold' }}>Confirm Password</FormLabel>
                      <Input
                        placeholder="xxxxxxxxxxxxxxxxx"
                        sx={{
                          width: '470px',
                          borderRadius: '30px',
                          height: '42px',
                          borderColor: 'black',
                          border: '2px solid black',
                        }}
                        type='password'
                        value={conPassword}
                        onChange={(e) => setConPassword(e.target.value)}
                        required
                      />

                        <div className='flex flex-col'>
                        <span className='text-[#2421C4]' onClick={handleForgetPassword}>
                        Alredy have account?
                      </span>
                       <Button
                      sx={{
                        backgroundColor: '#2421C4',
                        color: 'white',
                        borderRadius: '15px',
                        width: '157px',
                        height: '53px',
                        '&:hover': {
                          borderColor: 'blue',
                          color: 'white',
                          backgroundColor: '#303f9f',
                        },
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                      type="submit"
                    >
                      Change Password
                    </Button>
                    
                      </div>












                   </FormControl>



                </form>







                </div>

            
          )}


        </div>
      </div>
      <div>
        <Image src={HeroImage} alt='Hero Image' />
      </div>
    </div>
  );
};

export default Hero;

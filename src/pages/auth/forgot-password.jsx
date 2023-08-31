import { Button, Input, Spacer, Image, Link, Spinner } from '@nextui-org/react'
import React, { useState } from 'react'
import Logo from "../../assets/anemlogo.png"

export default function ForgotPassword() {

  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [msg, setMsg] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
    };

    if (email === "") {
      return;
    }

    try {
      setIsLoading(true)
      const response = await fetch('http://localhost:4000/user/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setMsg(true)
      }

      if (!response.ok) {
        setError(true)
        setTimeout(() => { setError(false) }, 5000)
      }

    } catch (error) {
      setError(true)
      setTimeout(() => { setError(false) }, 5000)
    } finally {
      setIsLoading(false)
    }
  };

  const MailIcon = () => {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 24 24"
        width="1em"
      >
        <path
          d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='w-full flex flex-col justify-start p-24'>
        <h1 className='text-[#101739] text-2xl'>Mot de passe oublié</h1>
        {
          error &&
          <div className="flex items-center p-4 text-sm mt-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Email non existant!</span>
            </div>
          </div>
        }
        {
          msg &&
          <div className="flex items-center p-4 text-sm mt-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Votre nouveau mot de passe est envoyé à votre boite email</span>
            </div>
          </div>
        }
        <Spacer y={8} />
        <Input
          type="email"
          placeholder="Email"
          variant="bordered"
          isRequired
          size='lg'
          endContent={
            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          onChange={(e) => setEmail(e.target.value)}
        />
        <Spacer y={8} />
        <div className='flex w-full justify-between items-center'>
          <Link href="/auth/login">
            <p className='text-primary underline cursor-pointer'>connextion ?</p>
          </Link>
          {
            isLoading ?
              <Spinner />
              :
              <Button className="text-white font-bold bg-[#F8AF28] px-16 py-6" onClick={handleSubmit}>
                Récupérer
              </Button>
          }
        </div>
      </div>
      <div className='w-full flex flex-col bg-[#F8AF28] h-full justify-center p-24'>
        <Image
          src={Logo}
          alt="logo"
          width={70}
          quality={100}
        />
        <Spacer y={12} />
        <h1 className='text-[#101739] text-5xl'>Inscrivez-vous sur <span className='text-white'>Shakawina</span> Plateform</h1>
        <Spacer y={12} />
        <p>Shakawina Platform, plateforme d'agence national de l'emploi. Vous pouvez désormais soumettre en ligne vos réclamations et les suivre</p>
      </div>
    </div>
  )
}

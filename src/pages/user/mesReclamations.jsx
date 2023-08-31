import React, { useEffect, useState } from 'react'
import ListReclamation from '../../components/listReclamation'
import { Button, Link } from '@nextui-org/react'
import { useAuthContext } from '../../context/authContext'
import CustomNavbar from '../../components/shared/navbar'
import Footer from '../../components/shared/footer'

function UserReclamations() {
  const { user } = useAuthContext()
  const [complaints, setComplaints] = useState(null)

  useEffect(() => {
    const getComplains = async () => {
      try {
        const response = await fetch("http://localhost:4000/complaint/user/" + user.plaignant.id);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setComplaints(data)
      } catch (error) {
        console.error('Error fetching user blogs:', error);
        throw error;
      }
    }
    if (user) {
      getComplains()
    }
  }, [user])




  return (
    <main>
      <CustomNavbar />
      {user ?
        <div className='flex h-full p-24 flex-col w-full gap-y-8'>
          <div className='flex justify-between'>
            <div className='flex items-center gap-x-4'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clipRule="evenodd" />
              </svg>
              <h1 className='text-3xl'>Mes doléances</h1>
            </div>
            <Link href="/form">
              <Button className="text-white font-bold bg-black" >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                </svg>
                Nouvelle réclamation
              </Button>
            </Link>
          </div>
          {
            complaints != null &&
            complaints.map((complaint) => {
              return (
                <ListReclamation complaint={complaint} key={complaint.id}/>
              )
            })
          }
        </div> :
        <div className='flex justify-center items-center w-full h-screen'>Se connecter pour voir vos réclamations</div>
      }
      <Footer />
    </main>
  )
}

export default UserReclamations
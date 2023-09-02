import React from 'react'
import logo from '../../assets/anemlogoblanc.PNG'
import { Image, Spacer, Link } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/authContext'

const Sidebar = () => {

    const { dispatch } = useAuthContext()
    const navigate = useNavigate()
    // logout user
    const handleLogout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({ type: 'LOGOUT' })

        navigate("/admin/login")
    }

    return (
        <div className="h-full sticky top-0 left-0 ">
            <div className="h-full px-8 py-4 overflow-y-auto flex flex-col">
                <Spacer y={16} />
                <div className="flex justify-center">
                    <Image src={logo} width={70} alt='logo'></Image>
                </div>
                <Spacer y={16} />
                <div className=" font-medium flex justify-between flex-col h-full">
                    <div className='space-y-3'>
                        <div>
                            <Link href="/admin/dashboard">
                                <div className="flex items-center p-2 text-white rounded-lg cursor-pointer hover:bg-white hover:text-gray-900">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                                        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                                    </svg>
                                    <span className="ml-3">Dashboard</span>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link href="/admin/profile">
                                <div className="flex items-center p-2 text-white rounded-lg cursor-pointer hover:bg-white hover:text-gray-900">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                    </svg>

                                    <span className="ml-3">Mon profile</span>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link href="/items">
                                <div className="flex items-center p-2 text-white rounded-lg cursor-pointer hover:bg-white hover:text-gray-900">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                    </svg>
                                    <span className="ml-3">Archivées</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div onClick={handleLogout} className="flex items-center p-2 text-danger rounded-lg cursor-pointer  hover:bg-danger hover:text-white ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z" clipRule="evenodd" />
                            </svg>

                            <span className="ml-3">Déconnexion</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/shared/Sidebar';
import ListUsers from '../../../components/listUsers';
import { Input } from '@nextui-org/react';

export default function Users() {

    const [users, setUsers] = useState(null)
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users?.filter((user) =>
        (user.nom + ' ' + user.prenom).toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetch("http://localhost:4000/admin/users");

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                console.log(data)
                setUsers(data)
            } catch (error) {
                console.error('Error fetching user blogs:', error);
                throw error;
            }
        }

        getUsers()
    }, [])

    return (
        <div className='h-screen flex justify-between'>
            <div className='w-[20%] bg-[#1F2937] h-full'>
                <Sidebar />
            </div>
            <div className='flex flex-col items-center w-full h-full'>
                <div className='h-full overflow-auto px-8 space-y-8 py-8 w-full'>
                    <div className='font-bold justify-start flex items-start text-xl'># Utilisateurs</div>
                    <div className=" flex justify-end">
                        <Input
                            type="text"
                            className="w-full sm:max-w-[44%]"
                            placeholder="Rechercher par nom ou prénom"
                            variant='faded'
                            startContent={
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
                                        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M22 22L20 20"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    />
                                </svg>
                            }
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className='w-full space-y-4'>
                        {
                            searchTerm !== "" ?
                                filteredUsers != null &&
                                filteredUsers.map((user) => {
                                    return (
                                        <ListUsers user={user} key={user.id} />
                                    )
                                })
                                :
                                users != null &&
                                users.map((user) => {
                                    return (
                                        <ListUsers user={user} key={user.id} />
                                    )
                                })
                        }
                    </div>
                    {/* {
                        users != null &&
                        users.map((user) => {
                            return (
                                <ListUsers user={user} key={user.id} />
                            )
                        })
                    } */}
                </div>
            </div>
        </div>
    )
}

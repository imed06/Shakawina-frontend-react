import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/shared/Sidebar'
import ReclamationCard from '../../components/cards/reclamation'
import AnswerCard from '../../components/cards/reponse'
import { Spacer } from '@nextui-org/react'
import { useAuthContext } from '../../context/authContext'
import AdminReclamation from '../../components/cards/admin/adminReclamation'
import AdminRemarque from '../../components/cards/admin/adminRemarque'
import AdminSuggestion from '../../components/cards/admin/adminSuggestion'

export default function Dashboard() {

    const [complaints, setComplaints] = useState(null)

    const { user } = useAuthContext()

    useEffect(() => {
        const getComplains = async () => {
            try {
                const response = await fetch("http://localhost:4000/complaint/");

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                console.log(data)
                setComplaints(data)
            } catch (error) {
                console.error('Error fetching user blogs:', error);
                throw error;
            }
        }

        getComplains()
    }, [])

    return (
        <div className='h-screen flex justify-between'>
            <div className='w-[20%] bg-[#1F2937] h-full'>
                <Sidebar />
            </div>

            <div className='flex flex-col items-center w-full h-full'>
                <Spacer y={16} />
                <div className='text-xl font-bold'>Bienvenu dans votre panel d'administration</div>
                <Spacer y={16} />
                <div className='flex justify-around items-start w-full px-28 space-x-2'>
                    {/* <ReclamationCard type={"Réclamations"} />
                    <ReclamationCard type={"Remarque"} />
                    <ReclamationCard type={"Suggestion"} /> */}
                    <AdminReclamation />
                    <AdminRemarque />
                    <AdminSuggestion />
                </div>
                <Spacer y={16} />
                <div className='flex '>
                    <div class="pl-1 w-96 h-20 bg-green-400 rounded-lg shadow-md">
                        <div class="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                            <div class="my-auto">
                                <p class="font-bold">NOMBRE TOTAL DE RECLAMATIONS</p>
                                <p class="text-lg">500</p>
                            </div>
                            <div class="my-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <Spacer x={16} />
                    <div class="pl-1 w-96 h-20 bg-red-500 rounded-lg shadow-md">
                        <div class="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                            <div class="my-auto">
                                <p class="font-bold">RECLAMATIONS NON TRAITES</p>
                                <p class="text-lg">200</p>
                            </div>
                            <div class="my-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <Spacer y={8} />

                {/* <div className='h-full overflow-auto px-2 space-y-8 py-8 '>
                    {
                        complaints != null &&
                        complaints.map((complaint) => {
                            return (
                                <AnswerCard complaint={complaint} key={complaint.id} />
                            )
                        })
                    }
                </div> */}
            </div>
        </div>
    )
}

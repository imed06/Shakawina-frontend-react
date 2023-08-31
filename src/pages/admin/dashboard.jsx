import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/shared/Sidebar'
import ReclamationCard from '../../components/cards/reclamation'
import AnswerCard from '../../components/cards/reponse'

export default function Dashboard() {

    const [complaints, setComplaints] = useState(null)

    useEffect(() => {
        const getComplains = async () => {
            try {
                const response = await fetch("http://localhost:4000/complaint/");

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

        getComplains()
    }, [])

    return (
        <div className='h-screen flex justify-between'>
            <div className='w-[20%] bg-[#1F2937]'>
                <Sidebar />
            </div>

            <div className='flex flex-col items-center w-full'>
                <div className='flex justify-around items-start w-full p-28'>
                    <ReclamationCard type={"Réclamations"} />
                    <ReclamationCard type={"Remarque"} />
                    <ReclamationCard type={"Suggestion"} />
                </div>
                <div className='w-full px-2'>
                    {
                        complaints != null &&
                        complaints.map((complaint) => {
                            return (
                                <AnswerCard complaint={complaint} key={complaint.id}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

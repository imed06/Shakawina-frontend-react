import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/shared/Sidebar';
import AnswerCard from '../../../components/cards/reponse';

export default function Suggestion() {

  const [complaints, setComplaints] = useState(null)

  useEffect(() => {
    const getComplains = async () => {
      try {
        const response = await fetch("http://localhost:4000/complaint/filter/suggestion");

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
        <div className='h-full overflow-auto px-2 space-y-8 py-8 '>
        <div className='font-bold justify-start flex items-start text-xl ml-3'>Dashboard / Suggestions</div>

          {
            complaints != null &&
            complaints.map((complaint) => {
              return (
                <AnswerCard complaint={complaint} key={complaint.id} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
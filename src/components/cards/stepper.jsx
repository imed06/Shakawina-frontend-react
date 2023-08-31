import React from 'react'
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import image01 from '../../assets/01.png'
import image02 from '../../assets/02.png'
import image03 from '../../assets/03.png'

export default function Stepper() {
    return (
        <Card className="stepper">
            <CardHeader className='flex justify-center'>
                <h2 className='text-3xl text-white font-semibold'>Comment ça fonctionne</h2>
            </CardHeader>
            <CardBody className='flex flex-row justify-between'>
                <div className='flex flex-col text-center items-center'>
                    <Image 
                    src={image01}
                    alt='image01'
                    width={120}
                    quality={100}
                    />
                    <h3 className='mb-6'>Etape 01</h3>
                    <p className=' text-base'>Saisir les informations du plaignant.</p>
                </div>
                <div className="flex items-center">
                    <div className="flex items-center text-teal-600 relative">
                        <div className="rounded-full transition duration-500 ease-in-out h-4 w-4  border-2 bg-white border-white">

                        </div>
                    </div>
                    <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-black w-44"></div>
                    <div className="flex items-center text-white relative">
                        <div className="rounded-full transition duration-500 ease-in-out h-4 w-4  border-2 bg-white border-white">

                        </div>
                    </div>                    
                </div>
                <div className='flex flex-col text-center items-center'>
                    <Image 
                    src={image02}
                    alt='image02'
                    width={120}
                    quality={100}
                    />
                    <h3 className='mb-6'>Etape 02</h3>
                    <p className=' text-base'>Saisir les informations de la réclamation.</p>
                </div>
                <div className="flex items-center">
                    <div className="flex items-center text-teal-600 relative">
                        <div className="rounded-full transition duration-500 ease-in-out h-4 w-4  border-2 bg-white border-white">

                        </div>
                    </div>
                    <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-black w-44"></div>
                    <div className="flex items-center text-white relative">
                        <div className="rounded-full transition duration-500 ease-in-out h-4 w-4  border-2 bg-white border-white">

                        </div>
                    </div>                    
                </div>
                <div className='flex flex-col text-center items-center'>
                    <Image 
                    src={image03}
                    alt='image03'
                    width={120}
                    quality={100}
                    />
                    <h3 className='mb-6'>Etape 03</h3>
                    <p className=' text-base'>Soumettre ma réclamation.</p>
                </div>
            </CardBody>
        </Card>
    )
}

import React from 'react'
import { Card, CardBody, Image, Link } from "@nextui-org/react";
import icon from "../../assets/icon.png"

export default function SoumettreReclamationCard() {
    return (
        <Card className="flex justify-center items-center max-w-lg">
            <CardBody className="flex flex-row justify-center items-center">
                <Image
                    alt="nextui logo"
                    radius="sm"
                    src={icon}
                    width={180}
                    height={180}
                />
                <div className='flex flex-col gap-y-3 ml-2'>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-bold">Soumettre votre réclamation</h2>
                        <p className=" text-base">Pour soumettre une nouvelle réclamation.</p>
                    </div>
                    <div className='flex'>
                        <Link href="/form" className="text-[#F8AF28]">
                            <p >Soumettre votre réclamation</p>
                        </Link>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F8AF28" className="w-6 h-6 ml-3">
                            <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

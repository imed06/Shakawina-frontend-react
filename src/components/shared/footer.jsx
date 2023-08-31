import React from 'react'
import Logo from "../../assets/anemlogoblanc.PNG"
import { Button, Image, Link } from '@nextui-org/react'
import map from "../../assets/map.png"

export default function Footer() {
    return (
        <footer>
            <div
                className="mx-auto space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8"
            >
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div>
                        <Image
                            src={Logo}
                            alt="logo"
                            width={70}
                            quality={100}
                        />
                        <p className="mt-4 max-w-xs text-gray-400">
                            <span className='text-white font-bold'>Shakawina</span> Platform, plateforme de l'agence national de l'emploi. Vous pouvez désormais soumettre en ligne vos réclamations et les suivre, établissement public.
                        </p>
                    </div>
                    <div
                        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3"
                    >
                        <div>
                            <span className="hidden h-1 w-10 bg-[#F8AF28] lg:block mb-2"></span>
                            <p className="font-medium  text-white">OÙ NOUS TROUVER</p>
                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <Link href='https://www.anem.dz/#/portail-carto' target="_blank">
                                        <Image
                                            src={map}
                                            width={100}
                                        />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <span className="hidden h-1 w-10 bg-[#F8AF28] lg:block mb-2"></span>
                            <p className="font-medium  text-white">LIENS RAPIDES</p>
                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <Link
                                        href="https://www.anem.dz/"
                                        className=" transition hover:opacity-75 text-white"
                                        target="_blank"
                                    >
                                        Anem site officiel
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://wassitonline.anem.dz/"
                                        className=" transition hover:opacity-75 text-white"
                                        target="_blank"
                                    >
                                        Wassit online
                                    </Link>
                                </li>
                            </ul>
                        </div>


                        <div>
                            <span className="hidden h-1 w-10 bg-[#F8AF28] lg:block mb-2"></span>

                            <p className="font-medium  text-white">INFO</p>

                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <div
                                        className=" transition hover:opacity-75 text-white"
                                    >
                                        Accessibility
                                    </div>
                                </li>
                                <li>
                                    <Button color="warning" className='text-white rounded-full'>
                                        S'ABONNER
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <p className="text-xs text-gray-400">
                    &copy; 2023. Company Name. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

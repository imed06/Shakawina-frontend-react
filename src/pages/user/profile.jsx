import { useAuthContext } from '../../context/authContext'
import { Button, Input, Spacer, Link, Select, SelectItem, Spinner } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import CustomNavbar from '../../components/shared/navbar'
import Footer from '../../components/shared/footer'
import { useNavigate } from 'react-router-dom'
import { communes, wilayas } from '../../data/data'

export default function Profile() {
    const navigate = useNavigate()
    const { user, dispatch } = useAuthContext()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [empty, setEmpty] = useState(false)
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);


    const [personalData, setPersonalData] = useState({
        nom: '',
        prenom: '',
        email: '',
        wilaya: '',
        commune: '',
        natureDoc: '',
        numDoc: '',
        dateDeliv: '',
        placeDeliv: '',
        tel: '',
        ancienPW: '',
        nouveauPW: ''
    });

    useEffect(() => {
        if (user) {
            setPersonalData({
                nom: user.plaignant.nom,
                prenom: user.plaignant.prenom,
                email: user.plaignant.email,
                wilaya: user.plaignant.wilaya,
                commune: user.plaignant.commune,
                natureDoc: user.plaignant.natureDoc,
                numDoc: user.plaignant.numDoc,
                dateDeliv: user.plaignant.dateDeliv,
                placeDeliv: user.plaignant.placeDeliv,
                tel: user.plaignant.tel,
                ancienPW: '',
                nouveauPW: ''
            })

        }
    }, [user])

    const handleChangePersonal = (field, value) => {
        setPersonalData(prevData => ({
            ...prevData,
            [field]: value
        }));
        setEmpty(false)
        /* const attributesToKeep = ['nom', 'prenom', 'email', 'wilaya', 'commune', 'natureDoc', 'numDoc', 'dateDeliv', 'placeDeliv', 'tel', 'ancienPW', 'nouveauPW'];
        const filteredExistingData = Object.entries(user.plaignant)
            .filter(([key]) => attributesToKeep.includes(key))
            .reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {});

        setPersonalData(prevData => ({
            ...prevData,
            ...user.plaignant
        })); */
        // Update only the empty fields in personalData with values from existingData
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (personalData.ancienPW === "") {
            setEmpty(true)
            return
        }

        try {
            setIsLoading(true)
            const response = await fetch('http://localhost:4000/user/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(personalData),
            });

            const json = await response.json();

            //sconsole.log(json)
            if (response.ok) {
                // save the user to local storage
                localStorage.setItem('user', JSON.stringify(json))

                // update the auth context
                dispatch({ type: 'LOGIN', payload: json })

                navigate('/user/reclamations')
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

    const EyeSlashFilledIcon = () => {
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
                    d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z"
                    fill="currentColor"
                />
                <path
                    d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z"
                    fill="currentColor"
                />
                <path
                    d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
                    fill="currentColor"
                />
                <path
                    d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z"
                    fill="currentColor"
                />
                <path
                    d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z"
                    fill="currentColor"
                />
            </svg>
        )
    }

    const EyeFilledIcon = () => {
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
                    d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
                    fill="currentColor"
                />
                <path
                    d="M11.9984 9.14062C10.4284 9.14062 9.14844 10.4206 9.14844 12.0006C9.14844 13.5706 10.4284 14.8506 11.9984 14.8506C13.5684 14.8506 14.8584 13.5706 14.8584 12.0006C14.8584 10.4306 13.5684 9.14062 11.9984 9.14062Z"
                    fill="currentColor"
                />
            </svg>
        )
    }

    return (
        <main className=''>
            <CustomNavbar />
            {user ?
                <div className='flex h-full p-24  flex-col w-full gap-y-8'>
                    <div className='flex items-center w-full gap-x-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                        <h1 className='text-[#101739] text-2xl'>Mon profile</h1>
                    </div>
                    <div className='flex w-full items-center flex-col'>

                        {/* Informations générale */}
                        <Spacer y={8} />
                        <h2 className='font-bold'>Info général</h2>
                        <Spacer y={8} />
                        <div className='input'>
                            <Input type="text" label="Nom" labelPlacement='outside' placeholder={user.plaignant.nom} onChange={e => handleChangePersonal('nom', e.target.value)} />
                            <Spacer x={4}></Spacer>
                            <Input type="text" label="Prenom" labelPlacement='outside' placeholder={user.plaignant.prenom} onChange={e => handleChangePersonal('prenom', e.target.value)} />
                        </div>

                        {/* Adresse */}
                        <Spacer y={8} />
                        <h2 className='font-bold'>Adresse</h2>
                        <Spacer y={8} />
                        <div className='input'>
                            <Select
                                label="Wilaya"
                                placeholder={user.plaignant.wilaya}
                                labelPlacement='outside'
                                isRequired
                                onChange={e => handleChangePersonal('wilaya', e.target.value)}
                            >
                                {wilayas.map((wilaya) => {
                                    return (
                                        <SelectItem key={wilaya.key}>{wilaya.value}</SelectItem>
                                    )
                                })}
                            </Select>
                            <Spacer x={4}></Spacer>
                            <Select
                                label="Commune"
                                placeholder={user.plaignant.commune}
                                labelPlacement='outside'
                                isRequired
                                onChange={e => handleChangePersonal('commune', e.target.value)}
                            >
                                {
                                    personalData.wilaya !== "" &&
                                    communes[personalData.wilaya].map((commune) => {
                                        return (
                                            <SelectItem key={commune.key}>{commune.value}</SelectItem>
                                        )
                                    })
                                }
                            </Select>
                        </div>

                        {/* Preuve d'identité */}
                        <Spacer y={8} />
                        <h2 className='font-bold'>Preuve d'identité</h2>
                        <Spacer y={8} />
                        <div className='input'>
                            <Select
                                label="Nature du document"
                                labelPlacement='outside'
                                placeholder={user.plaignant.natureDoc}
                                onChange={e => handleChangePersonal('natureDoc', e.target.value)}
                            >
                                <SelectItem key="pièceID">pièce d'identité</SelectItem>
                                <SelectItem key="permis">permis de conduite</SelectItem>
                                <SelectItem key="passport">passport</SelectItem>
                            </Select>
                            <Spacer x={4}></Spacer>
                            <Input type="num" label="Numéro du pièce" labelPlacement='outside' placeholder={user.plaignant.numDoc}
                                onChange={e => handleChangePersonal('numDoc', e.target.value)} />
                        </div>
                        <Spacer y={4} />
                        <div className='input'>
                            <Input type="date" label="Date de délivrance" labelPlacement='outside' placeholder={user.plaignant.dateDeliv}
                                onChange={e => handleChangePersonal('dateDeliv', e.target.value)} />
                            <Spacer x={4}></Spacer>
                            <Select
                                label="À"
                                placeholder={user.plaignant.placeDeliv}
                                labelPlacement='outside'
                                isRequired
                                onChange={e => handleChangePersonal('placeDeliv', e.target.value)}
                            >
                                {wilayas.map((wilaya) => {
                                    return (
                                        <SelectItem key={wilaya.key}>{wilaya.value}</SelectItem>
                                    )
                                })}
                            </Select>
                        </div>

                        {/* Contact */}
                        <Spacer y={8} />
                        <h2 className='font-bold'>Contact</h2>
                        <Spacer y={8} />
                        <div className='input'>
                            <Input type="email" label="Email" labelPlacement='outside' placeholder={user.plaignant.email}
                                onChange={e => handleChangePersonal('email', e.target.value)} />
                            <Spacer x={4}></Spacer>
                            <Input type="tel" label="Numéro tel" labelPlacement='outside' placeholder={user.plaignant.tel}
                                onChange={e => handleChangePersonal('tel', e.target.value)} />
                        </div>
                        <Spacer y={4} />
                        <div className='input'>
                            <Input
                                label="Ancien mot de passe"
                                labelPlacement='outside' placeholder="mot de passe"
                                isRequired
                                onChange={e => handleChangePersonal('ancienPW', e.target.value)}
                                validationState={empty && "invalid"}
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                        {!isVisible ? (
                                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                type={isVisible ? "text" : "password"}

                            />
                            <Spacer x={4}></Spacer>
                            <Input
                                label="Nouveau mot de passe"
                                labelPlacement='outside'
                                placeholder="mot de passe"
                                isRequired
                                onChange={e => handleChangePersonal('nouveauPW', e.target.value)}
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                        {!isVisible ? (
                                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                type={isVisible ? "text" : "password"}
                            />
                        </div>
                        <Spacer y={16} />

                        <div className='flex w-full justify-between'>
                            <Link href="/">
                                <Button className="text-gray-500 font-bold" >
                                    Annuler
                                </Button>
                            </Link>
                            {
                                error &&
                                <div className="flex items-center p-4 text-sm mt-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <span className="sr-only">Info</span>
                                    <div>
                                        <span className="font-medium">Email ou mot de passe incorrect!</span>
                                    </div>
                                </div>
                            }
                            {
                                isLoading ?
                                    <Spinner />
                                    :
                                    <Button color="warning" className="text-white font-bold" onClick={handleSubmit}>
                                        Mis à jour
                                    </Button>
                            }
                        </div>
                    </div>
                </div>
                :
                <div className='flex justify-center items-center w-full h-screen'>Se connecter pour voir votre profile</div>
            }
            <Footer />
        </main>
    )
}

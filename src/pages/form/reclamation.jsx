import { Button, Checkbox, Input, Spacer, Spinner, Textarea, Link, Select, SelectItem } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/authContext';
import { communes, wilayas } from "../../data/data"
import { useNavigate } from 'react-router-dom';
import CustomNavbar from '../../components/shared/navbar';
import Footer from '../../components/shared/footer';
import axios from 'axios';
import _ from 'lodash';

export default function Form() {
    const navigate = useNavigate()
    const [etape, setEtape] = useState(true)
    const { dispatch, user } = useAuthContext()
    const [isLoading, setIsLoading] = useState(false)
    const [empty, setEmpty] = useState(false)
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const [personalData, setPersonalData] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: '123',
        wilaya: '',
        commune: '',
        natureDoc: '',
        numDoc: '',
        dateDeliv: '',
        placeDeliv: '',
        tel: '',
    });
    const [complaintData, setComplaintData] = useState({
        content: '',
        type: '',
        objet: '',
    });

    const handleChangePersonal = (field, value) => {
        setPersonalData(prevData => ({
            ...prevData,
            [field]: value
        }));
        setEmpty(false)
    };

    const handleChangeComplaint = (field, value) => {
        setComplaintData(prevData => ({
            ...prevData,
            [field]: value
        }));
        setEmpty(false)
    };

    const handleChangeEtape = () => {
        const hasEmptyField = _.some(personalData, value => value === '');
        if (hasEmptyField) {
            setEmpty(true);
            return;
        }
        setEtape(false)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    /* submit form */
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (complaintData.objet === '' || complaintData.type === '') {
            setEmpty(true);
            return;
        }

        const formData = new FormData();

        var userId;
        var userRes;

        setIsLoading(true)

        /* add user */
        if (!user) {
            try {
                const response = await fetch('http://localhost:4000/user/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(personalData),
                });

                const json = await response.json()

                userId = json.plaignant.id;
                userRes = json

                if (response.ok) {
                    console.log('Data sent successfully');
                } else {
                    console.error('Failed to send data');
                }
            } catch (error) {
                console.error('Error:', error);
            }

            complaintData.userId = userId
        } else {
            complaintData.userId = user.plaignant.id
        }
        console.log(complaintData)

        formData.append('file', file)
        formData.append('data', JSON.stringify(complaintData))

        /* add complaint */
        try {
            const response = await axios.post('http://localhost:4000/complaint/new', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (!user) {
                // save the user to local storage
                localStorage.setItem('user', JSON.stringify(userRes))

                // update the auth context
                dispatch({ type: 'LOGIN', payload: userRes })
            }
            navigate("/user/reclamations")
            setIsLoading(false)
        }
        catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        if (user) {
            setEtape(false)
        }
    }, [user]);


    return (
        <main className='bg-gray-100'>
            <CustomNavbar />
            
            {/* etape 01 */}
            {
                etape ?
                    <div className='flex justify-center items-center flex-col bg-white w-3/5 p-20 my-20 rounded-md border-2'>
                        <div className='flex items-center justify-between w-full'>
                            <h1 className='text-[#101739] text-2xl'>Informations Plaignant</h1>
                            <p>Etape 1/2</p>
                        </div>
                        <div className='flex w-full items-center flex-col'>

                            {/* Informations générale */}
                            <Spacer y={8} />
                            <h2 className='font-bold'>Info général</h2>
                            <Spacer y={8} />
                            <div className='input'>
                                <Input
                                    type="text"
                                    label="Nom"
                                    labelPlacement='outside'
                                    placeholder="Nom"
                                    size="md"
                                    value={personalData.nom}
                                    validationState={personalData.nom === "" && empty && "invalid"}
                                    isRequired
                                    onChange={e => handleChangePersonal('nom', e.target.value)}
                                />
                                <Spacer x={4}></Spacer>
                                <Input
                                    type="text"
                                    label="Prenom"
                                    labelPlacement='outside'
                                    placeholder="Prenom"
                                    value={personalData.prenom}
                                    validationState={personalData.prenom === "" && empty && "invalid"}
                                    isRequired
                                    size="md"
                                    onChange={e => handleChangePersonal('prenom', e.target.value)}
                                />
                            </div>

                            {/* Adresse */}
                            <Spacer y={8} />
                            <h2 className='font-bold'>Adresse</h2>
                            <Spacer y={8} />
                            <div className='input'>
                                <Select
                                    label="Wilaya"
                                    placeholder="eg: Alger"
                                    labelPlacement='outside'
                                    className="max-w-xs"
                                    value={personalData.wilaya}
                                    validationState={personalData.wilaya === "" && empty && "invalid"}
                                    isRequired
                                    size="md"
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
                                    placeholder="eg: Alger"
                                    labelPlacement='outside'
                                    className="max-w-xs"
                                    value={personalData.commune}
                                    validationState={personalData.commune === "" && empty && "invalid"}
                                    isRequired
                                    size="md"
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
                                    placeholder="eg: pièce d'identité"
                                    labelPlacement='outside'
                                    className="max-w-xs"
                                    value={personalData.natureDoc}
                                    validationState={personalData.natureDoc === "" && empty && "invalid"}
                                    isRequired
                                    size="md"
                                    onChange={e => handleChangePersonal('natureDoc', e.target.value)}
                                >
                                    <SelectItem key="pièce d'identité">pièce d'identité</SelectItem>
                                    <SelectItem key="permis de conduite">permis de conduite</SelectItem>
                                    <SelectItem key="passport">passport</SelectItem>
                                </Select>
                                <Spacer x={4}></Spacer>
                                <Input
                                    type="num"
                                    label="Numéro du pièce"
                                    labelPlacement='outside'
                                    placeholder="eg: 1223546"
                                    value={personalData.numDoc}
                                    validationState={personalData.numDoc === "" && empty && "invalid"}
                                    isRequired
                                    size="md"
                                    onChange={e => handleChangePersonal('numDoc', e.target.value)}
                                />
                            </div>
                            <Spacer y={4} />
                            <div className='input'>
                                <Input
                                    type="date"
                                    label="Date de délivrance"
                                    labelPlacement='outside'
                                    placeholder="eg: 1223546"
                                    value={personalData.dateDeliv}
                                    validationState={personalData.dateDeliv === "" && empty && "invalid"}
                                    isRequired
                                    size="md"
                                    onChange={e => handleChangePersonal('dateDeliv', e.target.value)}
                                />
                                <Spacer x={4}></Spacer>
                                <Select
                                    label="À"
                                    placeholder="eg: Alger"
                                    labelPlacement='outside'
                                    className="max-w-xs"
                                    value={personalData.placeDeliv}
                                    validationState={personalData.placeDeliv === "" && empty && "invalid"}
                                    isRequired
                                    size="md"
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
                                <Input
                                    type="email"
                                    label="Email"
                                    labelPlacement='outside'
                                    placeholder="Email"
                                    value={personalData.email}
                                    validationState={personalData.email === "" && empty && "invalid"}
                                    isRequired
                                    size="md"
                                    onChange={e => handleChangePersonal('email', e.target.value)}
                                />
                                <Spacer x={4}></Spacer>
                                <Input
                                    type="tel"
                                    maxLength={10}
                                    minLength={10}
                                    label="Numéro tel"
                                    labelPlacement='outside'
                                    placeholder="0X-XX-XX-XX-XX"
                                    value={personalData.tel}
                                    validationState={personalData.tel === "" && empty && "invalid"}
                                    isRequired
                                    size="md"
                                    onChange={e => handleChangePersonal('tel', e.target.value)}
                                />
                            </div>
                            <div className="flex items-center p-4 text-sm mt-4 text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    <span className="font-medium">Si celle si est votre première connexion votre mot de passe sera envoyé sur votre boite email. vous pouvez ensuite le changé.</span>
                                </div>
                            </div>
                            <Spacer y={8} />

                            <div className='flex w-full justify-between'>
                                <Link href="/">
                                    <Button className="text-gray-500 font-bold" >
                                        Annuler
                                    </Button>
                                </Link>
                                <Button color="warning" className="text-white font-bold" onClick={handleChangeEtape}>
                                    Continue
                                </Button>
                            </div>
                        </div>
                    </div>
                    :
                    /* étape 02 */
                    <div className='flex justify-center items-center flex-col bg-white w-3/5 p-20 my-20 rounded-md border-2'>
                        <div className='flex items-center justify-between w-full'>
                            <h1 className='text-[#101739] text-2xl'>Informations Réclamation</h1>
                            <p>Etape 2/2</p>
                        </div>
                        <Spacer y={8} />
                        <div className='flex w-full items-center flex-col'>

                            {/* type de reclamation */}
                            <div className='input'>
                                <Select
                                    label="Type de réclamation"
                                    placeholder="eg: réclamation"
                                    labelPlacement='outside'
                                    validationState={complaintData.type === "" && empty && "invalid"}
                                    isRequired
                                    size="md"
                                    onChange={e => handleChangeComplaint('type', e.target.value)}
                                >
                                    <SelectItem key="reclamation">Réclamation</SelectItem>
                                    <SelectItem key="remarque">Remarque</SelectItem>
                                    <SelectItem key="suggestion">Suggestion</SelectItem>
                                </Select>
                            </div>

                            {/* objet de reclamation */}
                            <Spacer y={8} />
                            <div className='input'>
                                <Select
                                    label="Objet de réclamation"
                                    placeholder="eg: payement retardée"
                                    labelPlacement='outside'
                                    validationState={complaintData.objet === "" && empty && "invalid"}
                                    isRequired
                                    size="md"
                                    onChange={e => handleChangeComplaint('objet', e.target.value)}
                                >
                                    <SelectItem key="Retard de paiement des allocations de chômage">Retard de paiement des allocations de chômage</SelectItem>
                                    <SelectItem key="Manque de transparence dans le processus de placement">Manque de transparence dans le processus de placement</SelectItem>
                                    <SelectItem key="Discrimination lors du processus de recrutement ou de placement">Discrimination lors du processus de recrutement ou de placement</SelectItem>
                                    <SelectItem key="Problèmes liés au processus d'inscription en tant que demandeur d'emploi">Problèmes liés au processus d'inscription en tant que demandeur d'emploi</SelectItem>
                                    <SelectItem key="Dossier d'inscription perdu ou mal géré par l'ANEM">Dossier d'inscription perdu ou mal géré par l'ANEM</SelectItem>
                                    <SelectItem key="Mauvaise communication concernant les opportunités d'emploi ou de formation">Mauvaise communication concernant les opportunités d'emploi ou de formation</SelectItem>
                                    <SelectItem key="Difficultés à accéder aux services de l'ANEM en ligne">Difficultés à accéder aux services de l'ANEM en ligne</SelectItem>
                                    <SelectItem key="Demandes de renseignements non traitées ou ignorées">Demandes de renseignements non traitées ou ignorées</SelectItem>
                                    <SelectItem key="Erreurs dans les paiements ou les documents administratifs">Erreurs dans les paiements ou les documents administratifs</SelectItem>
                                    <SelectItem key="Problèmes liés à l'infrastructure ou aux installations de l'ANEM">Problèmes liés à l'infrastructure ou aux installations de l'ANEM</SelectItem>
                                    <SelectItem key="Autre">Autre</SelectItem>
                                </Select>
                            </div>

                            {/* description de reclamation */}
                            <Spacer y={8} />
                            <div className='input'>
                                <Textarea
                                    label="Corps de réclamation"
                                    labelPlacement="outside"
                                    placeholder="Enter your description"
                                    validationState={complaintData.content === "" && empty && "invalid"}
                                    onChange={e => handleChangeComplaint('content', e.target.value)}
                                />
                            </div>

                            {/* pièces jointes */}
                            <Spacer y={8} />
                            <div className='w-full'>
                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">Ajouter un fichier</label>
                                <input className="block w-full text-lg text-gray-50 border border-gray-300 rounded-lg cursor-pointer bg-gray-900 dark:text-gray-900 focus:outline-none dark:bg-gray-900 dark:border-gray-600 placeholder-gray-900" id="file_input" type="file" onChange={handleFileChange} />
                            </div>
                            {imageUrl !== "" && <img src={"http://localhost:4000/uploads/" + imageUrl} alt="Uploaded" />}

                            <Spacer y={8} />
                            <div className='input'>
                                <Checkbox>J'accepte <span className='text-primary underline'>les conditions générales et les termes d'utilisation</span></Checkbox>
                            </div>

                            <Spacer y={16} />
                            <div className='input justify-between'>

                                <Button className="text-gray-500 font-bold" onClick={() => setEtape(true)} >
                                    Précédent
                                </Button>

                                {
                                    isLoading ?
                                        <Spinner />
                                        :
                                        <Button color="warning" className="text-white font-bold" onClick={handleFormSubmit}>
                                            Envoyer
                                        </Button>
                                }
                            </div>
                        </div>
                    </div>
            }
            <Footer />
        </main>
    )
}

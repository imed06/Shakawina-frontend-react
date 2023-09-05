import React, { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Textarea, Button, Spacer, Divider, Image, Spinner, Chip } from "@nextui-org/react";
import { useAuthContext } from "../../context/authContext";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { MapInteractionCSS } from 'react-map-interaction';
import { Link } from "react-router-dom";

export default function AnswerCard({ complaint }) {

    const [isOpenAnswer, setIsOpen] = useState(false)
    const [message, setMessage] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { user } = useAuthContext()

    const formattedDate = new Date(complaint.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    const [answerContent, setAnswerContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true)

        try {
            const response = await fetch('http://localhost:4000/admin/answer/' + complaint.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    adminId: user.admin.id,
                    answer: answerContent,
                }),
            });

            const json = await response.json()

            console.log(json)

            if (response.ok) {
                setMessage(true)
            }
        } catch (error) {
            console.error('Error sending request:', error);
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <Table aria-label="Example static collection table" bottomContent={
            isOpenAnswer ?
                complaint.status === "En révision" ?
                    <div className="flex justify-center flex-col items-end">
                        <Divider className="my-4" />
                        <Textarea
                            label="Réponse sur la réclamation"
                            labelPlacement="outside"
                            placeholder="Entrer votre réponse"
                            size="lg"
                            variant="faded"
                            description="Cette réponse sera envoyer au déposeur de la réclamation."
                            onChange={(e) => setAnswerContent(e.target.value)}
                        />
                        <Spacer y={4} />
                        {
                            isLoading ?
                                <Spinner />
                                :
                                <div className="flex justify-center items-center space-x-3">
                                    {
                                        message &&
                                        <div className="flex items-center p-3 text-sm mt-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                            <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                            </svg>
                                            <span className="sr-only">Info</span>
                                            <div>
                                                <span className="font-medium">Réponse envoyée!</span>
                                            </div>
                                        </div>
                                    }
                                    <Button color="success" className=' w-xs text-lg font-medium text-white' onClick={handleSubmit}>
                                        Soumettre
                                    </Button>
                                </div>

                        }
                    </div>
                    :
                    <div >
                        <Divider className="my-4" />
                        <div className="flex justify-center">{complaint.answer.content}</div>
                    </div>
                :
                null
        }
        >
            <TableHeader>
                <TableColumn>CODE</TableColumn>
                <TableColumn>NOM</TableColumn>
                <TableColumn>DATE</TableColumn>
                <TableColumn>OBJET</TableColumn>
                <TableColumn>TYPE</TableColumn>
                <TableColumn>CORPS</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>ATTACHEMENTS</TableColumn>
                <TableColumn>ACTION</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No rows to display."} content="kfjd">
                <TableRow key="1">
                    <TableCell>{complaint.id}</TableCell>
                    <TableCell className="font-semibold">{complaint.plaignant.nom} {complaint.plaignant.prenom}</TableCell>
                    <TableCell>{formattedDate}</TableCell>
                    <TableCell>{complaint.objet}</TableCell>
                    <TableCell>{complaint.type}</TableCell>
                    <TableCell>{complaint.content === '' ? <div>/</div> : complaint.content}</TableCell>
                    <TableCell>
                        <Chip className="capitalize" color={complaint.status === "Traitée" ? "success" : "warning"} size="sm" variant="light">
                            {complaint.status}
                        </Chip>
                    </TableCell>
                    <TableCell>
                        {
                            complaint.files.length !== 0 ?
                                <>
                                    {
                                        complaint.files[0].path.includes("pdf") ?
                                            <div className="flex cursor-pointer justify-center items-center">
                                                <Link to={"http://localhost:4000/uploads/" + complaint.files[0].path} target="_blank" >
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                        <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z" clipRule="evenodd" />
                                                    </svg>
                                                </Link>
                                            </div>
                                            :
                                            <div onClick={onOpen} className="flex cursor-pointer justify-center items-center">
                                                <Image src={"http://localhost:4000/uploads/" + complaint.files[0].path} width={70} />
                                            </div>
                                    }
                                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" scrollBehavior="normal">
                                        <ModalContent>
                                            {(onClose) => (
                                                <>
                                                    <ModalHeader>Pièce jointe</ModalHeader>
                                                    <ModalBody className=" justify-center items-center">
                                                        {/* <Image src={"http://localhost:4000/uploads/" + complaint.files[0].path} /> */}
                                                        <MapInteractionCSS>
                                                            <img src={"http://localhost:4000/uploads/" + complaint.files[0].path} />
                                                        </MapInteractionCSS>
                                                    </ModalBody>

                                                </>
                                            )}
                                        </ModalContent>
                                    </Modal>
                                </>
                                :
                                <div>/</div>
                        }
                    </TableCell>
                    <TableCell className=" cursor-pointer">
                        <Button color="primary" className=' max-w-xs  text-xs font-medium' variant="light" onClick={() => setIsOpen(!isOpenAnswer)}>
                            {complaint.status === "En révision" ? "Répondre" : "Réponse"}
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

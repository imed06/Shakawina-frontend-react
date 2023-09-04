import React, { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Textarea, Button, Spacer, Divider, Image, Spinner, Chip } from "@nextui-org/react";
import { useAuthContext } from "../../context/authContext";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { MapInteractionCSS } from 'react-map-interaction';

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
                                    <div onClick={onOpen} className="flex cursor-pointer justify-center items-center">
                                        <Image src={"http://localhost:4000/uploads/" + complaint.files[0].path} width={70} />
                                    </div>
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

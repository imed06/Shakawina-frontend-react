"use client"
import React, { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Textarea, Button, Spacer, Divider, Image, Spinner } from "@nextui-org/react";
import { useAuthContext } from "../../context/authContext";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Link } from "react-router-dom";


export default function AnswerCard({ complaint }) {

    const [isOpenAnswer, setIsOpen] = useState(false)

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

            if (response.ok) {
                console.log('Answer added successfully');
                // Reset the form
                setAnswerContent('');
            } else {
                console.error('Error adding answer');
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
                <div className="flex justify-center flex-col items-end">
                    <Divider className="my-4" />
                    <Textarea
                        label="Réponse sur la réclamation"
                        labelPlacement="outside"
                        placeholder="Entrer votre réponse"
                        onChange={(e) => setAnswerContent(e.target.value)}
                    />
                    <Spacer y={4} />
                    {
                        isLoading ?
                            <Spinner />
                            :
                            <Button color="success" className=' w-xs text-xs font-medium text-white' onClick={handleSubmit}>
                                Soumettre
                            </Button>
                    }
                </div>
                :
                null
        }
        >
            <TableHeader>
                <TableColumn>CODE</TableColumn>
                <TableColumn>OBJET RECLAMATION</TableColumn>
                <TableColumn>DATE</TableColumn>
                <TableColumn>TYPE RECLAMATION</TableColumn>
                <TableColumn>CORPS RECLAMATION</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>ATTACHEMENTS</TableColumn>
                <TableColumn>REPONSE</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No rows to display."} content="kfjd">
                <TableRow key="1">
                    <TableCell>{complaint.id}</TableCell>
                    <TableCell>{complaint.type}</TableCell>
                    <TableCell>{formattedDate}</TableCell>
                    <TableCell>{complaint.type}</TableCell>
                    <TableCell>{complaint.content}</TableCell>
                    <TableCell className="text-warning">{complaint.status}</TableCell>
                    <TableCell>
                        {
                            complaint.files.length !== 0 ?
                                <>
                                    <div onClick={onOpen} className="flex cursor-pointer justify-center items-center">
                                        <Image src={"http://localhost:4000/uploads/" + complaint.files[0].path} width={70}/>
                                    </div>
                                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                                        <ModalContent>
                                            {(onClose) => (
                                                <>
                                                    <ModalHeader className="flex flex-col gap-1">Attachement</ModalHeader>
                                                    <ModalBody className=" justify-center items-center">
                                                        <Image src={"http://localhost:4000/uploads/" + complaint.files[0].path} />
                                                    </ModalBody>
                                                    <ModalFooter className="bg-white">
                                                        <Button color="danger" variant="light" onPress={onClose}>
                                                            Fermer
                                                        </Button>
                                                    </ModalFooter>
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
                        <Button color="primary" className=' max-w-xs w-full text-xs font-medium' onClick={() => setIsOpen(!isOpenAnswer)}>
                            Répondre
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

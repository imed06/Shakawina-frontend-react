"use client"
import React, { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Textarea, Button, Spacer, Divider } from "@nextui-org/react";
import { useAuthContext } from "../../context/authContext";

export default function AnswerCard({ complaint }) {

    const [isOpen, setIsOpen] = useState(false)

    const {user} = useAuthContext()

    const formattedDate = new Date(complaint.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    const [answerContent, setAnswerContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/admin/answer/'+complaint.id, {
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
        }
    };

    return (
        <Table aria-label="Example static collection table" bottomContent={
            isOpen ?
                <div className="flex justify-center flex-col items-end">
                    <Divider className="my-4" />
                    <Textarea
                        label="Réponse sur la réclamation"
                        labelPlacement="outside"
                        placeholder="Enter your description"
                        onChange={(e) => setAnswerContent(e.target.value)}
                    />
                    <Spacer y={4} />
                    <Button color="success" className=' w-xs text-xs font-medium' onClick={handleSubmit}>
                        Soumettre
                    </Button>
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
                    <TableCell className=" cursor-pointer">
                        <Button color="primary" className=' max-w-xs w-full text-xs font-medium' onClick={() => setIsOpen(!isOpen)}>
                            Répondre
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

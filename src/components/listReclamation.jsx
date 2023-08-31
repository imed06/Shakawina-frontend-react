"use client"
import React, { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

export default function ListReclamation({complaint}) {

  const [isOpen,setIsOpen] = useState(false)

  const formattedDate = new Date(complaint.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <Table aria-label="Example static collection table" bottomContent={isOpen ? <div className="flex justify-center">{complaint.answer.content}</div> : null}>
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
          <TableCell onClick={()=>setIsOpen(!isOpen)} className=" cursor-pointer">{complaint.answer != null ? 1 : 0}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

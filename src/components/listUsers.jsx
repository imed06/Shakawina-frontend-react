import React, { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

export default function ListUsers({ user }) {

  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NOM</TableColumn>
        <TableColumn>EMAIL</TableColumn>
        <TableColumn>WILAYA</TableColumn>
        <TableColumn>COMMUNE</TableColumn>
        <TableColumn>TEL</TableColumn>
        <TableColumn>ID</TableColumn>
        <TableColumn>Num ID</TableColumn>
        <TableColumn>Date de Délivrance</TableColumn>
        <TableColumn>Lieu de Délivrance</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No rows to display."} content="kfjd">
        <TableRow key="1">
          <TableCell className=" font-medium">{user.nom} {user.prenom}</TableCell>
          <TableCell className=" font-medium text-primary">{user.email}</TableCell>
          <TableCell className=" font-medium">{user.wilaya}</TableCell>
          <TableCell className=" font-medium">{user.commune}</TableCell>
          <TableCell className=" font-medium">{user.tel}</TableCell>
          <TableCell className=" font-medium">{user.natureDoc}</TableCell>
          <TableCell className=" font-medium">{user.numDoc}</TableCell>
          <TableCell className=" font-medium">{user.dateDeliv}</TableCell>
          <TableCell className=" font-medium">{user.placeDeliv}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

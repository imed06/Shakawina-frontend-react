import React, { useState } from "react";
import { Table, TableHeader, TableColumn, Image, TableBody, TableRow, TableCell, Divider, Spacer, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react";
import { MapInteractionCSS } from 'react-map-interaction';

export default function ListReclamation({ complaint }) {

  const [isOpenAnswer, setIsOpen] = useState(false)

  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  const formattedDate = new Date(complaint.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });


  return (
    <Table aria-label="Example static collection table"
      bottomContent={isOpenAnswer ?
        <div>
          <Divider />
          <Spacer y={4} />
          <div className="flex justify-center">{complaint.answer != null ? complaint.answer.content : null}</div>
        </div> : null
      }>
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
          <TableCell className=" font-medium">{complaint.id}</TableCell>
          <TableCell className=" font-medium">{complaint.objet}</TableCell>
          <TableCell className=" font-medium">{formattedDate}</TableCell>
          <TableCell className=" font-medium">{complaint.type}</TableCell>
          <TableCell className=" font-medium">{complaint.content}</TableCell>
          <TableCell className={complaint.status === "Traitée" ? "text-success font-medium" : "text-warning font-medium"}>{complaint.status}</TableCell>
          <TableCell>
            {
              complaint.files.length !== 0 ?
                <>
                  <div onClick={onOpen} className="flex cursor-pointer justify-center items-center">
                    <Image src={"http://localhost:4000/uploads/" + complaint.files[0].path} width={70} />
                  </div>
                  <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" scrollBehavior="normal" size="2xl">
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
          <TableCell onClick={() => setIsOpen(!isOpenAnswer)} className=" cursor-pointer text-center font-medium">{complaint.answer != null ? 1 : 0}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

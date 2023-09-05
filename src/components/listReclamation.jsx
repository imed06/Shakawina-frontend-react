import React, { useState } from "react";
import { Table, TableHeader, TableColumn, Image, TableBody, TableRow, TableCell, Divider, Spacer, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react";
import { MapInteractionCSS } from 'react-map-interaction';
import { Link } from "react-router-dom";

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

import React from 'react'
import { Accordion, AccordionItem } from "@nextui-org/react";

export default function CustomAccordion() {
  return (
    <Accordion>
      <AccordionItem key="1" aria-label="Accordion 1" title={<p className='font-bold'>01. Quel est le type de réclamations que Shakawina peut recevoir et traiter ?</p>}>
        <p>
          Toute  expression  écrite  formulée  par  l’investisseur  et  adressée  au  Centre  Régional d’Investissement Marrakech-Safi, révélant :
        </p>
        <ul>
          <li>- Un préjudice subi suite à une décision implicite ou explicite ou un acte ou une omission, illégal  ou  contraire  aux  principes  de  la  justice  et  d’équité,  d’un  autre  investisseur  ou d’une  administration  publique,  que  ce  soit  de  son  projet  ou  une  autorisation  pour  le lancement  de  son  projet,  ou  un  accord  conventionnel  avec  une  autre  administration publique</li>
          <li>- Une insatisfaction à l'égard du service fourni par l'agence national d'emploi, à savoir, la création de l’entreprise ou tout autre service,</li>
          <li>- Toute  expression  écrite  formulée  par  le  Plaignant  et  adressée  à l'agence national d'emploi, révélant un point de vue sur un service fourni par l'agence national d'emploi,</li>
          <li>- Toute   suggestion   formulée   par   le   Plaignant   et   adressée   au   Shakawina platform,qui  révèle  un  point  de  vue  visant  l’amélioration  des services fournis par l'agence national d'emploi</li>
        </ul>
      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" title={<p className='font-bold'>02. Quels sont les éléments constitutifs d’une réclamation déposée sur la plateforme ?</p>}>
        <p>Chaque réclamation fera l’objet d’un process dans lequel seront repris les éléments suivants :</p>
        <ul>
          <li>- La réclamation du plaignant</li>
          <li>- Les actions et les solutions apportées à cette réclamation,</li>
        </ul>
      </AccordionItem>
      <AccordionItem key="3" aria-label="Accordion 3" title={<p className='font-bold'>03. Quelles  sont  les  réclamations  qui  ne  peuvent  être  traitées  par  Shakawina platform ?</p>}>
        <p>Les réclamations reçues par Shakawina platform, qui ne peuvent être traitées sont les suivantes : </p>
        <ul>
          <li>-Les réclamations concernent des questions pour lesquelles la justice a été saisie ou visant la révision d’une décision de justice irrévocable,</li>
          <li>-Les réclamations n’entrent pas dans les domaines de compétence de l'agence national d'emploi,</li>
          <li>-Les doléances qui comportent une diffamation ou une injure, à l’égard des personnes et/ou de l'agence national d'emploi.</li>
        </ul>
      </AccordionItem>
    </Accordion>
  )
}

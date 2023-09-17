import { Badge } from '@nextui-org/react'
import React from 'react'

export default function AdminReclamation({content}) {
    return (
        <Badge content={content === 0 ? null : content } color="danger" placement="top-left">

            <div className="card-container adminReclamation">
                <div className="card">
                    <div className="content">
                        <p className="heading">RECLAMATION</p>
                        <p>
                            Répondre et traiter les différentes réclamations des citoyens.
                        </p>
                    </div>
                </div>
            </div>
        </Badge>
    )
}

import { Badge } from '@nextui-org/react'
import React from 'react'

export default function AdminRemarque({content}) {
    return (
        <Badge content={content === 0 ? null : content } color="danger" placement="top-left">
            <div className="card-container adminRemarque">
                <div className="card">
                    <div className="content">
                        <p className="heading">REMARQUE</p>
                        <p>
                            Répondre et traiter les différentes remarques des citoyens.
                        </p>
                    </div>
                </div>
            </div>
        </Badge>
    )
}

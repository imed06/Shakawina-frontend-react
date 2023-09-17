import { Badge } from '@nextui-org/react'
import React from 'react'

export default function AdminSuggestion({ content }) {
    return (
        <Badge content={content === 0 ? null : content } color="danger" placement="top-left">
            <div className="card-container adminSuggestion">
                <div className="card">
                    <div className="content">
                        <p className="heading">SUGGESTION</p>
                        <p>
                            Répondre et traiter les différentes suggestions des citoyens.
                        </p>
                    </div>
                </div>
            </div>
        </Badge>
    )
}

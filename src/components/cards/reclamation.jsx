import React from 'react'

export default function ReclamationCard({type}) {
    return (
        <div class="card cursor-pointer">
            <p class="card-title">{type}</p>
            <div class="go-corner">
                <div class="go-arrow">→</div>
            </div>
        </div>
    )
}

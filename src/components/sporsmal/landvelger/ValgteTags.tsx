import React from 'react'


const kryss = String.fromCharCode(215)

export interface TagProps {
    onDelete: () => void
    verdi: string
}

const Tag = ({ onDelete, verdi }: TagProps) => {
    return (
        <span className="etikett etikett--info etikett--tag">
            <span className="etikett--tag__verdi">{verdi}</span>
            <button
                type="button"
                className="etikett__slett"
                onClick={onDelete}>
                <span className="etikett__slett-label etikett__slett-label--skjermleser">Slett</span>
                <span aria-hidden="true" className="etikett__slett-label">{kryss}</span>
            </button>
        </span>
    )
}

export interface ValgteTagsProps {
    handleDelete: (i: number) => void
    verdier: string[]
}

export const ValgteTags = ({ handleDelete, verdier }: ValgteTagsProps) => {
    return (
        <div aria-live="polite">
            {verdier && verdier.length > 0
                ? verdier.map((verdi, index) => {
                    return (
                        <Tag key={verdi}
                            onDelete={() => {
                                handleDelete(index)
                            }}
                            verdi={verdi}
                        />
                    )
                })
                : null
            }
        </div>
    )
}

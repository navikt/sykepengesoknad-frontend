import cn from 'classnames'
import React, { useState } from 'react'
import Autosuggest, { SuggestionSelectedEventData } from 'react-autosuggest'

import { Forslag } from './Forslag'

const getQueryIndex = (query: string, forslag: Forslag) => {
    return forslag.text.toLowerCase().indexOf(query.toLowerCase())
}

const getSuggestionValue = (forslag: Forslag) => {
    return forslag.text
}

const renderSuggestion = (forslag: Forslag, { query }: any) => {
    const escapedRegex = query.trim().replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')
    const html = {
        __html: forslag.text.replace(RegExp(escapedRegex, 'gi'), (x) => {
            return `<mark>${unescape(x)}</mark>`
        }),
    }
    return <div dangerouslySetInnerHTML={html} />
}

export interface NavAutosuggestProps {
    forslagsliste: Forslag[]
    onAdd: (i: Forslag) => void
    sporsmalId: string
}

const NavAutosuggest = (props: NavAutosuggestProps) => {
    const [value, setValue] = useState('')
    const [suggestions, setSuggestions] = useState<Forslag[]>([])

    const onChange = (event: any, { newValue }: any) => {
        setValue(newValue)
    }

    const onBlur = (event: React.FocusEvent) => {
        const value = (event.target as any).value as string
        const forslag = new Forslag(value.trim())
        const forslagFraListe = props.forslagsliste.find((_forslag) => {
            return _forslag.text.toUpperCase() === forslag.text.toUpperCase()
        })
        if (forslagFraListe) {
            velgForslag(forslag)
        }
    }

    const onSuggestionsFetchRequested = ({ value }: any) => {
        const eksakteForslag = props.forslagsliste.filter((forslag) => {
            return getQueryIndex(value, forslag) === 0
        })

        const delvisMatchForslag = props.forslagsliste.filter((forslag) => {
            return getQueryIndex(value, forslag) > 0
        })

        const suggestions = [...eksakteForslag, ...delvisMatchForslag]
            .filter((forslag) => {
                return forslag.id !== 'NORGE'
            })
        setSuggestions(suggestions)
    }

    const velgForslag = (suggestion: Forslag) => {
        setValue('')
        props.onAdd(suggestion)
    }

    const onSuggestionSelected = (
        event: React.FormEvent,
        { suggestion, method }: SuggestionSelectedEventData<Forslag>
    ) => {
        if (method === 'enter') {
            event.preventDefault()
        }
        velgForslag(suggestion)
    }

    const onSuggestionsClearRequested = () => {
        setSuggestions([])
    }

    const shouldRenderSuggestions = (value: string, reason: string) => {
        return reason !== 'input-blurred'
    }

    const onKeypress = (e: any) => {
        e.key === 'Enter' && e.preventDefault()
    }

    return (
        <Autosuggest
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            onSuggestionSelected={onSuggestionSelected}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            shouldRenderSuggestions={shouldRenderSuggestions}
            suggestions={suggestions}
            inputProps={{
                id: props.sporsmalId,
                name: props.sporsmalId,
                value: value,
                onChange: onChange,
                onKeyPress: onKeypress,
                onBlur: onBlur,
                className: cn('skjemaelement__input input--l input--autocomplete'),
                'aria-labelledby': 'landvelger-label',
            }}
        />
    )
}

export default NavAutosuggest

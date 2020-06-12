import cn from 'classnames'
import React, { Component } from 'react'
import Autosuggest, { SuggestionSelectedEventData } from 'react-autosuggest'

import { Forslag } from './Forslag'

const getQueryIndex = (query: string, forslag: Forslag) => {
    return forslag.text
        .toLowerCase()
        .indexOf(query.toLowerCase())
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
    return (<div dangerouslySetInnerHTML={html}
    />)
}

export interface NavAutosuggestProps {
    forslagsliste: Forslag[];
    onAdd: (i: Forslag) => void;
}

export interface NavAutosuggestState {
    value: string;
    suggestions: Forslag[]; //TODO type
}


class NavAutosuggest extends Component<NavAutosuggestProps, NavAutosuggestState> {
    constructor(props: NavAutosuggestProps) {
        super(props)
        this.state = {
            value: '',
            suggestions: [],
        }
        this.onChange = this.onChange.bind(this)
        this.onBlur = this.onBlur.bind(this)
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
    }

    onChange(event: any, { newValue }: any) {
        this.setState({
            value: newValue,
        })
    }

    onBlur(event: React.FocusEvent) {
        const value = (event.target as any).value as string
        const forslag = new Forslag(value.trim())
        const forslagFraListe = this.props.forslagsliste.find((_forslag) => {
            return _forslag.text.toUpperCase() === forslag.text.toUpperCase()
        })
        if (forslagFraListe) {
            this.velgForslag(forslag)
        }
    }

    onSuggestionsFetchRequested({ value }: any) {
        const eksakteForslag = this.props.forslagsliste.filter((forslag) => {
            return getQueryIndex(value, forslag) === 0
        })
        const delvisMatchForslag = this.props.forslagsliste.filter((forslag) => {
            return getQueryIndex(value, forslag) > 0
        })
        const suggestions = [ ...eksakteForslag, ...delvisMatchForslag ]
            .filter((forslag) => {
                return forslag.id !== 'NORGE'
            })
            .slice(0, 5)
        this.setState({
            suggestions,
        })
    }


    onSuggestionSelected(event: React.FormEvent, { suggestion, method }: SuggestionSelectedEventData<Forslag>) {
        if (method === 'enter') {
            event.preventDefault()
        }
        this.velgForslag(suggestion)
    }

    onSuggestionsClearRequested() {
        this.setState({
            suggestions: [],
        })
    }

    velgForslag(suggestion: Forslag) {
        this.setState({
            value: '',
        })
        this.props.onAdd(suggestion)
    }

    render() {
        return (<Autosuggest
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            onSuggestionSelected={this.onSuggestionSelected}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            suggestions={this.state.suggestions}
            inputProps={
                {
                    value: this.state.value,
                    onChange: this.onChange,
                    onBlur: this.onBlur,
                    className: cn('skjemaelement__input input--l input--autocomplete'),
                }
            }
        />)
    }
}


export default NavAutosuggest

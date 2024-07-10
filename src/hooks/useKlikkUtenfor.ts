import { useState, useEffect, useRef } from 'react'

function useKlikkUtenfor(initialVerdi: boolean) {
    const [erKlikketUtenfor, settErKlikketUtenfor] = useState<boolean>(initialVerdi)
    const ref = useRef<HTMLDivElement>(null)

    const erBokstavEllerMellomrom = (key: string) => {
        return /^[a-zæøåA-ZÆØÅ ]$/.test(key)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            settErKlikketUtenfor(true)
        } else {
            settErKlikketUtenfor(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return { ref, erKlikketUtenfor, settErKlikketUtenfor, erBokstavEllerMellomrom }
}

export default useKlikkUtenfor

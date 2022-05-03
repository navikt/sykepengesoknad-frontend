import { useHistory } from 'react-router-dom'

import { oversiktside } from '../soknad/soknad-link'

const RedirectTilOversikt = () => {
    const history = useHistory()
    history.replace(oversiktside)
    return null
}

export default RedirectTilOversikt

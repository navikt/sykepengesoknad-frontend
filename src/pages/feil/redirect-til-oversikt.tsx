import { useHistory } from 'react-router-dom'

import { oversiktside } from '../../utils/url-utils'

const RedirectTilOversikt = () => {
    const history = useHistory()
    history.replace(oversiktside)
    return null
}

export default RedirectTilOversikt

import * as React from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import SoknadSide from './sider/soknad-side';

class Routes extends React.Component<RouteComponentProps> {
    render () {
        return (
            <Switch>
                <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/:sykepengesoknadId`}
                    component={SoknadSide}
                />
                <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/:sykepengesoknadId/:steg`}
                    component={SoknadSide}
                />
                <Route path="*" component={SoknadSide}/>
            </Switch>
        )
    }
}

export default withRouter(Routes);

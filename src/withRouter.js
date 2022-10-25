import {
    useLocation,
    useNavigate,
    useParams
} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import './css/AnimatedSwitch.less'
function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    classNames={props.type || 'fade'}
                    timeout={props.duration || 300}
                >
                    <Component
                        {...props}
                        router={{location, navigate, params}}
                    />
                </CSSTransition>
            </TransitionGroup>
        );
    }

    return ComponentWithRouterProp;
}

export default withRouter;

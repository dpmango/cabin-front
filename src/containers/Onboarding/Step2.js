import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { onboardingApi } from 'services/Api';
import { SET_ONBOARDING_AUTHTOKEN, SET_ONBOARDING_MANAGERS, SET_ONBOARDING_STEP } from 'store/ActionTypes';
import { notify } from 'reapop';
// import SvgIcon from 'components/SvgIcon';
// import Image from 'components/Image';

class OnboardingStep2 extends Component {
  static propTypes = {
    setOnboardingStep: PropTypes.func,
    onboardingRandomId: PropTypes.string,
    // resetDataLayer: PropTypes.func,
    // addToDataLayer: PropTypes.func
  };

  constructor(props){
    super(props);

    this.state = {
      managers: props.managers,
      isTransitioningNext: false,
    }
  }

  // when getManagers are sucessfully set - update props to state
  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.managers && (nextProps.managers !== prevState.managers)) {
      return { managers: nextProps.managers};
    } else {
      return null;
    }
  }

  componentDidMount() {
    this.getManagers();
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  getManagers = (refreshedToken) => {
    onboardingApi.defaults.headers['Authorization'] = 'JWT ' + ( refreshedToken ? refreshedToken : this.props.onboardingToken )

    onboardingApi
      .get('company/' + this.props.companyId)
      .then(res => {
        console.log('Backend response to company GET' , res)
        const managers = {
          secretary: res.data.secretary,
          executive: res.data.executive
        }
        this.props.setOnboardingManagers(managers)
      })
      .catch(err => {
        console.log(err.response); // todo update token ?
        if (err.response.status === 401){
          this.refreshToken();
        }
      });
  }

  refreshToken = () => {
    const token = this.props.urlToken
    if ( !token ) return

    // clear JWT before refreshing tokens
    onboardingApi.defaults.headers['Authorization'] = ''

    onboardingApi
      .post('login-token', {"token": token})
      .then(res => {
        const respToken = res.data.token
        this.props.setOnboardingAuthToken(respToken);
        this.getManagers(respToken) // loop - if error, get token again. till its returning ok
      })
      .catch(err => {
        this.tokenInvalid(token, err.response);
        console.log('error on getting token', err.response);
      })
  }

  tokenInvalid = (token, err) => {
    console.log(token, 'invalid token');

    this.props.notify({
      title: 'Whoops! Error updating token',
      message: 'Error happens updating your authorization token. Please contact cabin',
      status: 'default', // default, info, success, warning, error
      dismissible: true,
      dismissAfter: 2000,
    })
  }


  prevStep = () => {
    this.props.setOnboardingStep(
      this.props.onboardingStep - 1
    );
  }

  submitForm = () => {
    this.setState({ isTransitioningNext: true })

    setTimeout(() => {

      this.props.setOnboardingStep(
        this.props.onboardingStep + 1
      );
      this.setState({ isTransitioningNext: false })

    }, 400)
  }

  render(){

    const { isTransitioningNext, managers } = this.state

    return(

      <div className={"signup__intro"}>
        <div className={"signup__wrapper " + (isTransitioningNext ? "fade-out" : "") } data-aos="fade-left">
          <div className="signup__left signup__left--managers">
            <div className="signup__managers">
              <SignupManager
                name={managers.secretary.name}
                image={managers.secretary.image_url}
                title="Named Company Secretary" />
              <SignupManager
                name={managers.executive.name}
                image={managers.executive.image_url}
                title="Corporate Secretarial Executive" />
            </div>
          </div>
          <div className="signup__right signup__right--400">
            <h2>Meet your Cabin team,</h2>
            <p className="t-paragraph"><strong>{managers.secretary.name}</strong> and <strong>{managers.executive.name}</strong></p>
            <p className="t-paragraph"><strong>{managers.secretary.name}</strong> will be the named person listed as your company’s secretary. He will oversee that the administration of all secretarial matters and ensure they comply with the Singapore Companies Act.</p>
            <p className="t-paragraph"><strong>{managers.executive.name}</strong> will handle the administration of all secretarial matters and be the main point of contact for any requests you have.</p>
            <p className="t-paragraph">We look forward to working with you.</p>
            <div className="signup__signs-row">
              <img style={{'max-width': 100}} src={managers.secretary.signature_img_url} alt={managers.secretary.name} />
              <img style={{'max-width': 100}} src={managers.executive.signature_img_url} alt={managers.executive.name} />

              {/* <i className="icon icon-rifeng-sign" />
              <i className="icon icon-rifeng-sign" /> */}
            </div>
          </div>
        </div>
      </div>

    )
  }
}

const SignupManager = (props) => {
  const {
    name,
    image,
    title
  } = props

  return (
    <div className="signup__manager">
      <div className="signup__avatar signup__avatar--row">
        <div className="signup__hover-tooltip">
          <div className="signup__hover-wrapper">
            Hi, I’m <span><strong>{name}</strong></span>
          </div>
        </div>
        <div className="signup__avatar-mask">
          <img src={image} alt={name} />
        </div>

        {/* <Image file={image} /> */}
      </div>
      <div className="signup__manager-name">{title}</div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  onboardingRandomId: state.onboarding.onboardingRandomId,
  urlToken: state.onboarding.urlToken,
  onboardingToken: state.onboarding.authToken,
  companyId: state.onboarding.companyId,
  managers: state.onboarding.managers,
  onboardingStep: state.onboarding.onboardingStep
});

const mapDispatchToProps = (dispatch) => ({
  setOnboardingStep: (data) => dispatch({ type: SET_ONBOARDING_STEP, payload: data }),
  setOnboardingAuthToken: (data) => dispatch({ type: SET_ONBOARDING_AUTHTOKEN, payload: data }),
  setOnboardingManagers: (data) => dispatch({ type: SET_ONBOARDING_MANAGERS, payload: data }),
  // resetDataLayer: () => dispatch({ type: RESET_DATALAYER }),
  // addToDataLayer: (data) => dispatch({ type: ADD_TO_DATALAYER, data })
  notify: (data) => dispatch(notify(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep2);

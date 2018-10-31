import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
// import api from 'services/Api';
// import isProduction from 'services/isProduction';
import { SET_ONBOARDING_C_STEP, SET_ONBOARDING_C_FIELDS, SET_ONBOARDING_C_ID } from 'store/ActionTypes';
import Image from 'components/Image';
// import FormInput from 'components/FormInput';
import { FilePond, File } from 'react-filepond';
// registerPlugin
// import 'filepond/dist/filepond.min.css';
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
// registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

class OnboardingStep6 extends Component {
  static propTypes = {
    setOnboardingStep: PropTypes.func,
    setOnboardingFields: PropTypes.func,
    setOnboardingId: PropTypes.func,
    onboardingFields: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      upload_registration: props.onboardingFields.upload_registration,
      upload_certificate: props.onboardingFields.upload_certificate,
      formIsValid: false,
      isTransitioningNext: false,
      isFormSubmitted: false
    };

    this.formRef = React.createRef();

    this.pond = [
      React.createRef(),
      React.createRef()
    ]
  }

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  formInvalid = () => {
    this.setState({ formIsValid: false });
  }

  formValid = () => {
    this.setState({ formIsValid: true });
  }

  // submit handler from the form
  handleSubmit = (e) => {
    this.setState({isFormSubmitted: true})
    // if ( this.state.formIsValid ){ // no validation yet ?
      this.nextStep();
      this.setState({isFormSubmitted: false}) // reset state here
    // }
  }

  // click handler for the button
  submitForm = () => {
    this.formRef.current.submit();
  }

  nextStep = () => {
    // const { upload_id, upload_passport, upload_address } = this.state;

    // const leadObj = {
    //   isproduction: isProduction(),
    //   upload_id: upload_id,
    //   upload_passport: upload_passport,
    //   upload_address: upload_address
    // }

    // update the api
    // api
    //   .patch('stakeholders/' + this.props.onboardingId, {
    //     stakeholder: leadObj
    //   })
    //   .then((res) => {
    //     console.log('Backend responce to onboarding PATCH' , res)
    //     this.updateSignup()
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    this.updateSignup()

  }

  updateSignup = () => {

    const { upload_registration, upload_certificate } = this.state;

    this.setState({ isTransitioningNext: true })

    setTimeout(() => {
      this.props.setOnboardingStep(
        this.props.onboardingStep + 1
      );

      this.props.setOnboardingFields({
        ...this.props.onboardingFields,
        upload_registration: upload_registration,
        upload_certificate: upload_certificate
      })

      this.setState({ isTransitioningNext: false })

    }, 400)

  }

  prevStep = () => {
    this.props.setOnboardingStep(
      this.props.onboardingStep - 1
    );
  }

  // filepond
  handleFilePondInit = () => {

  }

  handleFilePindUpload = (fileItems, name) => {
    this.setState({
      [name]: fileItems.map(fileItem => fileItem.file)
    });
  }

  renderFilePondThumbs = (name) => {
    return (
      <Fragment>
        {this.state[name].map(file => (
          <File key={file} src={file} origin="local" />
        ))}
      </Fragment>
    )
  }


  render(){
    const {
      isTransitioningNext
    } = this.state;

    // available options are at https://pqina.nl/filepond/docs/patterns/api/filepond-instance/
    const defaultFilePondOptions = (name) => ({
      allowMultiple: true,
      maxFiles: 3,
      server: "/api",
      required: true,
      instantUpload: true,
      labelIdle: 'Drag a file here or select file to upload <span class="btn btn--small filepond--label-action">Select File</span>',
      oninit: this.handleFilePondInit,
      onupdatefiles: (fileItems) => this.handleFilePindUpload.bind(this, fileItems, name)
    })

    return(
      <div className={"signup__wrapper " + (isTransitioningNext ? "fade-out" : "")} data-aos="fade-left">
        <div className="signup__left">
          <div className="signup__avatar signup__avatar--small">
            <Image file="rifeng-avatar.png" />
          </div>
          <h2>We will need some key documents </h2>
        </div>
        <div className="signup__right">
          <Formsy
            className="signup__form ui-uploader-group"
            onSubmit={this.handleSubmit}
            onValid={this.formValid}
            onInvalid={this.formInvalid}
            ref={this.formRef} >
            <div className="ui-group">
              <label htmlFor="" className="ui-group__label">Please upload a copy of your company’s Certificate of Registration (BizFile or the equivalent in your country)</label>
              <FilePond
                {...defaultFilePondOptions("upload_registration")}
                ref={this.pond[0]}>
                {this.renderFilePondThumbs("upload_registration")}
              </FilePond>
            </div>
            <div className="ui-group">
              <label htmlFor="" className="ui-group__label">Please upload a copy of your Certificate of Appointment of Corporate Representative (this can be obtained from your company’s secretary)</label>
              <FilePond
                {...defaultFilePondOptions("upload_certificate")}
                ref={this.pond[1]}>
                {this.renderFilePondThumbs("upload_certificate")}
              </FilePond>
            </div>
          </Formsy>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  onboardingFields: state.onboardingCorporate.fields,
  onboardingId: state.onboardingCorporate.onboardingId,
  onboardingStep: state.onboardingCorporate.onboardingStep
});

const mapDispatchToProps = (dispatch) => ({
  setOnboardingStep: (data) => dispatch({ type: SET_ONBOARDING_C_STEP, payload: data }),
  setOnboardingFields: (data) => dispatch({ type:SET_ONBOARDING_C_FIELDS, payload: data }),
  setOnboardingId: (data) => dispatch({ type: SET_ONBOARDING_C_ID, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep6);

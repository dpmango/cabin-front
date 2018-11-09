import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
// import {api} from 'services/Api';
// import isProduction from 'services/isProduction';
import { SET_ONBOARDING_I_STEP, SET_ONBOARDING_I_FIELDS, SET_ONBOARDING_I_ID } from 'store/ActionTypes';
import Image from 'components/Image';
// import FormInput from 'components/FormInput';
import { FilePond, File } from 'react-filepond';
// registerPlugin
// import 'filepond/dist/filepond.min.css';
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
// registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

class OnboardingStep5 extends Component {
  static propTypes = {
    setOnboardingStep: PropTypes.func,
    setOnboardingFields: PropTypes.func,
    setOnboardingId: PropTypes.func,
    onboardingFields: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      upload_id: props.onboardingFields.upload_id,
      upload_passport:  props.onboardingFields.upload_passport,
      upload_address:  props.onboardingFields.upload_address,
      errors: [],
      formIsValid: false,
      isTransitioningNext: false,
      isFormSubmitted: false
    };

    this.formRef = React.createRef();

    this.pond = [
      React.createRef(),
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
    this.setState({
      isFormSubmitted: true
    }, () => {
      this.validateCustom(() => { // callback when err state is up
        // if ( this.state.errors.length === 0 ){
          this.nextStep();
          this.setState({isFormSubmitted: false}) // reset state here
        // } 
      });
    })
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

    const { upload_id, upload_passport, upload_address } = this.state;

    this.setState({ isTransitioningNext: true })

    setTimeout(() => {
      this.props.setOnboardingStep(
        this.props.onboardingStep + 1
      );

      this.props.setOnboardingFields({
        ...this.props.onboardingFields,
        upload_id: upload_id,
        upload_passport: upload_passport,
        upload_address: upload_address
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
    console.log(fileItems, name)
    this.setState({
      [name]: fileItems.map(fileItem => fileItem.file)
    }, () => this.validateCustom());
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

  validateCustom = (cb) => {
    const {
      upload_id, upload_passport, upload_address
    } = this.state;

    let buildErrors = []
    if (upload_id.length === 0){
      buildErrors.push("upload_id")
    }
    if (upload_passport.length === 0){
      buildErrors.push("upload_passport")
    }
    if (upload_address.length === 0){
      buildErrors.push("upload_address")
    }

    this.setState({
      ...this.state, errors: buildErrors
    }, cb)
  }

  showError = (name) => {
    if (
      this.state.isFormSubmitted &&
      this.state.errors.indexOf(name) !== -1){
      return <span className="ui-input-validation">Please upload file</span>
    }
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
          <h2>We will need to verify your identity</h2>
        </div>
        <div className="signup__right">
          <Formsy
            className="signup__form ui-uploader-group"
            onSubmit={this.handleSubmit}
            onValid={this.formValid}
            onInvalid={this.formInvalid}
            ref={this.formRef} >
            <div className="ui-group">
              <label htmlFor="" className="ui-group__label">Please upload the front and back copy of your identification card</label>
              <FilePond
                {...defaultFilePondOptions("upload_id")}
                ref={this.pond[0]}>
                {this.renderFilePondThumbs("upload_id")}
              </FilePond>
              { this.showError("upload_id") }
            </div>
            <div className="ui-group">
              <label htmlFor="" className="ui-group__label">Please upload a copy of your passport</label>
              <FilePond
                {...defaultFilePondOptions("upload_passport")}
                ref={this.pond[1]}>
                {this.renderFilePondThumbs("upload_passport")}
              </FilePond>
              { this.showError("upload_passport") }
            </div>
            <div className="ui-group">
              <label htmlFor="" className="ui-group__label">[For foreigners only]: Please upload a copy a recent (last 3 months) proof of address (e.g. bank statements or bills)</label>
              <FilePond
                {...defaultFilePondOptions("upload_address")}
                ref={this.pond[2]}>
                {this.renderFilePondThumbs("upload_address")}
              </FilePond>
              { this.showError("upload_address") }
            </div>

          </Formsy>
        </div>
      </div>

    )
  }
}


const mapStateToProps = (state) => ({
  onboardingFields: state.onboardingIndividual.fields,
  onboardingId: state.onboardingIndividual.onboardingId,
  onboardingStep: state.onboardingIndividual.onboardingStep
});

const mapDispatchToProps = (dispatch) => ({
  setOnboardingStep: (data) => dispatch({ type: SET_ONBOARDING_I_STEP, payload: data }),
  setOnboardingFields: (data) => dispatch({ type:SET_ONBOARDING_I_FIELDS, payload: data }),
  setOnboardingId: (data) => dispatch({ type: SET_ONBOARDING_I_ID, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep5);

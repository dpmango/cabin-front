import React, { Component } from 'react';
import SvgIcon from '../components/SvgIcon';

export default class Testimonial extends Component {
  render(){

    const { content, authorImage, authorName, authorTitle } = this.props;

    function renderContentHtml() {
      return {__html: content};
    }

    return(
      <div className="testimonial">
        <div className="testimonial__wrapper">
          <div className="testimonial__icon">
            <SvgIcon name="quote" />
          </div>
          <div className="testimonial__content">
            <p dangerouslySetInnerHTML={renderContentHtml()} />
            {/* <p dangerouslySetInnerHTML={content} /> */}
            <div className="testimonial__author">
              <div className="testimonial__author-avatar">
                <img src={require(`../images/${authorImage}.png`)} srcSet={require(`../images/${authorImage}@2x.png`)  + ' 2x'} alt=""/>
              </div>
              <div className="testimonial__author-text"><span>{authorName},</span> {authorTitle}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

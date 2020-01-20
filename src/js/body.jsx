import React from 'react'
import NarrowColumn from './narrow_column'
import MediumColumn from './medium_column'
import WideColumn from './wide_column'

export default class Body extends React.Component {
  constructor(props) {
    super(props);

    if (typeof window.page_body_id === 'undefined')
      window.page_body_id = 0;

    props.myid = 'page_body_' + ++(window.page_body_id); // support multiple bodies on a page
    this.myRef = React.createRef();
  }

  componentDidMount() {
    const node = this.myRef.current;
    $('#' + node.id).load(this.props.src)
  }

  render() {
    if (typeof this.props.column !== 'undefined') {
      if (this.props.column == 'narrow')
        return (
          <NarrowColumn>
            <div ref={this.myRef} id={this.props.myid} />
          </NarrowColumn>
        )
      if (this.props.column == 'medium')
        return (
          <MediumColumn>
            <div ref={this.myRef} id={this.props.myid} />
          </MediumColumn>
        )
      if (this.props.column == 'wide')
        return (
          <WideColumn>
            <div ref={this.myRef} id={this.props.myid} />
          </WideColumn>
        )
    }
    return (<div ref={this.myRef} id={this.props.myid} />)
  }
}

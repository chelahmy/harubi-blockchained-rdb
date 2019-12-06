import React from 'react'

export default class Body extends React.Component {
  constructor(props) {
    super(props);

    if (typeof window.page_body_id === 'undefined')
      window.page_body_id = 0;

    props.myid = 'page_body_' + ++(window.page_body_id); // support multiple bodies
    this.myRef = React.createRef();
  }

  componentDidMount() {
    const node = this.myRef.current;
    $('#' + node.id).load(this.props.src)
  }

  render() {
    return <div ref={this.myRef} id={this.props.myid} />;
  }
}

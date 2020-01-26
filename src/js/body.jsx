import React from 'react'
import Title from './title'
import NarrowColumn from './narrow_column'
import MediumColumn from './medium_column'
import WideColumn from './wide_column'

export default class Body extends React.Component {
  constructor(props) {
    super(props)

    if (typeof window.page_body_id === 'undefined')
      window.page_body_id = 0

    this.myid = 'page_body_' + ++(window.page_body_id) // support multiple bodies on a page
  }

  componentDidMount() {
    $('#' + this.myid).load(this.props.src, () => {
      if (typeof window.bodyDidLoad === 'function')
        window.bodyDidLoad(this.myid)
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.src != this.props.src)
      $('#' + this.myid).load(this.props.src, () => {
        if (typeof window.bodyDidLoad === 'function')
          window.bodyDidLoad(this.myid)
      })
  }

  render() {
    let title
    if (typeof this.props.title !== 'undefined')
      title = (<Title title={this.props.title}/>)
    if (typeof this.props.column !== 'undefined') {
      if (this.props.column == 'narrow')
        return (
          <div>
            {title}
            <NarrowColumn>
              <div id={this.myid} />
            </NarrowColumn>
          </div>
        )
      if (this.props.column == 'medium')
        return (
          <div>
            {title}
            <MediumColumn>
              <div id={this.myid} />
            </MediumColumn>
          </div>
        )
      if (this.props.column == 'wide')
        return (
          <div>
            {title}
            <WideColumn>
              <div id={this.myid} />
            </WideColumn>
          </div>
        )
    }
    return (
      <div>
        {title}
        <div id={this.myid} />
      </div>
    )
  }
}

import React, {Component} from 'react'
import { Button } from 'semantic-ui-react'

class ButtonConditionals extends Component {
  render() {
    return (
      <Button.Group>
        <Button onClick={this.props.firstHandler}>{this.props.first}</Button>
        <Button.Or />
        <Button positive onClick={this.props.secondHandler}>{this.props.second}</Button>
      </Button.Group>
    )
  }
}

export default ButtonConditionals;
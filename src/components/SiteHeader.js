import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import FixedTopMenu from './FixedTopMenu';

export default class SiteHeader extends Component {
  
  render() {

    return (
      <FixedTopMenu />
    )
  }
}
import React, { Component } from 'react'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  Input,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify'

import '../styles/global.scss'
import '../styles/test.css'

export default class FixedTopMenu extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleSignOut = async () => {
    await Auth.signOut()
  }

  render() {
    const { activeItem } = this.state
    return (
      <Menu secondary stackable>
        <Container>
          <Menu.Item header >
            <Link to="/">
            <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
            </Link>
          </Menu.Item>
          <Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick} className='menu-link'><Link to="/about">About</Link></Menu.Item>
          <Menu.Item name='bites' active={activeItem === 'bites'} onClick={this.handleItemClick} className='css-menu-link'><Link to="/bites">Bites</Link></Menu.Item>

          <Dropdown item simple text='Forums' style={{color: '#00b5ad'}}>
            <Dropdown.Menu>
              <Dropdown.Item name='datalego' active={activeItem === 'datalego'} onClick={this.handleItemClick}><Link to="/forum/datalego">DataL:go</Link></Dropdown.Item>
              <Dropdown.Item><Link to="/forum/microbot">Micro-bot</Link></Dropdown.Item>
              {/* <Dropdown.Divider />
              <Dropdown.Header>ARTICLES</Dropdown.Header>
              <Dropdown.Item>
                <i className='dropdown icon' />
                <span className='text'>Subject</span>
                <Dropdown.Menu>
                  <Dropdown.Item><Link to="/subject/comvision" style={{color:'#282c34'}}>Computer Vision</Link></Dropdown.Item>
                  <Dropdown.Item><Link to="/subject/react" style={{color:'#282c34'}}>React as-a-Frontend</Link></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown item simple text='Subjects' style={{color: '#00b5ad'}}>
            <Dropdown.Menu>
              <Dropdown.Item name='comvision' active={activeItem === 'comvision'} onClick={this.handleItemClick}><Link to="/subject/comvision">Computer Vision</Link></Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item><Link to="/subject/react">React as-a-Frontend</Link></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item name='projects' active={activeItem === 'projects'} onClick={this.handleItemClick}><Link to="/projects">Projects</Link></Menu.Item>

          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' style={{borderColor: '#00b5ad', color: '#00b5ad'}} />
            </Menu.Item>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.handleItemClick, this.handleSignOut}
              style={{color: '#00b5ad'}}
            />
          </Menu.Menu>
        </Container>
      </Menu>
    )
  }
}

// const FixedTopMenu = () => (

// )

// export default FixedTopMenu
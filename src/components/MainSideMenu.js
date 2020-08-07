import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import '../../node_modules/admin-lte/plugins/fontawesome-free/css/all.min.css'
import '../../node_modules/admin-lte/plugins/ion-rangeslider/css/ion.rangeSlider.min.css'
import '../../node_modules/admin-lte/plugins/bootstrap-slider/css/bootstrap-slider.min.css'
import TreeMenu, { defaultChildren, ItemComponent, } from 'react-simple-tree-menu'

import { Link, Redirect, withRouter } from 'react-router-dom'
import { TreeviewMenu } from './TreeviewMenu'
// import { Treeview } from 'admin-lte'

const menuData = [
  {
    key: "forums",
    label: "Open Forums",
    nodes: [
      {
        key: "standards",
        label: "Standards/Regulation",
        href: "/forums/standards",
        url: "https://www.google.com/search?q=canidae",
        nodes: []
      },
      {
        key: "ds",
        label: "Data Science",
        url: "https://www.google.com/search?q=canidae",
        nodes: []
      },
      {
        key: "da",
        label: "Data Analytics",
        url: "https://www.google.com/search?q=canidae",
        nodes: []
      },
      {
        key: "microbot",
        label: "Micro Robot",
        url: "https://www.google.com/search?q=canidae",
        nodes: []
      },
      {
        key: "opencv",
        label: "Computer Vision",
        url: "https://www.google.com/search?q=canidae",
        nodes: []
      },
    ]
  },
  {
    key: "projects",
    label: "Project Archive",
    url: "https://www.google.com/search?q=reptile",
    nodes: [
      {
        key: "parent",
        label: "Parent Menu 1",
        url: "https://www.google.com/search?q=squamata",
        nodes: [
          {
            key: "alpha",
            label: "Child Alpha",
            url: "https://www.google.com/search?q=lizard"
          },
          {
            key: "beta",
            label: "Child Beta",
            url: "https://www.google.com/search?q=snake"
          },
          {
            key: "ceta",
            label: "Child Ceta",
            url: "https://www.google.com/search?q=gekko"
          }
        ]
      }
    ]
  }
];

class MainSideMenu extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    currentUserId: "",
    currentUsername: "",
    data: {
      'first-level-node-1': {               // key
        label: 'Parent 1',
        index: 0, // decide the rendering order on the same level
        nodes: {
          'second-level-node-1': {
            label: 'child 1',
            index: 0,
            nodes: {
              'third-level-node-1': {
                label: 'pet 1',
                index: 0,
                nodes: {} // you can remove the nodes property or leave it as an empty array
              },
            },
          },
        },
      },
      'first-level-node-2': {
        label: 'Parent 2',
        index: 1,
      },
    }
  }

  componentDidMount = async () => {

    // get/set the current signed-in user
    await Auth.currentUserInfo()
      .then(user => {
        this.setState({
          currentUserId: user.username,
          currentUsername: user.attributes.email.split('@')[0]
        })
      })
      
  }

  handlerSideMenuItem = async (key) => {
    console.log(`Route to : /${key}`)
    // this.props.history.push(`/${key}`)
    return (
      // <Redirect to={`/${key}`} />
      // <Redirect to='/forums/standards' />
      await this.props.history.push('/forums/standards')
    )
  }


  render() {
    return (
      <div>
        {/* Main Sidebar Container */}
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <a href="/home" className="brand-link">
            <img src="../../roboticists.png" alt="Roboticists Logo" className="brand-image elevation-3" style={{opacity: '1.0'}} />
            <span className="brand-text font-weight-light"><b>Roboticists</b></span>
          </a>
          {/* Sidebar */}
          <section className="sidebar">
            {/* Sidebar user panel (optional) */}
            <section className="user-panel mt-3 pb-3 mb-3 d-flex">
              <p className="image">
                <img src="https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" className="img-circle elevation-2" alt="User Image" />
              </p>
              <p className="info">
                <a href="#" className="d-block">{this.state.currentUsername}</a>
              </p>
            </section>
            {/* Sidebar Menu */}
            <nav className="mt-2">
              {/* <TreeMenu data={this.state.data} hasSearch={false} /> */}

              <ul className="nav nav-pills nav-sidebar nav-child-indent flex-column" data-widget="treeview" role="menu">
                {/* <TreeView data={this.state.data} /> */}
                
                <li className="nav-item">
                  <a href="/forums/standards" className="nav-link">
                    <i className="nav-icon fas fa-th" />
                    <p>Visiton / Mission</p>
                  </a>
                </li>
              </ul>

              <TreeviewMenu 
                data={menuData}
                openNodes="forums"
                styleGroup="nav nav-pills nav-sidebar nav-child-indent flex-column"
                onClickItem={(key) => this.handlerSideMenuItem(key)}
              />

              
            </nav>
            {/* /.sidebar-menu */}
          </section>
          {/* /.sidebar */}
        </aside>
      </div>
    )
  }
}

export default withRouter (MainSideMenu)
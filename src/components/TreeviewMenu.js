import React, { Children } from 'react'
import TreeMenu, { ItemComponent, KeyDown }  from 'react-simple-tree-menu'
import { Link } from 'react-router-dom'


const TreeviewMenu = (props) => {
  

  return (
      <TreeMenu
        data={props.data}
        resetOpenNodesOnDataUpdate
        initialOpenNodes={props.openNodes}
        // onClickItem={function noRefCheck(items){return console.log("clicked!!!! - ", items.key)}}
        onClickItem={(items) => props.onClickItem(items.key)}
        style={{backgroundColor: '#fff'}}
      >
        {({ items }) => (
          <ul className={props.styleGroup}>
            {items.map(({ key, onClickItem, ...props }) => (
              <ItemComponent 
                key={key}
                openedIcon={<i className="fas fa-angle-down"></i>} 
                closedIcon={<i className="fas fa-angle-right"></i>} 
                style={{backgroundColor: '#transparent'}}
                {...props} />
            ))}
          </ul>
        )}
      </TreeMenu>
  )
}

export { TreeviewMenu }

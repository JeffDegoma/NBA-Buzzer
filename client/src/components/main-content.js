import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group' // ES6
import Fader from './Fader'



class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: ['hello', 'world', 'click', 'me']};
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    const newItems = this.state.items.concat([
      prompt('Enter some text')
    ]);
    this.setState({items: newItems});
  }

  handleRemove(i) {
    let newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({items: newItems});
  }

  render() {
    const items = this.state.items.map((item, i) => (
      <div key={item} onClick={() => this.handleRemove(i)}>
        {item}
      </div>
    ));

    return (
      <div className="main-content">
        <button onClick={this.handleAdd}>Add Item</button>
        <Fader>
          {items}
        </Fader>
      </div>
    );
  }
}

export default TodoList;

// class MainContent extends React.Component {


//     render() {

//         return (
//                 <div className="main-content">
//                    hey
//                 </div>
//         );
//     }
// }

// export default MainContent;

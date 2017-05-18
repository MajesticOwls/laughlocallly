import React from 'react';
import $ from 'jquery';
var socket = io.connect();

class Message extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <strong>{this.props.name}: </strong> {this.props.text}
      </div>
    );
  }
}

class MessageList extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <div className="panel-body">
          {this.props.messages.map((message, i) =>
              <Message key={i} name={message.name} text={message.text} />
          )}
        </div>
      </div>
    );
  }
}

class MessageForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      text: '',
      name: null,
      hideName: true,
      users: [],
      usersList: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var message = {
      name : this.state.name,
      text : this.state.text,
    }
    console.log('message', message);
    this.props.onMessageSubmit(message);
    this.setState({ text: '' });
  }

  handleNameInput(e) {
    e.preventDefault();
    this.setState({ name : e.target.value });
  }


  hideName() {
    this.setState({
      hideName: false
    })
  }



  handleTextInput(e) {
    e.preventDefault();
    if (this.state.name !== null) {
      this.setState({
        hideName: false
      })
    }
    this.setState({ text : e.target.value });
  }

  SearchUser() {
    var context = this;
    $.ajax({
      url: '/history',
      type: 'GET',
      datatype: 'json'
    })
    .done((data) => {
      success: (data) => {
        context.setState({
          users: data,
          userList: true
        })
      }
    })
    .fail((err) => {
      console.log('failed to GET', err);
    })
  }

  render() {
    return(
      <div>
      <form onSubmit={this.handleSubmit}>
      {this.state.hideName ?
        <input type='text' placeholder="Your Name Here" className="form-control inputText" onChange={this.handleNameInput} value={this.state.name} /> :
        null
        }
        <input type='text' placeholder="Your Message Here" className="form-control inputText" onChange={this.handleTextInput} value={this.state.text} />
        <button onChange={this.hideName} hidden="hidden" type="submit" className="btn-sm btn-primary">Submit</button>

        </form>
      {this.state.hideName ? null : <button onClick={this.SearchUsers} className= "btn">{this.state.userList ? <div>Main Chat</div> : <div>Users</div>}</button>}
      </div>
    );
  }
}

class ChatBoxNav extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      nextEvent: {},
      users: [],
      messages: [],
      text: ''
    }
    this.newMessage = this.newMessage.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  componentDidMount () {
    socket.on('send:message', this.newMessage);
    console.log('props in chatbox', this.props.data)
    const nextEvent = this.props.data[0];
    console.log('nextEvent', nextEvent)
    this.setState({
      nextEvent: nextEvent
    })
  }

  newMessage (newMessage) {
    var messages = this.state.messages;
    messages.push(newMessage);
    this.setState({
      messages: messages
    })
  }

  handleMessageSubmit(newMessage) {
    var messages = this.state.messages;
    messages.push(newMessage);
    this.setState({
      messages: messages
    })
    socket.emit('send:message', newMessage);
  }

  handleChangeName(newName) {
    var oldName = this.state.user;
    socket.emit('change:name', { name : newName}, (result) => {
      if(!result) {
        return alert('There was an error changing your name');
      }
      var {users} = this.state;
      var index = users.indexOf(oldName);
      users.splice(index, 1, newName);
      this.setState({users, user: newName});
    });
  }

  render() {
    return (
      <div>
        <div className='container panel-body'>
          <MessageList messages={this.state.messages} />
        </div>

        <div className='container chatNav'>
          <MessageForm onMessageSubmit={this.handleMessageSubmit}/>
        </div>
      </div>
    );
  }
}

export default ChatBoxNav;

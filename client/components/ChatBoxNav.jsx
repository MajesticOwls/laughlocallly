import React from 'react';
import $ from 'jquery';
var socket = io.connect();

// class for each message
class Message extends React.Component {
  constructor (props) {
    super(props);
  }
componentDidMount(){
  this.scrollToBottom();
}
scrollToBottom() {
  $(".panel-body").animate({ scrollTop: $(document).height() }, "fast");
  return false;
}
  render () {
    return (
      <div>
        <strong>{this.props.name}: </strong> {this.props.text}
      </div>
    );
  }
}

//class that returns the list of messages
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

//functions for submitting messages and name
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
    this.SaveMessages(message);
    this.props.onMessageSubmit(message);
    this.setState({ text: '' });
  }

  SaveMessages(message) {
    $.ajax({
      type: 'POST',
      url: '/message/save',
      contentType: 'application/JSON',
      data: JSON.stringify({
              name: message.name,
              text: message.text
            })
    })
    .done((data) => {
      success: (data) => {
        console.log('messaged Saved', data);
      }
    })
    .fail((err) => {
      console.log('failed to GET', err);
    })
  }

  returnMessage() {
     $.ajax({
      type: 'GET',
      url: '/message/return',
      datatype: 'json'
    })
    .done((data) => {
      console.log('messages return', data);
    })
    .fail((err) => {
      console.log('messages not returned');
    })
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

//socket IO container for displaying the MessageList
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
    this.returnMessage();
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

  scrollToBottom() {
    $(".panel-body").animate({ scrollTop: $(document).height() }, "slow");
    return false;
  }
    returnMessage() {
       $.ajax({
        type: 'GET',
        url: '/message/return',
        datatype: 'json'
      })
      .done((data) => {
        console.log('messages return', data);
        this.setState({
          messages: data
        })
      })
      .fail((err) => {
        console.log('messages not returned');
      })
    }

  handleMessageSubmit(newMessage) {
    var messages = this.state.messages;
    messages.push(newMessage);
    console.log('1',messages[messages.length-1]);

    this.setState({
      messages: messages
    })
    socket.emit('send:message', newMessage);
    this.scrollToBottom();
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

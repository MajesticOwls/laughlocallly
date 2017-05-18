import React from 'react';
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
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Conversation</h3>
          </div>
          <div className="panel-body">
            {this.props.messages.map((message, i) =>
                <Message key={i} name={message.name} text={message.text} />
            )}
          </div>
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
      name: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var message = {
      name : this.state.name,
      text : this.state.text
    };
    console.log('message', message);
    this.props.onMessageSubmit(message);
    this.setState({ text: '' });
  }

  handleNameInput(e) {
    e.preventDefault();
    this.setState({ name : e.target.value });
  }

  handleTextInput(e) {
    e.preventDefault();
    this.setState({ text : e.target.value });
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input type='text' placeholder="Your Name Here" className="form-control" onChange={this.handleNameInput} value={this.state.name} />
        <input type='text' placeholder="Your Message Here" className="form-control" onChange={this.handleTextInput} value={this.state.text} />
        <button type="submit" className="btn-sm btn-primary">Submit</button>
      </form>
    );
  }
}

class ChatBox extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      nextEvent: {},
      users: [],
      messages: [],
      text: ''
    };
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
        <div className='container'>
          <ul className="media-list">
            <li className="media">
              <div className="media-left">
                <a href="#">
                  <img className="media-object" src={this.state.nextEvent.photo_url} alt="..." />
                </a>
              </div>
              <div className="media-body">
                <h2><small>Next Event:</small> </h2>
                <h4>{this.state.nextEvent.name}</h4>
                <p><strong>Date:</strong> {this.state.nextEvent.date}</p>
                <p><strong>Time:</strong> {this.state.nextEvent.start_time}</p>
                <p><strong>Description:</strong> {this.state.nextEvent.description}</p>
              </div>
            </li>
          </ul>
        </div>

        <div className='container'>
          <MessageList messages={this.state.messages} />
        </div>

        <div className='container'>
          <MessageForm onMessageSubmit={this.handleMessageSubmit}/>
        </div>
      </div>
    );
  }
}

export default ChatBox;

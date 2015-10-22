/** In this file, we create a React component which incorporates components provided by material-ui */

const React = require('react');
const RaisedButton = require('material-ui/lib/raised-button');
const Dialog = require('material-ui/lib/dialog');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
const Colors = require('material-ui/lib/styles/colors');
const TextField = require('material-ui/lib/text-field');
const AppBar = require('material-ui/lib/app-bar');
const FlatButton = require('material-ui/lib/flat-button');
const Avatar = require('material-ui/lib/avatar');
const LeftNav = require('material-ui/lib/left-nav');
const MenuItem = require('material-ui/lib/menu/menu-item');
const Card = require('material-ui/lib/card/card');
const CardHeader = require('material-ui/lib/card/card-header');
const CardMedia = require('material-ui/lib/card/card-media');
const CardTitle = require('material-ui/lib/card/card-title');
const CardActions = require('material-ui/lib/card/card-actions');
const CardText = require('material-ui/lib/card/card-text');

var Main = React.createClass({
  handleSubmit: function(e) {
      this.refs.superSecretPasswordDialog.show();
  },
  render: function() {
    let standardActions = [
      { text: 'Okay' }
    ];    
    let menuItems = [
  { route: 'get-started', text: 'Get Started' },
  { route: 'customization', text: 'Customization' },
  { route: 'components', text: 'Components' },
  { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
  {
     type: MenuItem.Types.LINK,
     payload: 'https://github.com/callemall/material-ui',
     text: 'GitHub'
  },
  {
     text: 'Disabled',
     disabled: true
  },
  {
     type: MenuItem.Types.LINK,
     payload: 'https://www.google.com',
     text: 'Disabled Link',
     disabled: true
  },
];



    return (
      <div>
<AppBar
  title="Title"
  iconClassNameRight="muidocs-icon-navigation-expand-more"
iconElementRight={<c><FlatButton label="Save" /><FlatButton label="Sing in" /><Avatar src="images/uxceo-128.jpg" /></c>} 
   />
   {/*
   <LeftNav ref="leftNav" menuItems={menuItems} />
 */}
       <Dialog
          title="Super Secret Password"
          actions={standardActions}
          ref="superSecretPasswordDialog">
          <LoginForm />
        </Dialog>      

      <RaisedButton label="로그인" primary={true} onTouchTap={this.handleSubmit} />


<Card>
  <CardHeader
    title="Title"
    subtitle="Subtitle"
    avatar={<Avatar>A</Avatar>}/>
  <CardHeader
    title="Demo Url Based Avatar"
    subtitle="Subtitle"
    avatar="http://lorempixel.com/100/100/nature/"/>
  <CardMedia overlay={<CardTitle title="Title" subtitle="Subtitle"/>}>
    <img src="http://lorempixel.com/600/337/nature/"/>
  </CardMedia>
  <CardTitle title="Title" subtitle="Subtitle"/>
  <CardActions>
    <FlatButton label="Action1"/>
    <FlatButton label="Action2"/>
  </CardActions>
  <CardText>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
  </CardText>
</Card>

      </div>
    );
  }

});

var LoginForm = React.createClass({
  getInitialState () {  
    return {
      message: ''
    };
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var id = this.refs.login_id.getValue().trim();
    var pw = this.refs.login_pw.getValue().trim();
    if (!id) {
      this.setState({message:'아이디를 입력해주세요.'});
      this.refs.superSecretPasswordDialog.show();
      return;
    }

    if (!pw) {
      this.setState({message:'비밀번호를 입력해주세요.'});
      this.refs.superSecretPasswordDialog.show();
      return;
    }
    $.ajax({
      url: 'http://localhost:8080/login',
      dataType: 'json',
      type: 'POST',
      data: {id:id, pw:pw},
      success: function(data) {
        //this.setState({data: data});
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },




  render: function() {
    let standardActions = [
      { text: 'Okay' }
    ];    
    return (
      <form onSubmit={this.handleSubmit}>
       <Dialog
          title="Super Secret Password"
          actions={standardActions}
          ref="superSecretPasswordDialog">
          {this.state.message}
        </Dialog>      
        <div><TextField ref="login_id" floatingLabelText="name or email" /></div>
        <div><TextField ref="login_pw" floatingLabelText="password" /></div>
        <div><RaisedButton label="로그인" primary={true} onTouchTap={this.handleSubmit} /></div>
      </form>
    );
  }
});
/*
const Main = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getInitialState () {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillMount() {
    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.deepOrange500
    });

    this.setState({muiTheme: newMuiTheme});
  },

  Ω() {

    let containerStyle = {
      textAlign: 'center',
      paddingTop: '200px'
    };

    let standardActions = [
      { text: 'Okay' }
    ];

    return (
      <div style={containerStyle}>
        <Dialog
          title="Super Secret Password"
          actions={standardActions}
          ref="superSecretPasswordDialog">
          1-2-3-4-5
        </Dialog>

        <h1>material-ui</h1>
        <h2>example project</h2>

        <RaisedButton label="Super Secret Password" primary={true} onTouchTap={this._handleTouchTap} />

      </div>
    );
  },

  _handleTouchTap() {
    this.refs.superSecretPasswordDialog.show();
  }

});*/

module.exports = Main;

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

  handleArticleSubmit: function(article) {
    // TODO: 서버에 요청을 수행하고 목록을 업데이트한다
	$.ajax({
      url: 'http://stylecomp.herokuapp.com/write',
      dataType: 'json',
      type: 'POST',
      data: article,
      success: function(data) {
        //this.setState({data: data});
        this.componentDidMount();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function() {
    return {article: []};
  },


 componentDidMount: function() {
    $.ajax({
      url: 'http://stylecomp.herokuapp.com/new',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({article: data});
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
iconElementRight={<c><FlatButton label="Save" /><FlatButton label="Sing in" /><Avatar src="http://lorempixel.com/100/100/nature/" /></c>} 
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

 		<WriteForm  onArticleSubmit={this.handleArticleSubmit} />
 		<Article article={this.state.article}  />
      </div>
    );
  }

});






var Article = React.createClass({
	render: function() {

    var commentNodes = this.props.article.map(function (card) {
		return (
<Card style={{margin:'20px auto', maxWidth:'500px'}}>
  <CardHeader
    title={card.author}
    subtitle="Subtitle"
    avatar="http://lorempixel.com/100/100/nature/"/>
  <CardText>
  {card.content}
  </CardText>
  <CardActions>
    <FlatButton label="좋아요"/>
  </CardActions>
</Card>
			);});

	 return (
        <div>{commentNodes}</div>
    );    

	}
});

var WriteForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var content = this.refs.content.getValue().trim();
    if (!content) {
      return;
    }
    this.props.onArticleSubmit({content: content});
    this.refs.content.setValue('');
    return;
  },
	render: function() {
		return (
			<Card style={{margin:'20px auto', maxWidth:'500px'}}>
			  <CardHeader
			    title="Demo Url Based Avatar"
			    subtitle="Subtitle"
			    avatar="http://lorempixel.com/100/100/nature/"/>
			<div style={{paddingLeft:'10px', paddingRight:'10px'}}>
				<TextField  style={{width:'100%'}}
				  floatingLabelText="여기에 글을 쓰세요."
				  multiLine={true} rows="5" ref="content" />
			</div>
			  <CardActions style={{textAlign:'right'}}>
			    <FlatButton label="글쓰기" primary={true} onTouchTap={this.handleSubmit} />
			  </CardActions>
			</Card>
			)
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
      url: 'http://stylecomp.herokuapp.com/login',
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

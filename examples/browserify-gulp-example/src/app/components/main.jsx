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
const Snackbar = require('material-ui/lib/snackbar');
const IconButton = require('material-ui/lib/icon-button');
const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');

var loginDialog;
var joinDialog;
var mainSnackbar;

var MainSnackBar = React.createClass({
  getInitialState: function() {
    return {message:''};
  },
 componentDidMount: function() {
    mainSnackbar = this; 
  },
  show: function() {
    this.refs.snackbar.show();
  },
  setMessage: function(msg) {
    this.setState({message:msg});
  },

  render: function() {
    return (
        <Snackbar
          message={this.state.message}
          ref="snackbar" />
          )
  }
})

var JoinDialog = React.createClass({
 componentDidMount: function() {
    joinDialog = this.refs.joinDialog;
  },

  render: function() {
    return (
         <Dialog
            title="회원가입하기"
            ref="joinDialog">
          <div style={{textAlign:'center'}}>
            <JoinForm />
            </div>
          </Dialog>
      )
  }
});

var LoginDialog = React.createClass({
   componentDidMount: function() {
      loginDialog = this.refs.loginDialog;
    },

  render: function() {
    let standardActions = [
      { text: 'Okay' }
    ];    

    return (
       <Dialog
          title="로그인하기"
          ref="loginDialog">
          <div style={{textAlign:'center'}}>
          <LoginForm />
          </div>
        </Dialog>      
      )
  }
});

var Main = React.createClass({
  handleArticleSubmit: function(article) {
    alert(JSON.stringify(article));
    // TODO: 서버에 요청을 수행하고 목록을 업데이트한다
    $.support.cors = true;
    $.ajax({
      xhrFields: {
          withCredentials: true
      },
      url: 'http://localhost:8080/write',
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
    return {article: [], tabsValue:''};
  },


 componentDidMount: function() {
    $.support.cors = true;
    $.ajax({
      xhrFields: {
          withCredentials: true
      },

      url: 'http://localhost:8080/new',
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

  _handleTabsChange: function() {

  },
  _handleButtonClick: function() {

  },

  render: function() {
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

  let padding = 400;

 let styles = {
      contentContainerStyle: {
        marginLeft: -padding,
      },
      div: {
        position: 'absolute',
        left: 48+200,
        backgroundColor: Colors.cyan500,
        width: padding,
        height: 48,
      },
      headline: {
        fontSize: 24,
        lineHeight: '32px',
        paddingTop: 16,
        marginBottom: 12,
        letterSpacing: 0,
//        fontWeight: Typography.fontWeightNormal,
//        color: Typography.textDarkBlack,
      },
      tabBarButton: {
        position: 'absolute',
        left: 80,
        backgroundColor: Colors.cyan500,
        color: 'white',
        marginRight: padding,
      },
      iconButton: {
        position: 'absolute',
        left: 0,
        backgroundColor: Colors.cyan500,
        color: 'white',
        marginRight: padding,
      },
      iconStyle: {
        color: Colors.white,
      },
      tabs: {
        position: 'relative',
      },
      tabsContainer: {
        position: 'relative',
        paddingLeft: padding,
      },
    };

    return (
      <div>
 <div style={styles.tabsContainer}>
            <IconButton
              onClick={this._handleButtonClick.bind(this)}
              iconClassName="material-icons"
              style={styles.iconButton}
              iconStyle={styles.iconStyle}>
              home
            </IconButton>
                <FlatButton label="test" style={styles.tabBarButton} />
            <div style={styles.div}/>
              <Tabs
                valueLink={{value: this.state.tabsValue, requestChange: this._handleTabsChange.bind(this)}}
                style={styles.tabs}
                contentContainerStyle={styles.contentContainerStyle}>
                <Tab label="Tab A" value="a">
                  <div>
                    <h2 style={styles.headline}>Controllable Tab Examples</h2>
                    <p>
                      Tabs are also controllable if you want to programmatically pass them their values.
                      This allows for more functionality in Tabs such as not
                      having any Tab selected or assigning them different values.
                    </p>
                    <p>(The home Icon Button will unselect all the tabs and hide their content.)</p>
                  </div>
                </Tab>
                <Tab label="Tab B" value="b">
                  <div>
                    <h2 style={styles.headline}>Controllable Tab B</h2>
                    <p>
                      This is another example of a controllable tab. Remember, if you
                      use controllable Tabs, you need to give all of your tabs values or else
                      you wont be able to select them.
                    </p>
                    <p>
                      To see one use for controlled Tabs, press the home button on the right.
                    </p>
                  </div>
                </Tab>
              </Tabs>
          </div>


<AppBar
  title="Title"
  iconClassNameRight="muidocs-icon-navigation-expand-more"
iconElementRight={<span><FlatButton style={{backgroundColor:'rgba(255,255,255,0)'}} label="Sign in" onTouchTap={()=>{loginDialog.show();}} /><FlatButton label="Sign up" onTouchTap={()=>{joinDialog.show();}}/><Avatar src="http://lorempixel.com/100/100/nature/" /></span>} 
   />
   {/*
   <LeftNav ref="leftNav" menuItems={menuItems} />
 */}
      <LoginDialog />
      <JoinDialog />
      <MainSnackBar />

 		<WriteForm  onArticleSubmit={this.handleArticleSubmit} />
 		<Article article={this.state.article}  />
      </div>
    );
  }

});


var LikeButton = React.createClass({
 handleLikeSubmit: function(e) {
    e.preventDefault();
    $.support.cors = true;
    $.ajax({
      xhrFields: {
          withCredentials: true
      },
      url: 'http://localhost:8080/good/3',
      dataType: 'json',
      type: 'POST',
      data: '',
      xhrFields: {
          withCredentials: true
      },      
      success: function(data) {
        if (!data.result) {
          loginDialog.show();
        }

        //this.setState({data: data});
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
render: function() {
  return (
    <FlatButton label="좋아요" onTouchTap={this.handleLikeSubmit} />
    )
}
});

var CommentWrite = React.createClass({
  handleArticleSubmit: function(comment) {
    // TODO: 서버에 요청을 수행하고 목록을 업데이트한다
    $.support.cors = true;
    $.ajax({
      xhrFields: {
          withCredentials: true
      },
      url: 'http://localhost:8080/comment/'+this.props.article_no,
      dataType: 'json',
      type: 'POST',
      data: {comment:comment},
      success: function(data) {
        //this.setState({data: data});
//        this.componentDidMount();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var comment = this.refs.comment.getValue().trim();
    if (!comment) {
      return;
    }
//    this.props.onArticleSubmit({content: content});
    this.handleArticleSubmit(comment);
    this.refs.comment.setValue('');
    return;
  },
  render: function() {
    return (
    <div>
    <Avatar   src="http://lorempixel.com/100/100/nature/" />
    test
      <TextField 
    floatingLabelText="여기에 글을 쓰세요." ref="comment" />
          <FlatButton label="글쓰기" primary={true} onTouchTap={this.handleSubmit}  />

    </div>      
      )
  }
});

var CommentList = React.createClass({
  render : function() {
    var commentNodes = this.props.comment.map(function(comment) {
        return(
          <div>{comment.comment_author} {comment.comment}</div>
        );});


    return (<div>{commentNodes}</div>);
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
    <LikeButton />
  </CardActions>
  <CardActions>
  </CardActions>
    <CommentList comment={card.comment_list} />
    <CommentWrite article_no={card.article_no} />
  }
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
    return {message: ''};
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var id = this.refs.login_id.getValue().trim();
    var pw = this.refs.login_pw.getValue().trim();
    if (!id) {
      this.setState({message:'아이디를 입력해주세요.'});
      this.refs.snackbar.show();
      return;
    }

    if (!pw) {
      this.setState({message:'비밀번호를 입력해주세요.'});
      this.refs.snackbar.show();
      return;
    }
    $.support.cors = true;
    $.ajax({
      xhrFields: {
          withCredentials: true
      },
      url: 'http://localhost:8080/login',
      dataType: 'json',
      type: 'POST',
      data: {id:id, pw:pw},
      success: function(data) {
        if (data.result) {
          loginDialog.dismiss();
          mainSnackbar.setMessage('로그인에 성공하였습니다');
          mainSnackbar.show();
        } else { 
          this.setState({message:data.message});
          this.refs.snackbar.show();
        }
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({message:'예상치 못한 오류가 발생하였습니다.'});
        this.refs.snackbar.show();
      }.bind(this)
    });
  },




  render: function() {
    let standardActions = [
      { text: 'Okay' }
    ];    
    return (
      <form onSubmit={this.handleSubmit}>
        <Snackbar
          message={this.state.message}
          ref="snackbar" />
        <div><TextField ref="login_id" floatingLabelText="name or email" /></div>
        <div><TextField ref="login_pw" floatingLabelText="password" /></div>
        <div><RaisedButton label="로그인" primary={true} style={{width:'260px'}} onTouchTap={this.handleSubmit} /></div>
      </form>
    );
  }
});


// userName
// password
// mail
var JoinForm = React.createClass({
  getInitialState () {  
    return {message: ''};
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var id = this.refs.userName.getValue().trim();
    var pw = this.refs.password.getValue().trim();
    var mail = this.refs.mail.getValue().trim();

    if (!id) {
      this.setState({message:'아이디를 입력해주세요.' });
      this.refs.snackbar.show();
      return;
    }

    if (!pw) {
      this.setState({message:'비밀번호를 입력해주세요.'});
      this.refs.snackbar.show();
      return;
    }

    if (!mail) {
      this.setState({message:'메일 주소를 입력해주세요.'});
      this.refs.snackbar.show();
    }
    $.support.cors = true;
    $.ajax({
      xhrFields: {
          withCredentials: true
      },
      url: 'http://localhost:8080/join',
      dataType: 'json',
      type: 'POST',
      data: {userName:id, password:pw, mail:mail, oauthProvider:0, oauthAccessToken:""},
      success: function(data) {
        if (data.result) {
          mainSnackbar.setMessage('회원가입이 성공하였습니다.');
          mainSnackbar.show();
          joinDialog.dismiss();
        } else {
          this.setState({message:data.message});
          this.refs.snackbar.show();
        }
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({message:'예상치 못한 오류가 발생하였습니다.'});
        this.refs.snackbar.show();
      }.bind(this)
    });
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Snackbar
          message={this.state.message}
          ref="snackbar" />
        <div><TextField ref="userName" floatingLabelText="name" /></div>
        <div><TextField ref="mail" floatingLabelText="email" /></div>
        <div><TextField ref="password" floatingLabelText="password" /></div>
        <div><RaisedButton label="회원가입" primary={true} style={{width:'260px'}} onTouchTap={this.handleSubmit} /></div>
      </form>
      )
  }
})
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

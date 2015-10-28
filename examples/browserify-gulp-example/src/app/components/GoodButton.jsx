'use strict';

const React = require('react');
const FlatButton = require('material-ui/lib/flat-button');
const config = require('./config.js');
const global = require('./global.js');

var GoodButton = React.createClass({
 handleLikeSubmit: function(e) {
    e.preventDefault();
    $.support.cors = true;
    $.ajax({
      xhrFields: {
          withCredentials: true
      },
      url: config.server+'/good/' + this.props.article_no,
      dataType: 'json',
      type: 'POST',
      data: '',
      xhrFields: {
          withCredentials: true
      },      
      success: function(data) {
        if (!data.result) {
          global.loginDialog.show();
        }

        //this.setState({data: data});
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(config.server, status, err.toString());
      }.bind(this)
    });
  },
render: function() {
  return (
    <FlatButton label="좋아요" onTouchTap={this.handleLikeSubmit} />
    )
}
});

module.exports = GoodButton;
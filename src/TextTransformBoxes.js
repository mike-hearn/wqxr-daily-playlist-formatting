var React = require('react');

var Paste = React.createClass({
  getInitialState: function getInitialState() {
    return {text: ''};
  },
  renderText: function renderText() {
    var inputText = this.state.text;

    // First, trim all lines of trailing spaces & tabs
    inputText = inputText.replace(/^\s\s*/gm, '').replace(/\s\s*$/gm, '');

    // Hours get H3 tags
    inputText = inputText.replace(
      /(\d.*(A|P)M)$/gm,
      '<h3>$1</h3>');

    // Any line w/o a tab or a heading gets an H2
    inputText = inputText.replace(
      /(^(?!.*<h.>).(?!.*\t).*)/gm,
      '<h2>$1</h2>');

    // The very first line gets an H1
    inputText = inputText.replace(
      /<h2>(.+?)<\/h2>\n/,
      '<h1>$1</h1>\n');

    // Lines with [text][tab][text] get split into two
    inputText = inputText.replace(
      /([A-Za-z]+.*)\t([A-Za-z]+.*)/g,
      '<p><b>$1</b><br/>$2</p>');

    // All lines that don't contain a tab get their own H2

    this.refs.output.getDOMNode().value = inputText;
    document.getElementById('preview').innerHTML = inputText;
  },
  render: function render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <h3>Input:</h3>
          <textarea onChange={this.handleChange} ref="input"></textarea>
        </div>
        <div className="col-md-6">
          <h3>Output:</h3>
          <textarea ref="output"></textarea>
        </div>
        <div className="col-xs-12">
          <h3>Preview:</h3>
          <hr/>
          <div id="preview"></div>
        </div>
      </div>
    );
  },
  handleChange: function handleChange() {
    var newVal = this.refs.input.getDOMNode().value;
    this.setState({text: newVal}, this.renderText);
  },
});

module.exports = Paste;


import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
  onSubmit = formValues => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <div>
        <h3>Create Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

// form object key here is only a name that represent why the form will be created for
// and it's just type of configuration

export default connect(
  null,
  { createStream }
)(StreamCreate);

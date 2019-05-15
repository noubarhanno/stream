import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  rednerActions() {
    return (
      // React.fragment is a react element that is solving the problem of (we must wrap the multi JSX Element into a enclosure tag like div) that might damage
      // the entire styling in the application
      <React.Fragment>
        <button
          onClick={() => this.props.deleteStream(this.props.match.params.id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream";
    }
    return "Are you sure you want to delete the stream with title:";
  }

  renderStreamTitle() {
    if (this.props.stream) {
      return this.props.stream.title;
    }
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        streamTitle={this.renderStreamTitle()}
        actions={this.rednerActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.stream[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchStream, deleteStream }
)(StreamDelete);

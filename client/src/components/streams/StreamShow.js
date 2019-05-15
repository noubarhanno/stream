import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component{
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);    
    }

    renderStream(){
        
        if (!this.props.stream){
            return <div>Loading ...</div>;
        }
        const {title, description} = this.props.stream
        return (
            <div>
                <h2>{title}</h2>
                <h5>{description}</h5>
            </div>
        );
    }

    render(){
        return(
            <div>
            {this.renderStream()}
            </div>
        );
    }
}

const mapStateToProps = (state,ownProps) => {
    return { stream: state.stream[ownProps.match.params.id]};
}


export default connect(mapStateToProps,{ fetchStream })(StreamShow);
import React from 'react';
import { connect } from 'react-redux';
import { signIn , signOut } from '../actions';

class GoogleAuth extends React.Component{

    // we're using window because api is a window library 
    // first we have to load an extra library called client:auth2 then the second argument
    // will be a call back function (call back means the load is successful and it return a call back function)
    // that will initiate a client object which is the client ID we create in console.developers.google.com
    // and the scope is what data we need to access when the user signed in 
    


    // Note : this.auth is declared on componentDidMount which means it's not local scope but global scope that's 
    // why we could use it in onSignIn and onSignOut helper functions
    componentDidMount = () => {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '187109626558-96israekbtr09kt764u5ntkl508r1av3.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = isSignedIn => {
        // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        if (isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null ){
            return null;
        } else if (this.props.isSignedIn){
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                <i className="google icon" />
                Sign Out
                </button>
            );
        } else{
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                <i className="google icon" />
                Sign in with Google
                </button>
            );
        }
    }


    render(){
        return(
            <div>{this.renderAuthButton()}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn};
}

export default connect(mapStateToProps,{signIn, signOut})(GoogleAuth);
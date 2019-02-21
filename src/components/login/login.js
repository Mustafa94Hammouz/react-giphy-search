import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {getUser} from "../../redux/actions/userAction";
import {userService} from "../../services";
import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/es/Button/Button";
import './login.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
    }
    componentWillMount() {
        const {history} = this.props;

        if(localStorage.getItem('user')){
            history.push('/profile');
        }
    }

    handleChange(e){
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleSignIn(){
        const {history} = this.props;
        userService.login(this.state.email, this.state.password).then(()=>{
            history.push('/profile');
        });
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <form className='Form' noValidate autoComplete="off">
                        <TextField
                            id="email"
                            label="Email"
                            margin="normal"
                            type = 'email'
                            onChange={this.handleChange}
                        />

                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            margin="normal"
                            onChange={this.handleChange}
                        />
                        <Button onClick={this.handleSignIn} id='signIn' variant="contained" color="primary" >
                            Sign In
                        </Button>
                    </form>
                </header>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getUser: (user)=>{dispatch(getUser(user))}
});


export default connect(mapDispatchToProps)(withRouter(Login));

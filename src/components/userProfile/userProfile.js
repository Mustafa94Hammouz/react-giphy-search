import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import {userService} from "../../services";
import {connect} from 'react-redux';
import './userProfile.css';
import SearchBar  from "../searchBar/searchBar";
import GiphyList from '../GifyList/gifyList';

class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId: '',
            firstName:'',
            lastName:'',
            avatar:''
        };
        userService.getUser().then((res)=>{
            this.setState({
                userId: res.data.id,
                firstName: res.data.first_name,
                lastName: res.data.last_name,
                avatar: res.data.avatar
            })
        });
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillMount(){
        const {history} = this.props;
        if(!localStorage.getItem('user')){
            history.push('/');
        }
    }
    handleLogout(){
        const {history} = this.props;
        userService.logout();
        history.push('/')
    }
    render() {
        return (
            <div className="container">
                <header >

                    <div className='sideColumn'>
                        <img src={this.state.avatar} alt='pp'/>
                        <p> {this.state.firstName} {this.state.lastName } </p>
                        <p>User Id : {this.state.userId}</p>
                        <button onClick={this.handleLogout}> Logout</button>
                    </div>
                    <GiphyList/>
                    <SearchBar/>
                </header>
            </div>
        );
    }
}


export default connect(null, null)(withRouter(UserProfile));

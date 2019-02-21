import React, { Component } from 'react';
import {connect} from 'react-redux';
import {searchGiphy} from "../../redux/actions/userAction";
import './searchBar.css';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchTerm:''
        };

        this.handleSearch = this.handleSearch.bind(this);
     }

    componentDidMount() {
        if(localStorage.getItem('lastSearch')){
            this.setState({searchTerm: localStorage.getItem('lastSearch')},()=>this.props.searchGiphy(this.state.searchTerm));
        }
    }

    handleSearch = (e) => {
        this.setState({
            searchTerm: e.target.value
        },()=> this.props.searchGiphy(this.state.searchTerm));

    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="containerr">
                        <input type="text" placeholder="Search..." value={this.state.searchTerm} onChange={this.handleSearch}/>
                            <div className="search"></div>
                    </div>
                </header>
            </div>
        );
    }
}
const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    searchGiphy: (searchTerm) => dispatch(searchGiphy(searchTerm))
});

export default connect(null, mapDispatchToProps)(SearchBar );

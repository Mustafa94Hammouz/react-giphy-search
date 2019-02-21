import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userService} from "../../services";
import './gifyList.css';
import Gif from '../Gif/gif';
import loading from '../../images/loading.gif';

class GiphyList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            searchTerm:'',
            limit:500,
            offset:0,
            gifsLoading:false,
            gifsPerPage: 50,
            currentPage: 1

        };

        this.loadNext = this.loadNext.bind(this);
        this.loadPrevious = this.loadPrevious.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.goToFirst = this.goToFirst.bind(this);
        this.goToLast = this.goToLast.bind(this);
    }

    loadNext(){
        {this.onLoad()}
        userService.fetchGiphy(this.props.state,this.state.limit, this.state.offset + 5)
            .then((data)=>{
                this.setState({
                    list:data,
                    searchTerm:this.props.state,
                    offset: this.state.offset + 5,
                    gifsLoading:false
                })
            })
    }
    loadPrevious(){
        {this.onLoad()}
        userService.fetchGiphy(this.props.state,this.state.limit, this.state.offset - 5)
            .then((data)=>{
                this.setState({
                    list:data,
                    searchTerm:this.props.state,
                    offset: this.state.offset - 5,
                    gifsLoading:false
                })
            })
    }

    goToFirst(){
        this.setState({
            currentPage: 1
        })
    }

    goToLast(){
        this.setState({
            currentPage: this.state.list.length/this.state.gifsPerPage
        })

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.state !== prevProps.state ){
            {this.onLoad()}
            userService.fetchGiphy(this.props.state,this.state.limit,this.state.offset)
                .then((data)=>{
                    this.setState({
                        list:data,
                        searchTerm:this.props.state,
                        gifsLoading:false
                    });
                    localStorage.setItem('lastSearch',this.state.searchTerm);
                })

        }
    }

    onLoad(){
        this.setState({
            gifsLoading:true
        })
    }


    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id),
        });
    }


    render() {
        const { list, gifsPerPage, gifsLoading } = this.state;
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(list.length / gifsPerPage); i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return (

                <button
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                >
                    {number}
                </button>

            );
        });

        if(list.length > 0 ){
            return (
                <div className="App">
                    <header className="App-header">
                        <ul className='gifList' >
                            <div className='pagination'>
                            <button onClick={this.goToFirst}> FirstPage</button>
                            <button key={0} onClick={this.loadPrevious}> Previous</button>
                            {renderPageNumbers}
                            <button key={1} onClick={this.loadNext}> Next</button>
                            <button onClick={this.goToLast}> LastPage</button>
                            </div>
                            {gifsLoading ?  <img src={loading} alt='loader' /> : null }
                           <Gif currentPage={this.state.currentPage} perPage={this.state.gifsPerPage} list={this.state.list}/>
                        </ul>

                    </header>
                </div>
            );
        }else {
            return null;
        }
    }
}

const mapStateToProps = state => ({
    state: state.userReducer.searchTerm
});

export default connect(mapStateToProps)(GiphyList);

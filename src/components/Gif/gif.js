import React, { Component } from 'react';
import {connect} from 'react-redux';
import './gif.css';

class Gif extends Component {
    constructor(props){
        super(props);
        this.state = {
            play:false,

        };
        this.handleGif = this.handleGif.bind(this);
    }

    handleGif(item,e){

            e.target.src = item.images.original.url;
            this.setState({
                play: true
            });

    }

    render() {
        const {currentPage, perPage, list} = this.props;
        const indexOfLastGif = currentPage * perPage;
        const indexOfFirstGif = indexOfLastGif - perPage;
        const currentGif = list.slice(indexOfFirstGif, indexOfLastGif);
        const listItems = currentGif.map((item,index)=> <img key={index} src={item.images.original_still.url} alt='gif' width='200px' onClick={(e)=>this.handleGif(item,e)}/>);
        return (
            <div className="App">
                <header className="App-header">
                    <div className='images'>
                    {listItems}
                    </div>
                    </header>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    state: state.userReducer.searchTerm
});

export default connect(mapStateToProps)(Gif );

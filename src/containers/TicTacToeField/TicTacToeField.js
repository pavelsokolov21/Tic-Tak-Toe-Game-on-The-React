import React, { Component } from 'react';

import Cell from '../../components/Cell/Cell';
import * as actions from '../../store/actions/actions';

import { connect } from 'react-redux';

import './style.css';

class TicTacToeField extends Component {

    componentDidUpdate(){
        if(!this.props.win){
            if(this.props.count > this.props.size){
                const winDetail = leader => {
                    setTimeout(() => {
                        alert(`Победа ${leader}`);
                    }, 300);
                    this.props.winGame();
                    this.props.restartGame();
                }

                const win = arr => {
                    let newArr = [];
                    arr.forEach(item => newArr = [...newArr, item.content]);
                    const symbolStr = newArr.join('');
                            
                    let strX = '';
                    let strO = '';
                    for(let i = 0; i < this.props.size; i++){
                        strX += 'X';
                        strO += 'O';
                    }
                            
                    if(symbolStr === strX){
                        winDetail('X');
                    }else if(symbolStr === strO){
                        winDetail('O');
                    };         
                };
            
                let rightDiag = [];
                for(let i = 1; i < this.props.size + 1; i++){
                    const strFields = this.props.cellArr.filter(item => {
                        return item.coordinates.slice(0, 1) === `${i}`;
                    });
                    const columnFields = this.props.cellArr.filter(item => {
                        return item.coordinates.slice(-1) === `${i}`;
                    });

                    this.props.cellArr.forEach(item => {
                        if(item.coordinates.slice(0, 1) === `${i}` && item.coordinates.slice(-1) === `${this.props.size + 1 - i}`){
                            rightDiag.push(item);
                        };   
                    });
                    win(strFields);
                    win(columnFields);
                };
            
                const leftDiag = this.props.cellArr.filter(item => {
                    return item.coordinates.slice(0,1) === item.coordinates.slice(-1);
                });
                win(leftDiag);
                win(rightDiag);
            }
        }
        if(this.props.count !== 0){
            if(this.props.count === (this.props.size ** 2) && !this.props.win){
                setTimeout(() => {
                    alert('Ничья!');
                }, 300);
            };
        };
    };

    render(){
        if(this.props.cellArr !== null){
            const sizeField = this.props.size;
            return(
                <div 
                    className='tic-tac-toe-field' 
                    style={ {width: `${150 * sizeField + sizeField * 4}px`} }>
                    {this.props.cellArr.map((item, i) => (
                        <Cell 
                        key={ i } 
                        win={ this.props.win }
                        dataId={ item.id }
                        content={ item.content }
                        />))}
                </div>
            );
        } else{
            return(
                <div></div>
            );
        };
    };
};

const mapStateToProps = state => (
    {
        icon: state.icon,
        cellArr: state.cellArr,
        size: state.size,
        count: state.count,
        win: state.win
    }
);

const mapDispatchToProps = dispatch => (
    {
        moveDone: () => dispatch(actions.selectCell()),
        restartGame: () => dispatch(actions.restartGame()),
        winGame: () => dispatch(actions.win()),
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(TicTacToeField);
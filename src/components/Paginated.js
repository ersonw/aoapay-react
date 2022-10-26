import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

// You can style your pagination component
// thanks to styled-components.
// Use inner class names to style the controls.
const MyPaginate = styled(ReactPaginate).attrs({
    // You can redifine classes here, if you want.
    activeClassName: 'active', // default to "disabled"
})`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding: 0 5rem;
  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;
export default class Paginated extends Component{
    constructor(props) {
        super(props);
        this.onPageChange = this.onPageChange.bind(this);
    }
    onPageChange(event){
        if (this.props.onPageChange !== undefined){
            const onPageChange = this.props.onPageChange;
            onPageChange(event);
        }
    }
    render() {
        return (
            <div className="commentBox">
                <MyPaginate
                    pageCount={this.props.pageCount}
                    forcePage={this.props.currentPage}
                    onPageChange={(e)=>this.onPageChange(e)}
                    previousLabel={this.props.previousLabel??"上一页"}
                    nextLabel={this.props.nextLabel??"下一页"}
                />
            </div>
        );
    }
}

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
// export class App extends Component {
//     static propTypes = {
//         url: PropTypes.string.isRequired,
//         author: PropTypes.string.isRequired,
//         perPage: PropTypes.number.isRequired,
//     };
//
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             data: [],
//             offset: 0,
//         };
//     }
//
//     loadCommentsFromServer() {
//         $.ajax({
//             url: this.props.url,
//             data: { limit: this.props.perPage, offset: this.state.offset },
//             dataType: 'json',
//             type: 'GET',
//
//             success: (data) => {
//                 this.setState({
//                     data: data.comments,
//                     pageCount: Math.ceil(data.meta.total_count / data.meta.limit),
//                 });
//             },
//
//             error: (xhr, status, err) => {
//                 console.error(this.props.url, status, err.toString()); // eslint-disable-line
//             },
//         });
//     }
//
//     componentDidMount() {
//         this.loadCommentsFromServer();
//     }
//
//     handlePageClick = (data) => {
//         console.log('onPageChange', data);
//         let selected = data.selected;
//         let offset = Math.ceil(selected * this.props.perPage);
//
//         this.setState({ offset: offset }, () => {
//             this.loadCommentsFromServer();
//         });
//     };
//
//     render() {
//         const currentPage = Math.round(this.state.offset / this.props.perPage);
//         return (
//             <div className="commentBox">
//                 <MyPaginate
//                     pageCount={20}
//                     onPageChange={this.handlePageClick}
//                     forcePage={currentPage}
//                 />
//                 <CommentList data={this.state.data} />
//                 {/* Here the pagination component is styled thanks to Bootstrap
//         classes. See https://getbootstrap.com/docs/5.1/components/pagination */}
//                 <nav aria-label="Page navigation comments" className="mt-4">
//                     <ReactPaginate
//                         previousLabel="previous"
//                         nextLabel="next"
//                         breakLabel="..."
//                         breakClassName="page-item"
//                         breakLinkClassName="page-link"
//                         pageCount={20}
//                         pageRangeDisplayed={4}
//                         marginPagesDisplayed={2}
//                         onPageChange={this.handlePageClick}
//                         containerClassName="pagination justify-content-center"
//                         pageClassName="page-item"
//                         pageLinkClassName="page-link"
//                         previousClassName="page-item"
//                         previousLinkClassName="page-link"
//                         nextClassName="page-item"
//                         nextLinkClassName="page-link"
//                         activeClassName="active"
//                         // eslint-disable-next-line no-unused-vars
//                         hrefBuilder={(page, pageCount, selected) =>
//                             page >= 1 && page <= pageCount ? `/page/${page}` : '#'
//                         }
//                         hrefAllControls
//                         forcePage={currentPage}
//                         onClick={(clickEvent) => {
//                             console.log('onClick', clickEvent);
//                             // Return false to prevent standard page change,
//                             // return false; // --> Will do nothing.
//                             // return a number to choose the next page,
//                             // return 4; --> Will go to page 5 (index 4)
//                             // return nothing (undefined) to let standard behavior take place.
//                         }}
//                     />
//                 </nav>
//             </div>
//         );
//     }
// }
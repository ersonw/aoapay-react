import React from "react";
import order from "../css/order.module.css"
import app from "../css/app.module.css"
import orderh5 from "../css/orderh5.module.css";
// import { AiFillAlipayCircle } from "react-icons/ai";
import withRouter from "../withRouter";
import Paginated from "../components/Paginated";
import $ from "jquery";
import error from "../images/error.png";
import close from "../images/close.png";
import aoaLogo from "../images/aoa-logo.png";
class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAjax: false,
            ajaxMessage: '',
            styles: app.App,
            currentPage: 1,
            pageCount: 0,
            list: [],
        };
    }
    loadFromServer() {
        $.ajax({
            url: process.env.REACT_APP_BASE_URL+'/api/payList/order?page='+this.state.currentPage,
            type: 'GET',
            crossDomain:true, //设置跨域为true
            xhrFields: {
                withCredentials: true //默认情况下，标准的跨域请求是不会发送cookie的
            },
            success: (res) => {
                const { code, message, data } = res;
                if (message !== undefined && message !== null){
                    this.setState({
                        showAjax: true,
                        ajaxMessage: message,
                    });
                }
                if (code!==200) return;
                const { list, total } = data;
                if (list !== undefined && !list.isEmpty){
                    this.setState({
                        list: list,
                        pageCount: total,
                    });
                }
            },
            error: (xhr, status, err) => {
                this.setState({
                    showAjax: true,
                    ajaxMessage:  err.toString(),
                });
                // console.error(this.props.url, status, err.toString()); // eslint-disable-line
            },
        });
    }
    componentDidMount() {
        this.loadFromServer();
        if (
            navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/Windows Phone/i)
        ) {
            this.setState({ styles:  orderh5 });
        } else {
            this.setState({ styles:  order });
        }
    }
    componentWillUnmount() {
        // window.removeEventListener("resize", this.resizeListener);
    }
    onClickBnt(e) {
        this.props.router.navigate('/');
    }
    async onChange({selected}){
        // console.log(selected+1);
        await this.setState({
            currentPage: selected+1,
        })
        await this.loadFromServer();
    }
    onAjaxClose(){
        this.setState({showAjax: false});
    }
    render() {
        return (
            <div className={this.state.styles.order}>
                <div className={this.state.styles.logo}>
                    <img src={aoaLogo} alt="" />
                </div>
                <div className={this.state.styles.title}>
                    <div>
                        <div>存款</div>
                        <div>存款金额会存入中心钱包</div>
                    </div>
                    <div onClick={this.onClickBnt.bind(this)}> 返回</div>
                </div>
                <div className={this.state.styles.record}>
                    <table>
                        <tbody>
                        <tr>
                            <th>订单编号</th>
                            <th>存款金额</th>
                            <th>会员账号</th>
                            <th>实际存款</th>
                            <th>订单状态</th>
                        </tr>
                        {this.state.list.length > 0 &&
                            this.state.list.map((item, index)=> {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.username}</td>
                                        <td>{item.totalFee}</td>
                                        <td style={item.status?{color: "green"}:{color: "gray"}}>{item.status?'已成功':'等待确认'}</td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                    {this.state.pageCount > 0 && (
                        <div>
                            <Paginated currentPage={this.state.currentPage-1} pageCount={this.state.pageCount} onPageChange={this.onChange.bind(this)} />
                        </div>
                    )}
                </div>
                <div className={this.state.showAjax?this.state.styles.mask:this.state.styles.maskHide}>
                    <div className={this.state.showAjax?this.state.styles.popup:this.state.styles.popupHide}>
                        <div className="title"> 温馨提示</div>
                        <div className="main">
                            <img src={error} alt=""/>
                            {this.state.ajaxMessage}
                            <br />
                        </div>
                        <div className="btn-box">
                            <div onClick={this.onAjaxClose.bind(this)}> 取消</div>
                            <div onClick={this.onAjaxClose.bind(this)}> 确定</div>
                        </div>
                        <div className="close" onClick={this.onAjaxClose.bind(this)}>
                            <img src={close} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Order);

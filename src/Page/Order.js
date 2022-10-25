import React from "react";
import order from "../css/order.module.css"
import { AiFillAlipayCircle } from "react-icons/ai";
import withRouter from "../withRouter";
import Paginated from "../components/Paginated";
class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    onClickBnt(e) {
        this.props.router.navigate('/');
    }
    onChange({selected}){
        console.log(selected+1);
    }
    render() {
        return (
            <div className={order.order}>
                <div className={order.title}>
                    <div>
                        <div>存款</div>
                        <div>存款金额会存入中心钱包</div>
                    </div>
                    <div onClick={this.onClickBnt.bind(this)}> 返回</div>
                </div>
                <div className={order.record}>
                    <table>
                        <tr>
                            <th>订单编号</th>
                            <th>存款金额</th>
                            <th>用户昵称</th>
                            <th>实际存款</th>
                            <th>订单状态</th>
                        </tr>
                        <tr>
                            <td>QFP4VL3</td>
                            <td>300.00</td>
                            <td>123123</td>
                            <td>0.00</td>
                            <td>等待确认</td>
                        </tr>
                    </table>
                    <div>
                        <Paginated currentPage={1} pageCount={20} onPageChange={this.onChange.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Order);

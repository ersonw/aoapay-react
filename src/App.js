import React from "react";
import withRouter from "./withRouter";
import $ from 'jquery';
import app from "./css/app.module.css"
import './App.css'

import alipayIcon from "./images/alipay.png"
import wxpayIcon from "./images/wxpay.png"
import chooseIcon from "./images/choose.png"
import qqpayIcon from "./images/qqpay.png"
import taobaoIcon from "./images/taobao.png"
import unionpay from "./images/UnionPay.png"
import error from "./images/error.png"
import close from "./images/close.png"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMask: false,
            showMessage: '公司银行卡不定期更换，每次充值请根据提交订单，生成的银行卡转账，切勿直接转账至之前转入的银行卡，并且不要使用微信进行转账存款，否则无法到账，概不负责！如会员账号填写错误导致充值到其他账号，不予退还，请谨慎核对！',
            showAjax: false,
            ajaxMessage: '',
            chooseIndex: 0,
            name: '',
            username: '',
            amount: 0,
            amountValue: 0,
            payMethod: [],
            amountList: [],
            amountListIndex: 0,

        };
    }
    componentDidMount() {
        this.loadFromServer();
    }
    submitServer(){
        $.ajax({
            url: process.env.REACT_APP_BASE_URL+'/api/payList/submit',
            data: {
                name: this.state.name,
                username: this.state.username,
                payListId: this.state.payMethod[this.state.chooseIndex].id,
                amount: this.state.amount,
            },
            dataType: 'json',
            type: 'POST',
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
                const { url } = data;
                if (url !== undefined && !url.isEmpty){
                    const winURL = window.open(url);
                    const loop = setInterval(() => {
                        if (winURL && winURL.closed) {
                            clearInterval(loop);
                            this.onClickBnt();
                        }
                    }, 500);
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
    loadFromServer() {
        $.ajax({
            url: process.env.REACT_APP_BASE_URL+'/api/payList/v1',
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
                const { list } = data;
                if (list !== undefined && !list.isEmpty){
                    this.setState({
                        payMethod: list,
                        chooseIndex: 0,
                        amountList: list[0].amountList,
                        amountListIndex: 0,
                        amount: list[0].amountList[0],
                        amountValue: list[0].amountList[0],
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
    onClickBnt(e) {
        this.props.router.navigate('/order');
    }

    onClickMethod(index) {
        this.setState(
            {
                chooseIndex: index,
                amount: this.state.payMethod[index].amountList.isEmpty ? 0 : this.state.payMethod[index].amountList[0],
                amountValue: this.state.payMethod[index].amountList.isEmpty ? 0 : this.state.payMethod[index].amountList[0],
                amountList: this.state.payMethod[index].amountList,
                amountListIndex: 0,
            }
        );
    }

    onClickPrice(index) {
        this.setState(
            {
                amountListIndex: index,
                amount: this.state.amountList[index],
                amountValue: this.state.amountList[index],
            }
        );
    }

    getMethod(e) {
        switch (e) {
            case 'alipay':
                return alipayIcon;
            case 'wxpay':
                return wxpayIcon;
            case 'qqpay':
                return qqpayIcon;
            case 'taobao':
                return taobaoIcon;
            case 'unionpay':
                return unionpay;
            default:
                return;
        }
    }

    handleChangeName(event) {
        if (/.*[\u4e00-\u9fa5]+.*$/.test(event.target.value)) {
            this.setState({name: event.target.value});
        } else {
            this.setState({name: ""});
        }
    }

    handleChangeUserName(event) {
        if (/.*[\u4e00-\u9fa5]+.*$/.test(event.target.value)) {
            this.setState({username: ""});
        } else {
            this.setState({username: event.target.value});
        }
    }

    handleChangeAmount() {
        const amount = this.state.payMethod[this.state.chooseIndex];
        if (amount.voluntarily) {
            if (parseInt(this.state.amountValue) < amount.mini){
                this.setState({amountValue: amount.mini});
            }else if (parseInt(this.state.amountValue) > amount.max){
                this.setState({amountValue: amount.max});
            }
            const index = this.state.amountList.findIndex((e) => e === parseInt(this.state.amountValue));
            this.setState({
                amount: parseInt(this.state.amountValue),
                amountListIndex: index,
            });
            return;
        }
        this.setState({amountValue: this.state.amount});
    }

    onSubmit() {
        this.setState({showMask: true});
    }
    onAjaxClose(){
        this.setState({showAjax: false});
    }
    onMaskClose(){
        this.setState({showMask: false});
    }
    onMaskSubmit(){
        this.setState({showMask: false});
        this.submitServer();
    }
    render() {
        return (
            <div className={app.App}>
                <div className={app.title}>
                    <div>
                        <div>存款</div>
                        <div>存款金额会存入中心钱包</div>
                    </div>
                    <div onClick={this.onClickBnt.bind(this)}> 我的订单</div>
                </div>
                <div className={app.pay}>
                    <div className={app.payMtd}>
                        <div className={app.payMtdTitle}> 付款方式</div>
                        <div>
                            {this.state.payMethod.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={this.state.chooseIndex === index ? app.payMtdActive : ""}
                                        onClick={(e) => this.onClickMethod(index)}
                                    >
                                        <div>
                                            <img src={this.getMethod(item.type)} alt=""/>
                                        </div>
                                        <div>{item.title}</div>
                                        <div className={app.payMtdChoose}>
                                            <img src={chooseIcon} alt=""/>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={app.main}>
                        <div className={app.default}>
                            <div>
                                <div>存款人姓名</div>
                                <div>
                                    <div>
                                        <input type="text" value={this.state.name}
                                               onChange={(e) => this.handleChangeName(e)}/>
                                    </div>
                                    <div>
                                        <img src={this.state.name.length > 0 ? "" : error} alt=""/>
                                        为及时到账，请务必输入正确的存款人姓名
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>会员账号</div>
                                <div>
                                    <div>
                                        <input type="text" value={this.state.username}
                                               onChange={(e) => this.handleChangeUserName(e)}/>
                                    </div>
                                    <div>
                                        <img src={this.state.username.length > 0 ? "" : error} alt=""/>
                                        为及时到账，请务必输入正确的会员账号
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>存款金额</div>
                                <div className={app.numList}>
                                    <div>
                                        {!this.state.amountList.isEmpty &&
                                            this.state.amountList.length > this.state.amountListIndex &&
                                            this.state.amountList.map((item, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={this.state.amountListIndex === index ? app.numListActive : ""}
                                                        onClick={(e) => this.onClickPrice(index)}
                                                    >
                                                        <div>{item}</div>
                                                        <div className={app.numListChoose}>
                                                            <img src={chooseIcon} alt=""/>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                    <div>
                                        <div>
                                            <input type="number"
                                                   value={this.state.amountValue}
                                                   onBlur={(e) => this.handleChangeAmount(e)}
                                                   onChange={(e) => this.setState({amountValue: e.target.value})}
                                                   readOnly={!this.state.payMethod.isEmpty &&
                                                       this.state.payMethod.length > this.state.chooseIndex &&
                                                       this.state.payMethod[this.state.chooseIndex].voluntarily === false}
                                            />
                                        </div>
                                        <div>
                                            <img src="" alt=""/>
                                            单笔存款金额：{this.state.payMethod.length>0? this.state.payMethod[this.state.chooseIndex].mini:0}元-{this.state.payMethod.length>0? this.state.payMethod[this.state.chooseIndex].max:0}元
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`${app.bnt} ${(this.state.name.length === 0 ||
                                this.state.username.length === 0 ||
                                this.state.amount === 0 ? "" : app.bntActive)}`}
                                onClick={this.onSubmit.bind(this)}
                            > 立即存款
                            </div>
                        </div>
                    </div>
                </div>
                <div className={this.state.showMask?app.mask:app.maskHide}>
                    <div className={this.state.showMask?app.popup:app.popupHide}>
                        <div className="title"> 温馨提示</div>
                        <div className="main">
                            <img src={error} alt=""/>
                            {this.state.showMessage}
                            <br />
                            您填写的会员账号是 {this.state.username}
                        </div>
                        <div className="btn-box">
                            <div onClick={this.onMaskClose.bind(this)}> 取消</div>
                            <div onClick={this.onMaskSubmit.bind(this)}> 确定</div>
                        </div>
                        <div className="close" onClick={this.onMaskClose.bind(this)}>
                            <img src={close} alt=""/>
                        </div>
                    </div>
                </div>
                <div className={this.state.showAjax?app.mask:app.maskHide}>
                    <div className={this.state.showAjax?app.popup:app.popupHide}>
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

export default withRouter(App);

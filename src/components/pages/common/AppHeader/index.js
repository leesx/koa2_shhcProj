/*
 * @Author: leesx
 * @Date: 2017-07-06 11:02:34
 * @Last Modified by: leesx
 * @Last Modified time: 2017-07-06 15:01:20
 */
import React, {Component} from "react";
import {Link} from "react-router";
import {Layout, Menu, Icon} from "antd";
import {SVGIcon} from "components/common";
const {Header} = Layout;

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3d menu item</a>
        </Menu.Item>
    </Menu>
);

export default class AppHeader extends Component {
    render() {
        return (
            <Header className="header clearfix">
                <div className="header-left">
                    <Link to="home?tabKey=home&title=首页">
                        <img className="logo" src={require('assets/img/logo.png')}/>
                        <span>水浒画册后台管理</span>
                    </Link>
                </div>
                <div className="site-link">
                    {this.renderInfo()}
                    <a><Icon type="question-circle"/>帮助中心</a>
                </div>
            </Header>
        )
    }

    renderInfo() {
        const {userName} = this.props;
        if (userName) {
            return <span>{userName},欢迎回来.<span>|</span><a href="/user/logout">退出</a></span>
        } else {
            return (
                <span>
						<a href="/reg"><Icon type="user"/>注册</a>
						<a href="/login"><Icon type="login"/>登录</a>
					</span>
            )
        }
    }
}

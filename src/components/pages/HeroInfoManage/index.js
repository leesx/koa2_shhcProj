/*
 * @Author: leesx
 * @Date: 2017-07-06 11:03:22
 * @Last Modified by: leesx
 * @Last Modified time: 2017-11-30 16:28:11
 */

import React, {Component} from 'react';
import {SVGIcon, RichEditor} from 'components/common';


import {
    Form, Select, InputNumber, Input, Switch, Radio,
    Slider, Button, Upload, Icon, Modal, Tabs,
} from 'antd';
const FormItem    = Form.Item;
const Option      = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup  = Radio.Group;
const TabPane     = Tabs.TabPane;

import {myAxios} from 'utils';
import HeroList from './HeroList';
import CreateFormBox from './Create';


function RenderPagePane(props){
	const status = props.status;
	if(status === '0'){
		return <HeroList handleEditList={props.handleEditList} />
	}

	if(status === '1'){
		return <CreateFormBox />
	}

}

export default class HeroInfoManage extends Component {
    state        = {
        pageStatus: '0', //0 列表, 1创建,2编辑
				editID:null,
    }
    handleChange = (e) => {
        this.setState({
            pageStatus: e.target.value
        })
    }
		handleEditList=(id)=>{
			console.log('======',id)
			this.setState({
				pageStatus:'2',
				editID:id,
			})
        }
        
        handleClickBackList=()=>{
            this.setState({
				pageStatus:'0',
			})
        }

    render() {
        const {pageStatus,editID} = this.state;
        const popStyle = {
            height:pageStatus === '1' ? 1300 :0,
            transform:`translateY(${pageStatus === '1' ? -710 : 0}px)`
        }
        return (
            <div>

                <div className="leftpane-section-header">
                    <div className="pane-icon"></div>
                    <h4>英雄信息管理</h4> <span>口号:替天行道</span>
                </div>
                <div className="leftpane-extra">
                    <RadioGroup defaultValue="0" value={pageStatus} size="large" onChange={this.handleChange}>
												<RadioButton value="0">查看列表</RadioButton>
                        <RadioButton value="1">创建</RadioButton>
                    </RadioGroup>
                </div>
                <div className="leftpane-section-body">
                    <HeroList handleEditList={this.handleEditList} />
                    <div className="edit-pop-pane" style={popStyle}>
                        <div>
                            <Icon type="rollback" onClick={this.handleClickBackList} />
                            <h4>添加英雄信息</h4>
                        </div>
                        <CreateFormBox />
                    </div>
                </div>


            </div>
        )
    }
}

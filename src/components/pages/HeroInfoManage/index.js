/*
 * @Author: leesx
 * @Date: 2017-07-06 11:03:22
 * @Last Modified by: leesx
 * @Last Modified time: 2017-11-30 16:28:11
 */
import React, {Component} from "react";
import {SVGIcon, RichEditor} from "components/common";
import {Form, Select, Radio, Icon, Tabs} from "antd";
import {myAxios} from "utils";
import HeroList from "./HeroList";
import CreateFormBox from "./Create";
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;

function RenderPagePane(props) {
    const status = props.status;
    if (status === '0') {
        return <HeroList handleEditList={props.handleEditList}/>
    }

    if (status === '1') {
        return <CreateFormBox />
    }

}

export default class HeroInfoManage extends Component {
    state = {
        pageStatus: '0', //0 列表, 1创建,2编辑
        editID    : null,
        paneTop:0,
        isShowPane:false,
    }
    handleChange = (e) => {
        this.setState({
            pageStatus: e.target.value,
        })

				setTimeout(()=>{
					if(e.target.value === '1'){
							this.setState({
									paneTop:0,
							})
					}
				},0)
    }
    handleEditList = (id) => {
        console.log('======', id)
        this.setState({
            pageStatus: '2',
            editID    : id,
        })
    }

    handleClickBackList = () => {
        this.setState({
					paneTop:1000
            //pageStatus: '0',
        })

				setTimeout(()=>{
					this.setState({
							pageStatus: '0',
					})
				},300)
    }

    render() {
        const {pageStatus, editID} = this.state;

        return (
            <div>

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
	                    <HeroList handleEditList={this.handleEditList}/>

	                </div>
								</div>
                {
                    pageStatus === '1' ?
                        <div className="edit-pop-pane" style={{top:this.state.paneTop,border:'1px solid #f00'}}>
                            <div>
                                <Icon type="rollback" onClick={this.handleClickBackList}/>
                                <h4>添加英雄信息</h4>
                            </div>
                            <CreateFormBox />
                        </div> : null
                }


            </div>
        )
    }
}

/*
 * @Author: leesx
 * @Date: 2017-07-06 11:03:35
 * @Last Modified by:   leesx
 * @Last Modified time: 2017-07-06 11:03:35
 */

import React, { Component } from 'react';
import {SVGIcon} from 'components/common';
import {myAxios} from 'utils';
import axios from 'axios';

export default class StoryManage extends Component{
	  state={
			file:null,
			imgUrl:null,
		}
		handleChangeFile=(e)=>{
			this.setState({
				file:e.target.files[0]
			})
		}

		handleSubmit=()=>{
			const formData = new FormData();
    	formData.append('file', this.state.file);
			myAxios.post('/api/upload',formData,{
				headers: {
            'Content-Type': 'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
        },
				transformRequest: [function (data) {
		        //data = Qs.stringify(data);
			        return data;
			    }
		    ],
			}).then((data) => {
				console.log(data)
				this.setState({
					imgUrl:data.imgUrl
				})
			})
		}

    render(){
        return (
            <div>
                <h1>水浒故事管理</h1>
								<input id="btn1" onChange={this.handleChangeFile} type="file" name="file"/>
  							<input id="btn2" type="submit" value="提交" onClick={this.handleSubmit} />
								{
									this.state.imgUrl ?
									<img src={this.state.imgUrl} /> : null
								}
            </div>
        )
    }
}

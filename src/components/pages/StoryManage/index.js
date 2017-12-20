/*
 * @Author: leesx
 * @Date: 2017-07-06 11:03:35
 * @Last Modified by:   leesx
 * @Last Modified time: 2017-07-06 11:03:35
 */
import React, {Component} from "react";
import {Button,Card} from 'antd';
import {SVGIcon} from "components/common";
import {html, render} from 'lit-html';
import {myAxios} from "utils";
const { Meta } = Card;

// This is a lit-html template function. It returns a lit-html template.
const helloTemplate = (name) => html`<div>Hello ${name}!</div>`;

// Call the function with some data, and pass the result to render()

// This renders <div>Hello Steve!</div> to the document body
//render(helloTemplate('Steve'), document.body);

// This updates to <div>Hello Kevin!</div>, but only updates the ${name} part
//render(helloTemplate('Kevin'), document.body);

export default class StoryManage extends Component {
    state = {
        file  : null,
        imgUrl: null,
        photoList:[],
    }

    componentDidMount(){
        this.fetchPhtoList()
				//render(helloTemplate('Kevin'), document.querySelector('#test'));
    }

    fetchPhtoList=()=>{
        myAxios.get('/api/getPhotoList').then(data=>{
            console.log(data)
            this.setState({
                photoList:data.data
            })
        })
    }
    handleChangeFile = (e) => {
        this.setState({
            file: e.target.files[0]
        })
    }

    handleSubmit = () => {
        const formData = new FormData();
        formData.append('file', this.state.file);
        myAxios.post('/api/upload', formData, {
            headers         : {
                'Content-Type': 'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
            },
            transformRequest: [function (data) {
                //data = Qs.stringify(data);
                return data;
            }
            ],
        }).then((data) => {
            console.log(data)
            this.fetchPhtoList()
            // this.setState({
            //     imgUrl: data.imgUrl
            // })
        })
    }

		removePhoto=(_id)=>{
			const {photoList} = this.state
			myAxios.post('/api/removePhoto',{id:_id}).then(data=>{
					console.log(data)
					if(data.rs){
						const newPhotoList = photoList.filter((item) => item._id !== _id)
						this.setState({
								photoList:newPhotoList
						})
					}

			})
		}

    render() {
        const {photoList} = this.state;
        return (
            <div className="album-mange">
                <h2>图片管理</h2>
                <div style={{display:'flex',marginBottom:10}}>
                    <input  onChange={this.handleChangeFile} type="file" name="file"/>
                    <Button type="primary" icon="upload" onClick={this.handleSubmit}>上传</Button>
                </div>

								<div id="test"></div>
                <h2>图片列表</h2>
                <div className="album-list">
                    {
                        photoList.map((item,index)=>{

                            return (
                                <Card key={index} style={index ===0 ? { width: 240 } : {width:160}} bodyStyle={{ padding: 0 }}>
                                    <div className="custom-image">
                                        <img alt="example" width="100%" src={item.url} />
                                    </div>
                                    <div className="custom-card">
                                        <p>{`pic_${index+1}`}</p>
																				<p><a onClick={this.removePhoto.bind(null,item._id)}>删除</a></p>
                                    </div>
                                </Card>

                            )
                        })
                    }
                </div>

            </div>
        )
    }
}

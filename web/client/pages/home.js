import React, { Component } from 'react'
// import { Button } from 'antd-mobile'

class Home extends Component{
    render(){
        return (
            <div>
                <h4>首页</h4>
                <div><input placeholder="账号" /></div>
                <div><input placeholder="密码" /></div>
                <button>登录</button>
            </div>
        )
    }
}

export default Home
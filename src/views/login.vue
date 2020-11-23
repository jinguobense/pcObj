<template>
	<div class="login">
		<img src="../assets/img/beijng.png" class="img" alt="">
		<div class="shurukuang">
			
			<input placeholder="请输入账号" class="i1" v-model="phone" />
			<input placeholder="密码" class="i2" v-model="password" type="password" />
			<div class="jizhumima">
				<img src="../assets/img/weixuanzhong.png" v-if="images==false" @click="taop"/>
				<img src="../assets/img/xuanzhong.png" v-if="!images==false" @click="taop"/>
			    <span class="spancis">记住账号</span>
			</div>
			<button class="but" @click="longin">登          录</button>
		</div>
		<div class="ceshi">测试服</div>
	</div>
</template>

<script>
	import {Denglu , upretoken} from '../request/API/request.js'
	import { Base64 } from 'js-base64';
	export default{
		inject:['reload'],
		data(){
			return{
				images:false,
				phone:'',
				password:'',
				password1:'',
				
			}
		},
		methods:{
			taop(){
				this.images=!this.images
			},
			longin(){
				if(this.phone==''){
					this.$message({
						type: 'info',
						message: '请输入账号'
					});
					return
				}else if(this.password==''){
					this.$message({
						type: 'info',
						message: '请输入密码'
					});
					return
				}
				this.Denglu()
			},
			Denglu(){
				this.password1=Base64.encode(this.password);
				let params={
					loginName:this.phone,
					password:this.password1
				}
				let paramstoken = {
					userId:1
				}
				Denglu('sys/signIn',params).then(res=>{
					console.log(res)
					if(res.isSuccess==false){
						this.$message({
							type: 'info',
							message: res.message
						});
					}else{
						if(!res.resultData.rectoken){
							upretoken("sys/",paramstoken).then(ress => {
								console.log(ress,'更新retoken')
								if(ress.result == 0){
									localStorage.setItem('rectoken',ress.resultData.rectoken)
								}
							})
						}
						// this.$store.state.dengluxinxi=res.resultData
						sessionStorage.setItem("dengluxinxi",JSON.stringify(res.resultData));
						localStorage.setItem('userinfo',JSON.stringify(res.resultData))
						localStorage.setItem('userId',res.resultData.id)
						localStorage.setItem('rectoken',res.resultData.rectoken)
						this.$router.push({
							path:'/index'
						})
						// window.location.reload()
					}
					
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.ceshi{
		width: 300px;
		height: 300px;
		background-color: red;
		box-sizing: border-box;
		color: #fff;
		font-size: 50px;
		line-height: 300px;
		text-align: center;
		border-radius: 50%;
		
		position: absolute;
		left: 100px;
		top: 300px;
	}
	.img{
		// height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.login {
		width: 100%;
		height: 100%;
		position: relative;
	}
	.shurukuang {
		width: 600px;
		height: 420px;
		background-color: #ffffff;
		position: absolute;
		padding-left: 76px;
		padding-right: 76px;
		box-sizing: border-box;
		position: absolute;
		left: 50%;
		margin-left: -300px;
		top: 370px;
		input{
			display: block;
			width: 449px;
			height: 57px;
			border: 1px #e4e4e4 solid;
			border-radius: 10px;
			outline: none;
		}
		
	}
	.i1{
		margin-top: 72px;
		margin-bottom: 40px;
		background-image: url(../assets/img/zhanghao.png);
		background-repeat: no-repeat;
		background-position: 24px;
		padding-left: 80px;
		box-sizing: border-box;
	}
	.i2{
		
		
		background-image: url(../assets/img/mima.png);
		background-repeat: no-repeat;
		background-position: 24px;
		padding-left: 80px;
		box-sizing: border-box;
	}
	.jizhumima{
		margin-top: 29px;
		display: flex;
		font-size: 16px
	}
	.spancis{
		margin-left: 20px;
	}
	.but{
		width: 445px;
		height: 61px;
		background-color: #43bcfb;
		border: 0;
		margin-top: 28px;
		color: #ffffff;
		font-size: 16px;
		outline: none;
	}
</style>

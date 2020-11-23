<template>
	<sidebar-menu :menu="menu">
	</sidebar-menu>
</template>

<script>
	
	import { SidebarMenu } from 'vue-sidebar-menu'
	export default {
		components: {
		    SidebarMenu
		},
		data() {
			
			return {
				menu: [{
						header: true,
						title: 'Main Navigation',
						hiddenOnCollapse: false
					},
					{
						href: '/',
						title: 'Dashboard',
						// icon: 'fa fa-user'
					},
					{
						// href: '/about',
						title: 'about',
						// icon: 'fa fa-chart-area',
						child: [{
							href: '/charts/sublink',
							title: 'Sub Link'
						}]
					}
				]
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.v-sidebar-menu{
		background-color: #fff;
		color: #333;
		.vsm--title{
			color: #333;
			font-size: 16px;
		}
	}
	.v-sidebar-menu.vsm_expanded .vsm--item_open .vsm--link_level-1 {
		color: #333;
		font-size: 16px;
	}
	
</style>

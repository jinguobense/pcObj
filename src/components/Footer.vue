<template>
	<div class="footer">
		<div class="box1">
            <span class="s1">数得着服务平台</span>
            <span class="s2">© 2015-2025</span>
        </div>
	</div>
</template>

<script>
export default {
    name :'footer'
}
</script>

<style lang="less" scoped>


.footer {
    // width: 1738px;
    height: 42px;
    background-color: #ffffff;
    // position: fixed;
    bottom: 0;
    right: 0;
}
.box1 {
display: flex;
align-items: center;
}
.s1 {
    font-size: 16px;
    color:#0b9cf4;
}
.s2 {
    font-size: 16px;
    color:#666666;
}
</style>

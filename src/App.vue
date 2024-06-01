<template>
    <div class="container">
        <div class="hello-world">
            父子页面<br>通信测试<br>

            <el-button @click="$refs.refFile.click()">打开文件</el-button>
            <br><br>type域<br>
            <div>{{ typeData }}</div>
            <br>message域<br>
            <div class="msg-data">{{ msgData }}</div>
        </div>

        <div class="main-app">
            <iframe src="http://81.70.253.17:5633/" ref="mainApp" style="width: 100%;height: 100%"></iframe>
        </div>
    </div>
    <input type="file" id="files" ref="refFile" style="display: none" accept=".xml, .bpmn" @change="onOpenClick"/>
</template>

<script>

export default {
    name: 'Father',
    mounted() {
        window.addEventListener('message', (event) => {
            if (typeof event.data === 'string') {
                const jsonData = JSON.parse(event.data)
                this.typeData = jsonData.type;
                this.msgData = jsonData.message;
            }
        });
    },
    data() {
        return {
            typeData: '',
            msgData: '',
        };
    },
    methods: {
        onOpenClick(event) {
            console.log('onOpenClick');
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                const fileName = file.name.split('.')[0];
                reader.readAsText(file);
                reader.onload = () => {
                    let xmlStr = reader.result;

                    if (this.$refs.mainApp) {
                        const mainApp = this.$refs.mainApp.contentWindow;
                        const data = {
                            type: 'open',
                            fileName: fileName,
                            fileData: xmlStr
                        }

                        mainApp.postMessage(JSON.stringify(data), "*");
                    }
                };
            }
        },
    },
};
</script>

<style>
.container {
    display: flex; /* 启用flex布局 */
    width: 100%; /* 容器宽度占满整个页面宽度 */
    height: 100vh;
}

.hello-world {
    font-family: Arial, sans-serif; /* 字体 */
    width: 150px;
}

.hello-world br {
    margin-bottom: 10px; /* 分割行的间距 */
}

.hello-world el-button {
    display: block;
    margin: 10px 0; /* 按钮的上下间距 */
}

.hello-world div {
    margin: 10px 0; /* div的上下间距 */
    padding: 10px;
    background-color: #ffffff; /* div的背景颜色 */
    border: 1px solid #add8e6; /* div的边框颜色 */
    border-radius: 5px; /* div的圆角 */
}

.msg-data {
    max-width: 150px;
    word-wrap: break-word;
}

.main-app {
    flex: 1;
}

</style>

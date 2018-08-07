let app = getApp();
//替换成开发者后台设置的安全域名
let url = "http://30.27.110.27:8080";
Page({
    data:{
        corpId: '',
        authCode:'',
        userId:'',
        param: '',
    },
    onLoad(query){
        this.setData({
            param: query.param
        })
    },
    onShow() {
        let _this = this;
        this.setData({
            corpId: app.globalData.corpId,
        })
        let param = this.data.param;
        dd.getAuthCode({
            success:(res)=>{
                _this.setData({
                    authCode:res.authCode
                })
            
                console.log('authCode',res.authCode);
                dd.httpRequest({
                    url: url+'/login',
                    method: 'POST',
                    data: {
                        authCode: res.authCode,
                        corpId:app.globalData.corpId,
                    },
                    dataType: 'json',
                    success: function(res) {
                        console.log('success----',res)
                        let corpName = res.data.result.corpName;
                        let userId = res.data.result.userId;
                        let userName = res.data.result.userName;
                        _this.setData({
                            corpName:corpName
                        })
                        _this.setData({
                            userId:userId
                        })
                        _this.setData({
                            userName:userName
                        })
                    },
                    fail: function(res) {
                        console.log("httpRequestFail---",res)
                        dd.alert({content: JSON.stringify(res)});
                    },
                    complete: function(res) {
                        dd.hideLoading();
                    }
                    
                });
            },
            fail: (err)=>{
                dd.alert({
                    content: JSON.stringify(err)
                })
            }
        })
    },

    sendMsg(){
        dd.httpRequest({
            url: url+'/sendMsg',
            method: 'POST',
            data: {
                userId: this.data.userId,
                corpId:app.globalData.corpId,
            },
            dataType: 'json',
            success: function(res) {
                console.log('success----',res)
            },
            fail: function(res) {
                console.log("httpRequestFail---",res)
                dd.alert({content: JSON.stringify(res)});
            },
            complete: function(res) {
                dd.hideLoading();
            }
        });
    }
})
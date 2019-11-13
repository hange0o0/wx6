class ResultUI extends game.BaseUI_wx4{

    private static _instance:ResultUI;
    public static getInstance() {
        if (!this._instance) this._instance = new ResultUI();
        return this._instance;
    }

    private bg: eui.Image;
    private coinText: eui.Label;
    private skillList: eui.List;
    private awardBtn: eui.Button;
    private shareBtn: eui.Button;
    private failGroup: eui.Group;
    private barMC: eui.Image;
    private rateText: eui.Label;
    private titleText: eui.Label;
    private ad1: eui.Image;
    private ad2: eui.Image;





    public zjVideo = false
    public zjVideoTimes = 0;


    public isWin;
    public result;
    public rate = 3;
    public alertRate = 1;
    public constructor() {
        super();
        this.skinName = "ResultUISkin";
        this.hideBehind = false;

        this.isShowAD = true;
        this.adBottom = 50;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.skillList.itemRenderer = ResultItem;

        this.addBtnEvent(this.ad1,()=>{
            MyADManager.getInstance().showAD(this.ad1['adData'])
        })
        this.addBtnEvent(this.ad2,()=>{
            MyADManager.getInstance().showAD(this.ad2['adData'])
        })

        this.addBtnEvent(this.awardBtn,()=>{
            MyWindow.ShowTips('获得金币：'+MyTool.createHtml('+' + NumberUtil_wx4.addNumSeparator(this.result.coin,2),0xFFFF00),1000)
            MyWindow.ShowTips('获得技能碎片：'+MyTool.createHtml('+' + this.result.skillNum,0xFFFF00),1000)
            this.close();
            SoundManager.getInstance().playEffect('coin')
        })

        this.addBtnEvent(this.shareBtn,()=>{
            if(this.zjVideo)
            {
                ZijieScreenBtn.e.awardPublish(()=>{
                    this.zjVideoTimes ++;
                    MyWindow.ShowTips('获得金币：'+MyTool.createHtml('+' + NumberUtil_wx4.addNumSeparator(this.result.coin*this.rate,2),0xFFFF00),1000)
                    MyWindow.ShowTips('获得技能碎片：'+MyTool.createHtml('+' + this.result.skillNum*this.rate,0xFFFF00),1000)
                    this.close();
                    SoundManager.getInstance().playEffect('coin')
                    this.rate --
                    while(this.rate > 0)
                    {
                        PKManager.getInstance().endGame(this.result);
                        this.rate --
                    }
                })
                return;
            }
            ShareTool.openGDTV(()=>{
                MyWindow.ShowTips('获得金币：'+MyTool.createHtml('+' + NumberUtil_wx4.addNumSeparator(this.result.coin*this.rate,2),0xFFFF00),1000)
                MyWindow.ShowTips('获得技能碎片：'+MyTool.createHtml('+' + this.result.skillNum*this.rate,0xFFFF00),1000)
                this.close();
                SoundManager.getInstance().playEffect('coin')
                this.rate --
                while(this.rate > 0)
                {
                    PKManager.getInstance().endGame(this.result);
                    this.rate --
                }

            })
        })


    }

    public close(){
        this.hide();
        PKUI.getInstance().hide()
    }

    public onShow(){
        ZijieScreenBtn.e && ZijieScreenBtn.e.stop();
        this.renew();
    }

    public show(isWin?){
        PKC.isPKing = false;
        PKC.isStop = true;
        this.isWin = isWin;
        PKManager.getInstance().sendGameEnd(isWin)
        if(this.isWin)
        {
            UM_wx4.level ++;
            UM_wx4.upWXLevel();
        }
        super.show()
    }


    public renew(){
        this.zjVideo = false;
        var rate = PKC.monsterList.length/PKC.roundMonsterNum
        this.result = this.isWin?PKManager.getInstance().getWinResult():PKManager.getInstance().getFailResult(1-rate)
        if(this.isWin)
            SoundManager.getInstance().playEffect('win')
        else
            SoundManager.getInstance().playEffect('lose')

        var list = [];
        for(var s in this.result.skill)
        {
            list.push({
                id:s,
                num:this.result.skill[s],
                lastLevel:SkillManager.getInstance().getSkillLevel(s),
            })
        }

        PKManager.getInstance().endGame(this.result);

        for(var i=0;i<list.length;i++)
        {
            list[i].currentLevel = SkillManager.getInstance().getSkillLevel(list[i].id)
        }
        this.skillList.dataProvider = new eui.ArrayCollection(list);
        this.coinText.text = '金币 +' + NumberUtil_wx4.addNumSeparator(this.result.coin);

        this.failGroup.visible = !this.isWin;
        if(this.failGroup.visible)
        {

            var mLen = PKC.monsterList.length;
            var mNum = mLen + PKC.autoMonster.length;
            var rate = mNum/PKC.roundMonsterNum
            this.barMC.width = 360*rate;
            this.rateText.text = '剩余怪物：'+(mNum)

            this.titleText.text = '惜败！'
            this.titleText.textColor = 0xFF0000
        }
        else
        {
            this.titleText.text = '大胜！'
            this.titleText.textColor = 0xFFFF00

            if(ZijieScreenBtn.e && this.zjVideoTimes < 3)
            {
                this.zjVideo = true;
            }
        }


        var adArr = MyADManager.getInstance().getListByNum(10);
        var ad = ArrayUtil_wx4.randomOne(adArr,true);
        if(ad)
        {
            this.ad1['adData'] = ad;
            this.ad1.source = ad.logo
            this.ad1.visible = true;
        }
        else
        {
            this.ad1.visible = false;
        }


        var ad = ArrayUtil_wx4.randomOne(adArr,true);
        if(ad)
        {
            this.ad2['adData'] = ad;
            this.ad2.source = ad.logo
            this.ad2.visible = true;
        }
        else
        {
            this.ad2.visible = false;
        }

        if(this.zjVideo)
            this.shareBtn.icon = 'zj_video_icon_png'
        else
            this.shareBtn.icon = 'video_icon_png'


        if(!UM_wx4.isTest && Config.isWX && Math.random() < this.alertRate)
        {
            this.alertRate /= 2;
            var wx = window['wx'];
            wx.showModal({
                title: '体验小游戏',
                showCancel:true,
                cancelText:'放弃体验',
                confirmText:'进入游戏',
                content: '塔防游戏不修塔，却修路？\n一笔画与塔防游戏的创意结合，\n【微信小游戏】诚邀你来体验！',
                success: (res)=> {
                    if (res.confirm) {

                        wx.navigateToMiniProgram({
                            appId: 'wxab49a5d0b64390db',
                            success:(res)=>{
                                this.alertRate = 0;
                            }
                        })
                    }
                }
            })
        }
    }

    public hide(){
        super.hide();
    }
}
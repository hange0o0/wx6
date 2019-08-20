class GameUI extends game.BaseUI_wx4 {

    private static _instance: GameUI;
    public static getInstance(): GameUI {
        if(!this._instance)
            this._instance = new GameUI();
        return this._instance;
    }


    private bg: eui.Image;
    private coinText: eui.Label;
    private soundBtn: eui.Image;
    private feedBackBtn: eui.Image;
    private ad1: eui.Image;

    public constructor() {
        super();
        this.skinName = "GameUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addBtnEvent(this.feedBackBtn,()=>{
           FeedBackUI.getInstance().show();
        })
        this.addBtnEvent(this.ad1,()=>{
           MyADManager.getInstance().showAD(this.ad1['adData'])
        })

        this.addBtnEvent(this.soundBtn,()=>{
            SoundManager.getInstance().soundPlaying = !SoundManager.getInstance().soundPlaying
            SoundManager.getInstance().bgPlaying = !SoundManager.getInstance().bgPlaying
            //if(SoundManager.getInstance().bgPlaying)
            //    SoundManager.getInstance().playSound('bg')
            //else
            //    SoundManager.getInstance().stopBgSound()
            this.renewSound();
        },this,true)


        MyTool.addLongTouch(this.coinText,()=>{
            if(egret.getTimer() - DebugUI.getInstance().debugTimer < 3000)
            {
                MyWindow.ShowTips('你作弊！')
                DebugUI.getInstance().debugOpen = true
            }
        },this)

        MyTool.addLongTouch(this.soundBtn,()=>{
            if(DEBUG)
            {
                DebugUI.getInstance().show();
                return;
            }
            if(DebugUI.getInstance().debugOpen && !SoundManager.getInstance().soundPlaying)
            {
                DebugUI.getInstance().show();
            }
        },this)


    }



    private renewSound(){
        this.soundBtn.source = SoundManager.getInstance().bgPlaying?'sound_btn1_png':'sound_btn2_png'
    }

    public show(){
        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        if(_get['pos'])
            UM_wx4.gunPosNum = parseInt(_get['pos']);
        if(_get['level'])
            UM_wx4.level = parseInt(_get['level']);
        SoundManager.getInstance().playSound('bg')


        this.bg.height = GameManager_wx4.uiHeight + 250;
        this.bg.y = 0;

        this.renewSound();
        this.renew();
        this.renewCoin();
        this.addPanelOpenEvent(GameEvent.client.COIN_CHANGE,this.renewCoin)
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
        this.addPanelOpenEvent(GameEvent.client.GUN_CHANGE,this.renew)

        if(UM_wx4.pastDayCoin.coin)
        {
            PassDayAwardUI.getInstance().show();
        }
        this.showTips();
        //this.addChild(PKUI.getInstance())
        //PKUI.getInstance().onShow()
    }

    private showTips(){

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


        //var ad = ArrayUtil_wx4.randomOne(adArr,true);
        //if(ad)
        //{
        //    this.ad2['adData'] = ad;
        //    this.ad2.source = ad.logo
        //    this.ad2.visible = true;
        //}
        //else
        //{
        //    this.ad2.visible = false;
        //}

    }

    private onE(){
        if(!this.visible)
            return;
        //PKUI.getInstance().onE();
        //for(var i=0;i<this.gunArr.length;i++) {
        //    var item = this.gunArr[i];
        //    item.onE();
        //}
        //if(this.dragTarget.stage)
        //    this.dragTarget.onE();
        //
        //if(!this.startBtn.visible)
        //    return;
        ////this.gunCon.rotation += 0.1;
        ////for(var i=0;i<this.gunArr.length;i++) {
        ////    var item = this.gunArr[i];
        ////    item.rotation = -this.gunCon.rotation
        ////}
        //this.renewCoinCD();
        //
        //this.bg.y += 1;
        //if(this.bg.y > 0)
        //    this.bg.y -= 200;

        //if(egret.getTimer() - this.lastShoot > 500)
        //{
        //    this.lastShoot = egret.getTimer();
        //    var mc = BulletMC.createItem();
        //    this.bulletGroup.addChild(mc);
        //    mc.x = 10 + Math.random()*620
        //    mc.y = GameManager_wx4.uiHeight + 50;
        //    mc.data = {
        //        scale:1,
        //        id:ArrayUtil_wx4.randomOne(GunManager.getInstance().getMyGunList()),
        //    };
        //    egret.Tween.get(mc).to({y:-100},(GameManager_wx4.uiHeight+150)*1).call(()=>{
        //        BulletMC.freeItem(mc);
        //    })
        //    mc.rotation = 0
        //    egret.Tween.get(mc,{loop:true}).to({rotation:360},300)
        //
        //
        //
        //
        //}
    }


    public onVisibleChange(){
        if(this.visible)
        {
            this.renew();
            this.showTips();
            if(UM_wx4.pastDayCoin.coin)
            {
                PassDayAwardUI.getInstance().show();
            }
        }
    }

    private renewCoin(){
        this.coinText.text = NumberUtil_wx4.addNumSeparator(UM_wx4.coin);
    }

    public renew(){
        this.bg.source = UM_wx4.getBG();
    }
}
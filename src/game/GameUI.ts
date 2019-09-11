class GameUI extends game.BaseUI_wx4 {

    private static _instance: GameUI;
    public static getInstance(): GameUI {
        if(!this._instance)
            this._instance = new GameUI();
        return this._instance;
    }


    private coinText: eui.Label;
    private energyText: eui.Label;
    private soundBtn: eui.Image;
    private feedBackBtn: eui.Image;
    private ad1: eui.Image;
    private ad2: eui.Image;
    private equipBtn: eui.Group;
    private equipRedMC: eui.Image;
    private skillBtn: eui.Group;
    private skillRedMC: eui.Image;
    private levelBtn: eui.Group;
    private levelRedMC: eui.Image;
    private addForceBtn: eui.Group;
    private addForceText: eui.Label;
    private startBtn2: eui.Button;
    private startBtn1: eui.Button;
    private desText: eui.Label;




    private moveState = 0
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
        this.addBtnEvent(this.ad2,()=>{
           MyADManager.getInstance().showAD(this.ad2['adData'])
        })


        this.addBtnEvent(this.equipBtn,()=>{
            GunListUI.getInstance().show();
        })

        this.addBtnEvent(this.skillBtn,()=>{
            SkillListUI.getInstance().show()
        })

        this.addBtnEvent(this.levelBtn,()=>{
            PlayerUpUI.getInstance().show();
        })

        this.addBtnEvent(this.addForceBtn,()=>{

        })

        this.addBtnEvent(this.startBtn1,()=>{
            var PKM = PKManager.getInstance();
            if(PKM.lastChooseData.length == 0)
            {
                var enery = PKM.getEnergyCost();
                if(PKM.getEnergy() < enery)
                {
                    MyWindow.Confirm('体力不足'+enery+'点，可观看广告免去本次体力消耗。',(type)=>{
                        if(type == 1)
                        {
                            ShareTool.openGDTV(()=>{
                                PKM.initChooseSkill();
                                SkillChooseUI.getInstance().show();
                            })
                        }

                    },['取消', '观看广告'])
                    return;
                }
                PKM.addEnergy(-enery);
                PKM.initChooseSkill();
            }
            SkillChooseUI.getInstance().show();
            //PKUI.getInstance().show();
        })

        this.addBtnEvent(this.startBtn2,()=>{
            if(UM_wx4.level < 30)
                MyWindow.Alert('闯关达到30后解锁')
            else
                MyWindow.Alert('功能正在开发中，很快就能和好友一起游戏啦')
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
        if(_get['level'])
            UM_wx4.level = parseInt(_get['level']);
        SoundManager.getInstance().playSound('bg')



        this.renewSound();
        this.renewCoin();
        this.renewEnergy();
        this.addPanelOpenEvent(GameEvent.client.COIN_CHANGE,this.renewCoin)
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
        this.addPanelOpenEvent(GameEvent.client.GUN_CHANGE,this.renewGun)
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)

        if(UM_wx4.pastDayCoin.coin)
        {
            PassDayAwardUI.getInstance().show();
        }
        this.showTips();
        this.addChildAt(PKCodeUI.getInstance(),0)
        PKC.isAuto = true;
        PKCodeUI.getInstance().onShow()
        PKC.playerData.randomSKill();

    }

    private onTimer(){
        if(!this.visible)
            return
        this.renewEnergy();
    }

    private renewEnergy(){
        var PKM = PKManager.getInstance()
        var energy = PKM.getEnergy();
        if(energy == 0)
        {
            this.energyText.text = DateUtil_wx4.getStringBySecond(PKM.getNextEnergyCD()).substr(-5)
            this.energyText.textColor = 0xFF0000
        }
        else
        {
            this.energyText.text = energy + '/' + PKM.maxEnergy
            this.energyText.textColor = 0xFCD766
        }
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

    }

    private onE(){
        if(!this.visible)
            return
        if(PKC.isStop)
            return;
        var ui = PKCodeUI.getInstance();
        var playerData = PKC.playerData;
        var monster = PKC.monsterList[0]
        if(monster && monster.isDie)
        {

        }
        if(monster && !monster.isDie)
        {
            var len = MyTool.getDis(monster,playerData);

            if(len > playerData.atkDis -10)
            {
                ui.playerItem.move({
                    x1:playerData.x,
                    y1:playerData.y,
                    x2:monster.x,
                    y2:monster.y,
                })
                this.moveState = 1
                if(playerData.skillsList.length && Math.random() < 0.01)//用技能
                {
                    playerData.useSkill(ArrayUtil_wx4.randomOne(playerData.skillsList).sid)
                }
            }
            else if(this.moveState == -1 || len < 40 + (playerData.atkDis-40)/3)
            {
                ui.playerItem.move({
                    x2:playerData.x,
                    y2:playerData.y,
                    x1:monster.x,
                    y1:monster.y,
                })

                if(len > 40 + (playerData.atkDis-40)/3*2)
                    this.moveState = 0;
                else
                    this.moveState = -1
            }
            else
            {
                this.moveState = 0
            }


        }

        ui.onE();
        ui.renewConY(true);
    }


    public onVisibleChange(){
        if(this.visible)
        {
            this.showTips();
            if(UM_wx4.pastDayCoin.coin)
            {
                PassDayAwardUI.getInstance().show();
            }

            this.addChildAt(PKCodeUI.getInstance(),0)
            PKC.isAuto = true;
            PKCodeUI.getInstance().onShow()
            PKC.playerData.randomSKill();
        }
    }

    private renewCoin(){
        this.coinText.text = NumberUtil_wx4.addNumSeparator(UM_wx4.coin);
        this.renewRed();
    }

    public renewGun(){
        PKC.playerData.gunid = GunManager.getInstance().gunid;
        PKC.playerData.relateItem.dataChanged();
        this.renewRed();
    }

    private renewRed(){
        this.equipRedMC.visible = GunManager.getInstance().myGun.length < GunManager.getInstance().getUnlockNum();
        this.levelRedMC.visible = UM_wx4.coin >= PKManager.getInstance().getUpCost()
    }
}
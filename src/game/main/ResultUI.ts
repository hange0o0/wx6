class ResultUI extends game.BaseUI_wx4{

    private static _instance:ResultUI;
    public static getInstance() {
        if (!this._instance) this._instance = new ResultUI();
        return this._instance;
    }

    private bg: eui.Image;
    private awardBtn: eui.Button;
    private shareBtn: eui.Button;
    private coinText: eui.Label;
    private coinAddText: eui.Label;
    private failGroup: eui.Group;
    private failTipsGroup: eui.Group;
    private barMC: eui.Rect;
    private rateText: eui.Label;
    private titleText: eui.Label;
    private timeText: eui.Label;
    private failText: eui.Label;





    public addCoin = 0;
    public rate = 3;
    public constructor() {
        super();
        this.skinName = "ResultUISkin";
        this.hideBehind = false;

        this.isShowAD = true;
        this.adBottom = 50;
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.awardBtn,()=>{
            MyWindow.ShowTips('获得金币：'+MyTool.createHtml('+' + NumberUtil_wx4.addNumSeparator(this.addCoin,2),0xFFFF00),1000)
            this.close();
            SoundManager.getInstance().playEffect('coin')
        })
        this.addBtnEvent(this.shareBtn,()=>{
            ShareTool.openGDTV(()=>{
                UM_wx4.addCoin(this.addCoin*(this.rate-1));
                MyWindow.ShowTips('获得金币：'+MyTool.createHtml('+' + NumberUtil_wx4.addNumSeparator(this.addCoin*this.rate,2),0xFFFF00),1000)
                this.close();
                SoundManager.getInstance().playEffect('coin')
            })

        })
    }

    public close(){
        this.hide();
        PKingUI.getInstance().hide()
    }

    public onShow(){
        this.renew();
    }


    public renew(){
        var PD = PKCode_wx4.getInstance();
        var rate = PD.enemyHp / PD.enemyHpMax;
        var coin = (PD.enemyHpMax - PD.enemyHp)/300*Math.pow(0.994,UM_wx4.level)
        var add = BuffManager.getInstance().getCoinAdd();

        this.timeText.text = ''
        this.failText.text = ''
        this.failTipsGroup.visible = false
        if(PlayManager.getInstance().isEndLess)
        {
            this.titleText.text = '游戏结束！'
            this.titleText.textColor = 0xFFFFFF
            this.failGroup.visible = false
            coin = (Math.abs(PD.enemyHp)/280)
            var cd = Math.floor(PD.actionStep/30)  + PD.endLessPassStep*5
            var cd2 = Math.floor(PD.actionStep/30*100)%100

            if(cd > UM_wx4.endLess)
            {
                UM_wx4.endLess = cd;
                UM_wx4.needUpUser = true;
                UM_wx4.upWXEndLess()
                this.timeText.text = '新纪录\n' + DateUtil_wx4.getStringBySecond(cd).substr(-5) + '.' + ('00' + cd2).substr(-2)
            }
            else
            {
                this.timeText.text = '用时\n' + DateUtil_wx4.getStringBySecond(cd).substr(-5) + '.' + ('00' + cd2).substr(-2)
            }
            SoundManager.getInstance().playEffect('lose')
            PlayManager.getInstance().sendGameEnd(true,cd + '')
        }
        else if(rate == 0)
        {
            if(UM_wx4.level % 5 == 0)
                MyADManager.getInstance().showInsert()


            this.titleText.text = '大胜！'
            this.titleText.textColor = 0xFFFF00
            this.failGroup.visible = false
            coin*=3;
            coin += 300 + 50*(UM_wx4.level - 1)
            UM_wx4.level ++;
            UM_wx4.needUpUser = true;
            UM_wx4.upWXLevel()
            SoundManager.getInstance().playEffect('win')
            PlayManager.getInstance().sendUseGun()
            PlayManager.getInstance().sendGameEnd(true)
        }
        else
        {
             this.titleText.text = '惜败！'
            this.titleText.textColor = 0xFF0000
            this.failGroup.visible = true
            this.barMC.width = 360*rate;
            this.rateText.text = '剩余怪物：'+MyTool.toFixed(rate*100,1)+'%'
            var arr = [ '* 升级武器提升攻击力']
            if(GunManager.getInstance().getUnlockGun())
                arr.push( '* 解锁并装备新的武器')
            if(UM_wx4.level >= 100)
                arr.push( '* 打造新的武器')
            if(UM_wx4.gunPosNum < 9)
                arr.push( '* 解锁新的武器槽')
            if(BuffManager.getInstance().getUserNum() < 20)
                arr.push( '* 邀请好友增加城墙血量')

            this.failText.text = arr.join('\n')
            this.failTipsGroup.visible = true
            SoundManager.getInstance().playEffect('lose')
            PlayManager.getInstance().sendGameEnd(false,MyTool.toFixed(rate*100,1)+'%')
        }
        coin *= (1+add/100 + PKCode_wx4.getInstance().coinAdd/100);
        coin = this.addCoin = Math.ceil(coin);
        UM_wx4.addCoin(coin);
        this.coinText.text = '金币 +' + NumberUtil_wx4.addNumSeparator(coin);
        if(add)
            this.coinAddText.text = '好友助力加成 +'+add+'%'
        else
            this.coinAddText.text = '没有好友助力加成'


        if(PlayManager.getInstance().isEndLess)
            this.rate = Math.max(3,Math.ceil(800/this.addCoin))
        else if(rate != 0)
            this.rate = Math.max(3,Math.ceil(600/this.addCoin))
        else
            this.rate = Math.max(3,Math.ceil(1000/this.addCoin))
        this.rate = Math.min(30,this.rate);
        this.shareBtn.label = this.rate + '倍领取'

        //this.bg.source = UM.getBG();
    }

    public hide(){
        super.hide();
    }
}
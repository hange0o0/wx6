class PKUI extends game.BaseUI_wx4{
    private static _instance:PKUI;
    public static getInstance():PKUI {
        if (!this._instance)
            this._instance = new PKUI();
        return this._instance;
    }


    private s1: PKSkillItem;
    private s2: PKSkillItem;
    private s3: PKSkillItem;
    private s4: PKSkillItem;
    private s5: PKSkillItem;
    private s6: PKSkillItem;
    private ctrlGroup: eui.Group;
    private ctrlBG: eui.Image;
    private ctrlMC: eui.Image;
    private skillInfoGroup: eui.Group;
    private skillInfoItem: PKSkillItem;
    private desText: eui.Label;
    private skillNameText: eui.Label;
    private skillCDText: eui.Label;
    private hpBar: eui.Image;
    private hpText: eui.BitmapLabel;
    private rateBar: eui.Image;
    private monsterText: eui.Label;







    public touchID
    public skillArr = [];
    public middleR = 180

    public constructor() {
        super();
        this.skinName = "PKUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();


        for(var i=1;i<=6;i++)
        {
            this.skillArr.push(this['s' + i])
        }
        this.addBtnEvent(this.skillInfoGroup,this.hideSkillInfo)


        this.ctrlGroup.touchEnabled = true
        this.ctrlGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
    }

    private onTouchBegin(e: egret.TouchEvent) {
        if (!this.touchID) {
            var p = this.ctrlGroup.localToGlobal(this.middleR,this.middleR)
            this.touchID = {
                id: e.touchPointID,
                x1: p.x,
                y1: p.y,
                x2: e.stageX,
                y2: e.stageY,
            }
            this.resetTouchingShow();
        }
    }

    private onTouchMove(e) {
        if (this.touchID && e.touchPointID == this.touchID.id) {
            this.touchID.x2 = e.stageX
            this.touchID.y2 = e.stageY
            this.resetTouchingShow();
        }
    }

    private resetTouchingShow(){
        var touchR = this.middleR;
        var r = MyTool.getDistance(this.touchID.x1, this.touchID.y1 ,this.touchID.x2, this.touchID.y2)
        if (r > 75)
            r = 75;
        var angle = Math.atan2(this.touchID.y2 - this.touchID.y1, this.touchID.x2 - this.touchID.x1)
        this.ctrlMC.x = Math.cos(angle) * r + touchR
        this.ctrlMC.y = Math.sin(angle) * r + touchR
        this.ctrlBG.rotation = angle/Math.PI*180+90
    }

    public onTouchEnd(e?) {
        if (!e || (this.touchID && e.touchPointID == this.touchID.id)) {
            this.touchID = null;
            this.resetTouchGroup();
        }
    }

    private resetTouchGroup() {
        var touchR = this.middleR
        this.ctrlMC.x = touchR
        this.ctrlMC.y = touchR
    }


    public onShow(){
        this.resetTouchGroup()
        this.height = GameManager_wx4.uiHeight
        this.addChildAt(PKCodeUI.getInstance(),0)
        PKCodeUI.getInstance().onShow();


        this.renewSkill()
        this.renewHp()
        this.onTimer()
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)
        this.addPanelOpenEvent(GameEvent.client.HP_CHANGE,this.renewHp)
        this.addPanelOpenEvent(GameEvent.client.SKILL_USE,this.renewSkillCD)
    }

    private renewSkill(){
        for(var i=0;i<this.skillArr.length;i++)
        {
            this.skillArr[i].data = PKC.playerData.skillsList[i]
        }
        this.hideSkillInfo();
    }

    public showSkillInfo(data){
        this.skillInfoGroup.visible = true;
        this.skillInfoItem.data = data;
        var svo = data.getVO();

        this.skillNameText.text = svo.name
        var cd = svo.getCD();
        if(cd)
            this.setHtml(this.skillCDText,'技能间隔:' + this.createHtml(MyTool.toFixed(cd/1000,1) + '秒',0xFFFF00))
        else
            this.setHtml(this.skillCDText,this.createHtml('被动技能',0xECAEF9))
        this.setHtml(this.desText, svo.getDes())

        for(var i=0;i<this.skillArr.length;i++)
        {
            this.skillArr[i].setSelect(data)
        }
    }

    public hideSkillInfo(){
        this.skillInfoGroup.visible = false;
        for(var i=0;i<this.skillArr.length;i++)
        {
            this.skillArr[i].setSelect(-1)
        }
    }

    public onE(){
        if(!this.visible)
            return
        var ui = PKCodeUI.getInstance();
        var playerData = PKC.playerData;
        if (this.touchID) {
            ui.playerItem.move(this.touchID)
        }
        if(this.touchID || playerData.isSkilling)
        {
            ui.renewConY();
        }
        ui.onE();

        if(playerData.hp <= 0)
        {
            playerData.hp = playerData.maxHp
        }

        this.renewSkillCD();
    }

    private onTimer(){
        var mNum = PKC.monsterList.length;
        this.monsterText.text = '当前怪物数量:' + mNum + '/' + PKC.maxMonster
        var rate = mNum/PKC.maxMonster
        if(rate < 0.3)
            this.monsterText.textColor = 0x00FF00
        else if(rate > 0.7)
            this.monsterText.textColor = 0xFF0000
        else
            this.monsterText.textColor = 0xFFFF00

        if(mNum >= PKC.maxMonster)
        {
            console.log('fail')
        }
    }

    private renewSkillCD(){
        var len = this.skillArr.length;
        for(var i=0;i<len;i++)
        {
            this.skillArr[i].onE()
        }
    }

    public renewHp(){
        var w =  354 - 14*2;
        var playerData = PKC.playerData;
        var hp = Math.max(0,playerData.hp);
        var rate = hp/playerData.maxHp
        this.hpText.text = hp + ''
        this.hpBar.width = Math.max(14,14 + w*rate);
        //PKC.playerData.relateItem.renewHp();
    }

}
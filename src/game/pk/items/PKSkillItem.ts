class PKSkillItem extends game.BaseItem{
    public constructor() {
        super();
        this.skinName = "PKSkillItemSkin";
    }

    private mc: eui.Image;
    private rateBGMC: eui.Image;
    private rateMC: eui.Image;
    private selectMC: eui.Image;




    public isShowInfo = false
    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,this.onClick)

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin,this)
        GameManager_wx4.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this)
        //MyTool.addLongTouch(this,this.onLongTouch,this)
    }

    private onBegin(){
        if(!this.data)
            return;
        PKUI.getInstance().showSkillInfo(this.data)
        this.isShowInfo = true
    }
    private onMove(e){
        if(!this.isShowInfo)
            return;
        if(!this.hitTestPoint(e.stageX,e.stageY))
        {
            PKUI.getInstance().hideSkillInfo()
            this.isShowInfo = false
        }
    }

    private onClick(){
        if(!this.data)
            return;
        PKC.playerData.useSkill(this.data.sid)
        PKUI.getInstance().hideSkillInfo()
        this.isShowInfo = false
    }


    public dataChanged(){
        if(!this.data)
        {
            this.currentState = 'lock'
            return;
        }
        this.currentState = 'normal'
        this.mc.source = 'skill_'+this.data.sid+'_jpg'
        this.selectMC.visible = false;
        this.setRateVisible(false);
    }

    public setSelect(data){
        this.selectMC.visible = this.data == data;
    }

    public setRateVisible(b){
        this.rateMC.visible = b;
        this.rateBGMC.visible = b;
    }

    public onE(){
        if(!this.data)
            return;
        if(!this.data.isActive)
            return;
        var playerData = PKC.playerData
        if(playerData.isSkilling)
        {
            if(playerData.isSkilling == this.data.sid)
            {
                this.setRateVisible(false);
            }
            else
            {
                this.setRateVisible(true);
                this.rateMC.height = this.mc.height
            }
            return;
        }
        var cd = playerData.getSkillCD(this.data.sid)
        if(cd)
        {
            this.setRateVisible(true);
            this.rateMC.height = Math.min(1,cd/this.data.maxCD)*80
        }
        else
        {
            this.setRateVisible(false);
        }

    }
}
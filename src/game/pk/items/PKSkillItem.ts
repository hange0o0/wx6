class PKSkillItem extends game.BaseItem{
    public constructor() {
        super();
        this.skinName = "PKSkillItemSkin";
    }

    private mc: eui.Image;
    private rateBGMC: eui.Image;
    private rateMC: eui.Image;
    private selectMC: eui.Image;




    private showInfoTime = 0;
    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,this.onClick)
        MyTool.addLongTouch(this,this.onLongTouch,this)
    }

    private onLongTouch(){
        if(!this.data)
            return;
        PKUI.getInstance().showSkillInfo(this.data)
        this.showInfoTime = egret.getTimer();
        GameManager_wx4.stage.once(egret.TouchEvent.TOUCH_END,()=>{
            this.showInfoTime = egret.getTimer();
            PKUI.getInstance().hideSkillInfo()
        },this)
    }

    private onClick(){
        if(!this.data)
            return;
        if(egret.getTimer() - this.showInfoTime > 100)
            PKC.playerData.useSkill(this.data.sid)
        //{


        //}
        //else
        //{
        //    PKUI.getInstance().showSkillInfo(this.data)
        //}
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
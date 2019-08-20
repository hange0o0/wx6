class PKSkillItem extends game.BaseItem{
    public constructor() {
        super();
        this.skinName = "PKSkillItemSkin";
    }

    private mc: eui.Image;
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
    }

    public setSelect(data){
        this.selectMC.visible = this.data == data;
    }

}
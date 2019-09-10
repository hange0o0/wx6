class SkillChooseItem2 extends game.BaseItem{
    public constructor() {
        super();
        this.skinName = "HPBarSkin";
    }

    private mc: eui.Image;
    private levelText: eui.Label;
    private nameText: eui.Label;



    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this,this.onClick)
        MyTool.addLongTouch(this,this.onInfo,this)
    }

    private onClick(){
        if(this.data > 0)
        {
            SkillChooseUI.getInstance().addChoose(this.data)
        }
        else if(this.data == -1)
        {
            SkillUnlockUI.getInstance().show(-this.data);
        }
    }

    private onInfo(){
        if(this.data > 0)
            SkillInfoUI.getInstance().show(this.data)
    }


    public dataChanged(){
        if(this.data)
        {
            var vo = SkillVO.getObject(this.data)
            this.mc.source = vo.getThumb();
        }
        else
        {

        }
    }

}
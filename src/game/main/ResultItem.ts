class ResultItem extends game.BaseItem{

    private mc: eui.Image;
    private nameText: eui.Label;
    private upMC: eui.Image;
    private newMC: eui.Image;


    public constructor() {
        super();
        this.skinName = "ResultItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        //this.addBtnEvent(this,this.onClick)

    }

    private onClick(){

    }

    public dataChanged():void {
        var skillVO = SkillVO.getObject(this.data.id)
        this.mc.source = skillVO.getThumb()
        this.nameText.text = 'x' + this.data.num;
        this.upMC.visible = this.data.lastLevel && this.data.lastLevel != this.data.currentLevel
        this.newMC.visible = !this.data.lastLevel

    }



}
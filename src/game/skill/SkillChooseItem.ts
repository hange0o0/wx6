class SkillChooseItem extends game.BaseItem{

    private mc: eui.Image;
    private levelText: eui.Label;
    private nameText: eui.Label;


    public constructor() {
        super();
        this.skinName = "SkillChooseItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.touchChildren = false

    }

    public dataChanged():void {

    }
}
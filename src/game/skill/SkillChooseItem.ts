class SkillChooseItem extends game.BaseItem{

    private mc: eui.Image;
    private mc2: eui.Image;
    private levelText: eui.Label;
    private lockGroup: eui.Group;
    private lockText: eui.Label;





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
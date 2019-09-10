class SkillChooseItem1 extends game.BaseItem{

    private mc: eui.Image;



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
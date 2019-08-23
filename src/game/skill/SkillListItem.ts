class SkillListItem extends game.BaseItem{

    private mc: eui.Image;
    private levelText: eui.Label;
    private unlockGroup: eui.Group;






    public constructor() {
        super();
        this.skinName = "SkillListItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.touchChildren = false

    }

    public dataChanged():void {

    }
}
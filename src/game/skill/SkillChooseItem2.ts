class SkillChooseItem2 extends game.BaseItem{
    public constructor() {
        super();
        this.skinName = "HPBarSkin";
    }

    private mc: eui.Image;
    private levelText: eui.Label;


    public childrenCreated() {
        super.childrenCreated();
    }


    public dataChanged(){

    }

}
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
        this.mc.source = ''
        this.nameText.text = ''
        this.upMC.visible
        this.newMC.visible
    }



}
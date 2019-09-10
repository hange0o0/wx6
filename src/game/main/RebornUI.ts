class RebornUI extends game.BaseWindow_wx4{

    private static _instance:RebornUI;
    public static getInstance() {
        if (!this._instance) this._instance = new RebornUI();
        return this._instance;
    }

    private desText: eui.Label;
    private rebornGroup: eui.Group;
    private cdText: eui.Label;



    private shape = new egret.Shape()
    private step = 0;
    private isStoping = false;


    private totalTime = 30*8

    public constructor() {
        super();
        this.skinName = "RebornUISkin";
        this.canBGClose = false
    }

    public childrenCreated() {
        super.childrenCreated();
        this.rebornGroup.addChildAt(this.shape,1);
        this.shape.x = 130
        this.shape.y = 130
    }

    public onShow(){
        this.isStoping = false;
        this.step = this.totalTime - PKC.playerData.rebornDec;
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
    }



    private onE(){
        if(this.step <= 0)
        {
            this.hide();
            PKC.playerData.hp = PKC.playerData.maxHp;
            PKC.playerData.relateItem.renewHp();
            PKC.playerData.wudiStep = 30*5;
            return;
        }
        this.step --;
        this.renew();
    }


    public renew(){
        var cd = Math.ceil(this.step/30);
        this.cdText.text = cd + '';
        MyTool.getSector(128,-90,-this.step/this.totalTime*360,0xFFFFFF,0.3,this.shape)
    }

    public hide(){
        super.hide();
    }
}
class RebornUI extends game.BaseWindow_wx4{

    private static _instance:RebornUI;
    public static getInstance() {
        if (!this._instance) this._instance = new RebornUI();
        return this._instance;
    }

    private desText: eui.Label;
    private cancelBtn: eui.Button;
    private rebornBtn: eui.Button;
    private rebornGroup: eui.Group;
    private cdText: eui.Label;


    private shape = new egret.Shape()
    private step = 0;
    private isStoping = false;

    public constructor() {
        super();
        this.skinName = "RebornUISkin";
        this.canBGClose = false
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.cancelBtn,()=>{
            this.hide();
            ResultUI.getInstance().show();
        })

        this.addBtnEvent(this.rebornBtn,()=>{
            this.isStoping = true;
            ShareTool.openGDTV((type)=>{
                this.hide();
                PKingUI.getInstance().reborn();
                PlayManager.getInstance().sendGameReborn(type)
            },()=>{this.isStoping = false})
        })

        this.rebornGroup.addChildAt(this.shape,1);
        this.shape.x = 130
        this.shape.y = 130
    }

    public onShow(){
        this.isStoping = false;
        this.step = 30*10;
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
    }



    private onE(){
        if(!GameManager_wx4.getInstance().isActive)
            return;
        if(ChangeJumpUI.getInstance().stage)
            return;
        if(this.isStoping)
            return;
        if(this.step <= 0)
        {
            this.hide();
            ResultUI.getInstance().show();
            return;
        }
        this.step --;
        var cd = Math.ceil(this.step/30);
        this.cdText.text = cd + '';
        MyTool.getSector(128,-90,-this.step/300*360,0xFFFFFF,0.3,this.shape)
    }


    public renew(){

    }

    public hide(){
        super.hide();
    }
}
class PlayerUpUI extends game.BaseWindow_wx4 {

    private static _instance: PlayerUpUI;
    public static getInstance(): PlayerUpUI {
        if(!this._instance)
            this._instance = new PlayerUpUI();
        return this._instance;
    }

    private sendBtn: eui.Button;
    private playerItem: PlayerItem;
    private atk1: eui.Label;
    private atk2: eui.Label;
    private hp1: eui.Label;
    private hp2: eui.Label;
    private coinText: eui.Label;




    public cost;
    public constructor() {
        super();
        this.skinName = "PlayerUpUISkin";
        this.canBGClose = false
    }

    public childrenCreated() {
        super.childrenCreated();
        this.setTitle('问题与建议')
        this.addBtnEvent(this.sendBtn,()=>{
            if(!UM_wx4.checkCoin(this.cost))
                return;
            PKManager.getInstance().upPlayerLevel();
        })
    }

    public show(){
        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.COIN_CHANGE,this.renew)
    }

    public renew(){
        this.cost = PKManager.getInstance().getUpCost()
    }

}
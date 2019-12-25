class GunUnlockUI extends game.BaseWindow_wx4{

    private static _instance:GunUnlockUI;
    public static getInstance() {
        if (!this._instance) this._instance = new GunUnlockUI();
        return this._instance;
    }

    private playerItem: PlayerItem;
    private coinText: eui.Label;
    private unlockBtn: eui.Button;
    private videoBtn: eui.Button;




    private atkSpeed = 0;
    private doubleRate = 0;
    private actionStep = 0;
    private cost = 0;

    private id
    public constructor() {
        super();
        this.skinName = "GunUnlockUISkin";

    }

    public childrenCreated() {
        super.childrenCreated();

        var GM = GunManager.getInstance();
        this.addBtnEvent(this.unlockBtn,()=>{
            if(!UM_wx4.checkCoin(this.cost))
                return;
            UM_wx4.addCoin(-this.cost)
            GM.addGun(this.id);
            this.hide();
        })

        this.addBtnEvent(this.videoBtn,()=>{
            ShareTool.openGDTV(()=>{
                GM.addGun(this.id)
                this.hide();
            })
        })

        //this.scroller.viewport = this.list;
        //this.list.itemRenderer = GunListItem
        //this.playerItem.x = 125
        //this.playerItem.y = 125
    }

    public show(id?){
        this.id = id
        super.show()
    }

    public onShow(){
        this.actionStep = 100;
        this.renewChoose();
        this.playerItem.showStandMV()
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
    }

    private onE(){
        //this.gunItem.move2();
        this.actionStep -- ;
        if(this.actionStep <=0)
        {
            this.actionStep = this.atkSpeed
            if(Math.random()<this.doubleRate)
            {
                this.playerItem.showDoubleMV()
            }
            else
            {
                this.playerItem.showAtkMV()
            }
        }
    }


    public renewChoose(){
        var GM = GunManager.getInstance();
        var vo:GunVO = GunVO.getObject(this.id);

        PKC.playerData.gunid = this.id;
        this.playerItem.data = PKC.playerData;
        this.setTitle('解锁【'+vo.name+'】')


        this.atkSpeed = PKTool.getStepByTime(vo.atkspeed)
        this.doubleRate = vo.doublerate/100
        this.actionStep = this.atkSpeed
        this.playerItem.showStandMV()

        this.cost = vo.id*500
        this.coinText.text = this.cost + '';

    }

    public hide(){
        super.hide();
    }
}
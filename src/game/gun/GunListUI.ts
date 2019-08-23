class GunListUI extends game.BaseWindow_wx4{

    private static _instance:GunListUI;
    public static getInstance() {
        if (!this._instance) this._instance = new GunListUI();
        return this._instance;
    }

    private scroller: eui.Scroller;
    private list: eui.List;
    private atkText: eui.Label;
    private nameText: eui.Label;
    private playerItem: PlayerItem;





    private actionStep = 0;
    public get data(){
        return this.list.selectedItem;
    }
    public constructor() {
        super();
        this.skinName = "GunListUISkin";

    }

    public childrenCreated() {
        super.childrenCreated();
        this.setTitle('我的飞刀')
        this.scroller.viewport = this.list;
        this.list.itemRenderer = GunListItem
        this.playerItem.x = 125
        this.playerItem.y = 125
    }

    public show(){
        super.show()
    }

    public onShow(){
        this.actionStep = 100;
        this.renew();
        this.renewChoose();
        this.playerItem.showStandMV()
        this.addPanelOpenEvent(GameEvent.client.GUN_CHANGE,this.renewList)
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
    }

    private onE(){
        //this.gunItem.move2();
        this.actionStep -- ;
        if(this.actionStep <=0)
        {
            this.actionStep = 100 + Math.random()*100
            if(Math.random()<0.8)
            {
                this.playerItem.showAtkMV()
            }
            else
            {
                this.playerItem.showDoubleMV()
            }
        }
    }

    public renewList(){
        MyTool.renewList(this.list);
        this.renewChoose();
    }

    public renew(){
        var list = ObjectUtil_wx4.objToArray(GunVO.data)
        this.list.dataProvider = new eui.ArrayCollection(list)

    }

    private createText(title,des){
        return title + '：' + this.createHtml(des,0xFFFFFF);
    }

    public renewChoose(){
        var GM = GunManager.getInstance();
        var vo:GunVO = GunVO.getObject(GM.gunid);

        PKC.playerData.knife = GM.gunid;
        this.playerItem.data = PKC.playerData;


        this.nameText.text = vo.name;
        var arr = [];
        arr.push(this.createText('攻击传导',vo.atk + '%'))
        arr.push(this.createText('攻击间隔',MyTool.toFixed(vo.atkspeed/100,1) + '秒'))
        arr.push(this.createText('攻击距离',vo.atkdis + ''))
        arr.push(this.createText('打退距离',vo.atkback + ''))
        arr.push(this.createText('暴击率',vo.doublerate + '%'))
        arr.push(this.createText('暴击倍数',MyTool.toFixed(vo.doublevalue/100,1) + '倍'))
        arr.push(this.createText('闪避率',vo.missvalue + '%'))
        this.setHtml(this.atkText,arr.join('\n'));

    }

    public hide(){
        super.hide();
    }
}
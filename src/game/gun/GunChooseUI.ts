class GunChooseUI extends game.BaseWindow_wx4{

    private static _instance:GunChooseUI;
    public static getInstance() {
        if (!this._instance) this._instance = new GunChooseUI();
        return this._instance;
    }

    private scroller: eui.Scroller;
    private list: eui.List;


    public index;
    public dataList;
    public constructor() {
        super();
        this.skinName = "GunChooseUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.scroller.viewport = this.list;
        this.list.itemRenderer = GunChooseItem
    }

    public show(v?){
        this.index = v;
        super.show()
    }

    public onShow(){
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.GUN_CHANGE,this.renewList)
        this.addPanelOpenEvent(GameEvent.client.GUN_UNLOCK,this.renew)
    }

    public renewList(){
        MyTool.renewList(this.list);
    }


    public renew(){
        var GM = GunManager.getInstance();
        this.setTitle('更换'+this.index+'号位武器')
        var arr = GunManager.getInstance().getMyGunList();
        for(var s in arr)
        {
            arr[s] = {
                id:arr[s],
                open:arr[s]>100?100:GunVO.getObject(arr[s]).open,
                lv:GM.getGunLevel(arr[s]),
                using:GM.getPosByGun(arr[s]) || 999,
            }
        }
        ArrayUtil_wx4.sortByField(arr,['using','open','lv'],[0,1,1]);
        for(var s in arr)
        {
            arr[s] = arr[s].id;
        }
        if(GM.getUnlockGun())
            arr.push(0);
        this.dataList = arr;
        this.list.dataProvider = new eui.ArrayCollection(arr)
    }

    public hide(){
        super.hide();
    }
}
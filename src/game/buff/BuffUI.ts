class BuffUI extends game.BaseWindow_wx4 {

    private static _instance: BuffUI;
    public static getInstance(): BuffUI {
        if(!this._instance)
            this._instance = new BuffUI();
        return this._instance;
    }
    private scroller: eui.Scroller;
    private list: eui.List;
    private desText: eui.Label;
    private atkText: eui.Label;
    private workText: eui.Label;
    private inviteBtn: eui.Button;


    private dataProvider:eui.ArrayCollection
    public constructor() {
        super();
        this.skinName = "BuffUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.setTitle('好友助力')


        this.scroller.viewport = this.list;
        this.list.itemRenderer = BuffItem
        var arr = [];
        for(var i=0;i<20;i++)
        {
            arr.push(i)
        }
        this.list.dataProvider = this.dataProvider = new eui.ArrayCollection(arr);

        this.addBtnEvent(this.inviteBtn,this.share)


        MyTool.addLongTouch(this.desText,()=>{
            DebugUI.getInstance().debugTimer = egret.getTimer();
            MyWindow.ShowTips('Tips:要邀请未加入过的好友才有效哦~')
        },this)
    }

    public onClose(){
        this.hide();
    }

    public share(){
        var wx =  window["wx"];
        if(wx)
            wx.aldSendEvent("点击邀请好友")

        ShareTool.share('加入我们，让我们一起割草无双',Config.getShare(0),{type:1,from:UM_wx4.gameid},()=>{
            MyWindow.ShowTips('等待好友加入')
            MyWindow.ShowTips('好友加入后，数据有一定延迟，请耐心等候')
        },true)
    }

    public show(){
        UM_wx4.renewFriendNew(()=>{
            super.show()
        })
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        this.renew();
    }

    public renew(){
        var BM = BuffManager.getInstance();
        var num = BM.getUserNum()
        this.desText.text = '当前邀请好友 '+num +'个：'
        this.dataProvider.refresh();
        this.atkText.text = '生命 +'+BM.getHpAdd()+''
        this.workText.text = '金币 +'+BM.getCoinAdd()+'%'
    }

}
class GunListUI extends game.BaseWindow_wx4{

    private static _instance:GunListUI;
    public static getInstance() {
        if (!this._instance) this._instance = new GunListUI();
        return this._instance;
    }

    private scroller: eui.Scroller;
    private list: eui.List;
    private atkText: eui.Label;
    //private gunItem: GunItem;
    private upGroup: eui.Group;
    private costText: eui.Label;
    private btn: eui.Button;
    private maxMC: eui.Label;
    private levelText: eui.Label;




    private gunid;
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
        this.list.selectedIndex = 0;
        //this.gunItem.scaleX = this.gunItem.scaleY = 1

        this.addBtnEvent(this.btn,()=>{
            var GM = GunManager.getInstance();
            if(!UM_wx4.checkCoin(GM.getGunCost(this.data)))
                return;
            GM.levelUpGun(this.data)
        })

        this.list.addEventListener(egret.Event.CHANGE,this.renewChoose,this)
    }

    public show(id?){
        this.gunid = id;
        super.show()
    }

    public onShow(){
        this.renew();
        this.renewChoose();
        this.addPanelOpenEvent(GameEvent.client.GUN_CHANGE,this.renewList)
        this.addPanelOpenEvent(GameEvent.client.GUN_UNLOCK,this.renewList)
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
        this.addPanelOpenEvent(GameEvent.client.COIN_CHANGE,this.renewChoose)
    }

    private onE(){
        //this.gunItem.move2();
    }

    public renewList(){
        MyTool.renewList(this.list);
        this.renewChoose();
    }

    public renew(){
        var list = GunManager.getInstance().getMakeGuns().concat(GunManager.getInstance().getNormalGuns())


        this.list.dataProvider = new eui.ArrayCollection(list)
        if(this.gunid)
        {
            for(var i=0;i<list.length;i++)
            {
                  if(list[i] == this.gunid)
                  {
                      this.list.selectedIndex = i;
                      break
                  }
            }
        }
    }

    public renewChoose(){
        //var GM = GunManager.getInstance();
        ////var vo:GunVO = this.data;
        //var lv = GM.getGunLevel(this.data);
        //
        //
        //var vos = GM.getVOs(this.data)
        //this.gunItem.data =  this.data;
        //var str = '';
        //var stopUp = !lv || (lv == GM.maxGunLevel && this.data < 100);
        //if(stopUp)
        //    str += this.createHtml('攻击：',0xFFF666) + GM.getGunAtk(this.data) + this.createHtml('\n攻速：',0xFFF666) + GM.getGunSpeed(this.data) + '/秒'
        //else
        //{
        //    str +=  this.createHtml('攻击：',0xFFF666) + GM.getGunAtk(this.data) + this.createHtml('  ('+GM.getGunAtk(this.data,lv+1) + ')',0x00FF00)+
        //        this.createHtml('\n攻速：',0xFFF666)  + GM.getGunSpeed(this.data) + '/秒' ;
        //}
        //
        //str += '\n' + this.createHtml(vos.vo1.getTitle() + '：',0xFFF666) + vos.vo1.getDes(lv || 1,stopUp,this.data > 100)
        //if(vos.vo2)
        //    str += '\n' + this.createHtml(vos.vo2.getTitle() + '：',0xFFF666) + vos.vo2.getDes(lv || 1,stopUp,this.data > 100)
        //this.setHtml(this.atkText, str)
        //
        //var cost = GM.getGunCost(this.data);
        //this.costText.text = NumberUtil_wx4.addNumSeparator(UM_wx4.coin) + ' / ' + NumberUtil_wx4.addNumSeparator(cost)
        //this.costText.textColor = cost>UM_wx4.coin?0xFF0000:0xFFFFFF;
        //
        //var pos = GunManager.getInstance().getPosByGun( this.data)
        //if(pos)
        //    this.levelText.text = pos + ' 号位'
        //else
        //    this.levelText.text = '';
        //
        //if(!lv)
        //{
        //    this.btn.label = '解锁'
        //    this.btn.skinName = 'Btn1Skin'
        //    this.upGroup.visible = true
        //    this.maxMC.text = ''
        //
        //    this.setTitle(GM.getGunName(this.data))
        //}
        //else if(lv == GM.maxGunLevel && this.data < 100)
        //{
        //
        //    this.upGroup.visible = false
        //    this.maxMC.text = '已满级'
        //    this.setTitle(GM.getGunName(this.data) + '  LV.'+lv)
        //}
        //else
        //{
        //    this.btn.label = '升级'
        //    this.btn.skinName = 'Btn2Skin'
        //    this.upGroup.visible = true
        //    this.maxMC.text = ''
        //    this.setTitle(GM.getGunName(this.data) + '  LV.'+lv)
        //}
        //
        //console.log( this.data)
    }

    public hide(){
        super.hide();
    }
}
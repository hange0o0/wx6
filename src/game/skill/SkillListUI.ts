class SkillListUI extends game.BaseWindow_wx4 {

    private static _instance: SkillListUI;
    public static getInstance(): SkillListUI {
        if(!this._instance)
            this._instance = new SkillListUI();
        return this._instance;
    }

    private scroller: eui.Scroller;
    private list: eui.List;
    private atkText: eui.Label;
    private nameText: eui.Label;
    private skillCDText: eui.Label;
    private img: eui.Image;
    private barGroup: eui.Group;
    private barMC: eui.Image;
    private rateText: eui.Label;
    private tab: eui.TabBar;





    public data;
    public constructor() {
        super();
        this.skinName = "SkillListUISkin";
        this.canBGClose = false
    }

    public childrenCreated() {
        super.childrenCreated();
        this.setTitle('图鉴')
        this.scroller.viewport = this.list;
        this.list.itemRenderer = SkillListItem
    }

    public show(){
        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        //this.inputText.text = ''
    }

    public renew(){
        var list = ObjectUtil_wx4.objToArray(GunVO.data)
        this.list.dataProvider = new eui.ArrayCollection(list)
        this.list.selectedIndex = 0;
        this.renewChoose()
    }


    public renewChoose(){
        if(!this.list.selectedItem)
            return;
        if(true)
        {
            this.renewMonsterInfo(this.list.selectedItem)
        }
        else
        {
            this.renewSkillInfo(this.list.selectedItem)
        }
    }

    private renewSkillInfo(svo){
        this.nameText.text = svo.name
        var cd = svo.getCD();
        if(cd)
            this.setHtml(this.rateText,'技能间隔:' + this.createHtml(MyTool.toFixed(cd/1000,1) + '秒',0xFFFF00))
        else
            this.setHtml(this.rateText,this.createHtml('被动技能',0xECAEF9))
        this.setHtml(this.atkText, svo.getDes())
    }

    private renewMonsterInfo(mvo){
        this.nameText.text = mvo.name
        this.atkText.text = mvo.des
        this.rateText.text = ''
    }

}
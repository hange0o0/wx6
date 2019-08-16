class GunInfoUI extends game.BaseWindow_wx4{

    private static _instance:GunInfoUI;
    public static getInstance() {
        if (!this._instance) this._instance = new GunInfoUI();
        return this._instance;
    }

    private leftBtn: eui.Group;
    private cancelBtn: eui.Button;
    private okBtn: eui.Button;
    private rightBtn: eui.Group;
    private atkText: eui.Label;
    private gunItem: GunItem;
    private nameText: eui.Label;
    private levelText: eui.Label;
    private posText: eui.Label;





    public index
    public gunid;
    public constructor() {
        super();
        this.skinName = "GunInfoUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.cancelBtn,()=>{
            GunListUI.getInstance().show(this.gunid)
        })
        this.addBtnEvent(this.okBtn,()=>{
            var pos = GunManager.getInstance().getPosByGun(this.gunid)
            if(pos == GunChooseUI.getInstance().index)
                GunManager.getInstance().removeGun(this.gunid)
            else
                GunManager.getInstance().addGun(this.gunid,GunChooseUI.getInstance().index)
            GunChooseUI.getInstance().hide();
            this.hide();
        })

        this.addBtnEvent(this.leftBtn,()=>{
            this.gunid = GunChooseUI.getInstance().dataList[this.index - 1]
            this.renew();
        })
        this.addBtnEvent(this.rightBtn,()=>{
            this.gunid = GunChooseUI.getInstance().dataList[this.index + 1]
            this.renew();
        })
        this.gunItem.scaleX = this.gunItem.scaleY = 0.9
    }

    public show(gunid?){
        this.gunid = gunid;
        super.show();
    }

    public onShow(){
        this.setTitle('更换'+GunChooseUI.getInstance().index+'号位武器')
        this.renew();
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
        this.addPanelOpenEvent(GameEvent.client.GUN_CHANGE,this.renew)
    }

    private onE(){
        this.gunItem.move2();
    }


    public renew(){

        //this.index = GunChooseUI.getInstance().dataList.indexOf(this.gunid);
        //this.renewBtn()
        //var pos = GunManager.getInstance().getPosByGun(this.gunid)
        //if(pos)
        //    this.posText.text = pos + ' 号位'
        //else
        //    this.posText.text = '';
        //if(pos == GunChooseUI.getInstance().index)
        //{
        //    this.okBtn.label = '卸下'
        //}
        //else if(pos && GunManager.getInstance().getGunByPos(GunChooseUI.getInstance().index))
        //{
        //    this.okBtn.label = '交换'
        //}
        //else
        //{
        //    this.okBtn.label = '装备'
        //}
        //
        //var GM = GunManager.getInstance();
        //
        //var lv = GM.getGunLevel(this.gunid);
        ////var vo:GunVO = GunVO.getObject(this.gunid);
        //this.nameText.text = GM.getGunName(this.gunid);
        //this.gunItem.data = this.gunid;
        //this.levelText.text = 'LV.' + lv;
        //
        //var vos = GM.getVOs(this.gunid)
        //var str = '';
        //str += this.createHtml('攻击：',0xFFF666) + GM.getGunAtk(this.gunid) + this.createHtml('\n攻速：',0xFFF666) + GM.getGunSpeed(this.gunid) + '/秒'
        //str += '\n' + this.createHtml(vos.vo1.getTitle() + '：',0xFFF666) + vos.vo1.getDes(lv || 1)
        //if(vos.vo2)
        //    str += '\n' + this.createHtml(vos.vo2.getTitle() + '：',0xFFF666) + vos.vo2.getDes(lv || 1)
        //this.setHtml(this.atkText, str)
    }

    private renewBtn(){
        this.rightBtn.visible = GunChooseUI.getInstance().dataList[this.index + 1]
        this.leftBtn.visible = this.index>0
    }

    public hide(){
        super.hide();
    }
}
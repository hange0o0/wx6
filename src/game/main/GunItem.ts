class GunItem extends game.BaseItem{
    private static pool = [];
    public static createItem():GunItem{
        var item:GunItem = this.pool.pop();
        if(!item)
        {
            item = new GunItem();
        }
        return item;
    }
    public static freeItem(item){
        if(!item)
            return;
        item.remove();
        if(this.pool.indexOf(item) == -1)
            this.pool.push(item);
    }

    //private roleBG: eui.Image;
    private role2: eui.Image;
    private role: eui.Image;
    private shootMC: eui.Image;
    private mcGroup: eui.Group;
    private roundMC: eui.Image;
    private roundMC2: eui.Image;










    public baseY = 0//初始位置
    public step = 0;
    //public tw;
    public timer;
    public maxStep;
    public state = {}//(skillid:step)

    public constructor() {
        super();
        this.skinName = "GunItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.touchChildren = this.touchEnabled = false;
        this.anchorOffsetX = 50
        this.anchorOffsetY = 50
        this.scaleX = this.scaleY = 0.7

        this.shootMC.scaleX = -1
        this.shootMC.rotation = 90

        this.roundMC.scaleX = -1
        this.roundMC.horizontalCenter = 50

        this.roundMC2.scaleX = -1
        this.roundMC2.horizontalCenter = -50

        //this.roleBG.scaleX = this.roleBG.scaleY = 0.8
        //this.tw = egret.Tween.get(this.roleBG,{loop:true}).to({alpha:0.2},1000).to({alpha:1},1000)
        //this.tw.setPaused(true)


    }

    public dataChanged():void {
        //clearTimeout(this.timer)
        //var lv = GunManager.getInstance().getGunLevel(this.data) || 1
        ////this.roleBG.source = 'role_bg_'+(lv%8 || 8)+'_png'
        //this.role.source = 'role_'+(lv%8 || 8)+'_png'
        //this.role2.visible = lv > 8
        //if(this.role2.visible)
        //    this.role2.source = 'role_'+Math.floor(lv/8)+'_png'
        //
        ////this.timer = setTimeout(()=>{this.tw && this.tw.setPaused(false)},1000*Math.random())
        //this.step = 0;
        //
        //if(this.data >100)
        //{
        //     var gun1 = Math.floor(this.data/100)
        //     var gun2 = this.data%100;
        //
        //    this.roundMC.source = 'knife_'+gun1+'_png'
        //    this.roundMC2.source = 'knife_'+gun2+'_png'
        //    this.shootMC.source = 'knife_'+gun2+'_png'
        //    this.roundMC2.visible = true
        //
        //}
        //else
        //{
        //    this.roundMC.source = 'knife_'+this.data+'_png'
        //    this.shootMC.source = 'knife_'+this.data+'_png'
        //    this.roundMC2.visible = false
        //}
        //
        //this.maxStep = Math.floor(GunManager.getInstance().getGunSpeed(this.data)*30) - 5;
    }

    public move(){
        this.step ++;
        var maxStep = this.maxStep;
        var speedAdd = 0
        var PC = PKCode_wx4.getInstance()
        if(PC.isInBuff(103))
            speedAdd += 0.2
        if(PC.isInBuff(1104))
            speedAdd -= 0.8

        maxStep = Math.floor(maxStep*(1+speedAdd))
        this.mcGroup.rotation += 60 - maxStep/5
        if(this.step >= maxStep)
        {
            this.step = -5;  //-10
            this.shootMC.visible = false
            PKingUI.getInstance().shoot(this);
        }
        if(this.step >=0 )
        {
            this.shootMC.visible = true
            this.shootMC.horizontalCenter = -80*(this.step)/maxStep + 20
        }
    }

    public move2(){
        this.mcGroup.rotation += 16
        this.shootMC.visible = false;
    }

    public remove():void {
        MyTool.removeMC(this);
        egret.Tween.removeTweens(this);
        //this.tw.setPaused(true)
        clearTimeout(this.timer)
    }


}
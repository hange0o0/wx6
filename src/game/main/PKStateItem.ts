class PKStateItem extends game.BaseItem{
    private static pool = [];
    public static createItem():PKStateItem{
        var item:PKStateItem = this.pool.pop();
        if(!item)
        {
            item = new PKStateItem();
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

    public static leftBuff = [101,102,103,108,109,1104,1105,1106,1107,1110]
    public static buffcd = {
        1111:5*30,
        1102:20*30,
        1103:20*30,
        1104:5*30,
        1105:20*30,
        1106:20*30,
        1107:20*30,
        1108:20*30,
        1109:20*30,
        1110:10*30,
    }

    public static isBuffLeft(id){
         return this.leftBuff.indexOf(id) != -1
    }

    private cdGroup: eui.Group;
    private cdMC: eui.Image;
    private mc: eui.Image;
    private txt: eui.Label;

    private shape = new egret.Shape()
    private lastDrawTime = 0
    public constructor() {
        super();
        this.skinName = "PKStateItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.cdGroup.addChild(this.shape);
        this.cdMC.mask = this.shape
        this.shape.x = 20
        this.shape.y = 20

    }

    public dataChanged():void {
        this.mc.source = 'buff_'+(this.data%1000)+'_png'
        var str = ''
        switch(this.data)
        {
            case 101:
                str = '封印所有飞刀的技能';
                break
            case 102:
                str = '降低城墙20%的防御力';
                break
            case 103:
                str = '降低飞刀20%的攻击速度';
                break
            case 104:
                str = '增加怪物20%的速度';
                break
            case 105:
                str = '增加怪物20%的攻击力';
                break
            case 106:
                str = '增加怪物20%的防御力';
                break
            case 107:
                str = '每秒回复怪物5%的生命';
                break
            case 108:
                str = '每秒扣除城墙3%的生命';
                break
            case 109:
                str = '降低飞刀20%攻击力';
                break
            case 110:
                str = '怪物可免疫前3次伤害';
                break


            case 1111:
                str = '晕眩地图上所有怪物';
                break
            case 1102:
                str = '降低怪物20%的防御力';
                break
            case 1103:
                str = '降低怪物20%的速度';
                break
            case 1104:
                str = '增加飞刀100%的攻击速度';
                break
            case 1105:
                str = '增加飞刀20%的攻击力';
                break
            case 1106:
                str = '增加城墙20%的防御力';
                break
            case 1107:
                str = '每秒回复城墙3%的生命';
                break
            case 1108:
                str = '每秒扣除怪物5%的生命';
                break
            case 1109:
                str = '降低怪物20%攻击力';
                break
            case 1110:
                str = '获得10秒无敌时间';
                break
        }

        this.txt.text = str;
        this.cdMC.visible = this.data > 1000

        if(PKStateItem.isBuffLeft(this.data))
            this.currentState = 's1'
        else
            this.currentState = 's2'
    }

    public onE(){
        if(this.data > 1000 && egret.getTimer() - this.lastDrawTime > 100)
        {
            var buffVO = PKCode_wx4.getInstance().isInBuff(this.data);
            if(!buffVO)
                return;
            this.lastDrawTime = egret.getTimer();
            var v = buffVO.step
            var maxStep = PKStateItem.buffcd[this.data];
            MyTool.getSector(30,-90,-v/maxStep*360,0xFFFFFF,1,this.shape)
        }
    }

    public remove(){
        MyTool.removeMC(this);
    }

    public showMV(){
        this.scaleY = 0;
        egret.Tween.get(this).to({scaleY:1.1},300).to({scaleY:1},300)
    }

    public hideMV(){
        egret.Tween.get(this).to({scaleY:1.1},300).to({scaleY:0},300).call(()=>{
            PKStateItem.freeItem(this);
        })
    }
}
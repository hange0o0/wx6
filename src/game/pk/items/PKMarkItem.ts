class PKMarkItem extends game.BaseItem{

    private static pool = [];
    public static createItem():PKMarkItem {
        var item:PKMarkItem = this.pool.pop();
        if (!item) {
            item = new PKMarkItem();
        }
        return item;
    }

    public static freeItem(item:PKMarkItem) {
        if (!item)
            return;
        item.remove();
        if (this.pool.indexOf(item) == -1)
            this.pool.push(item);
    }



    public constructor() {
        super();
    }

    public mc = new eui.Image('warn_png');
    public mv = new MovieSimpleSpirMC();

    public waitCD;
    public isDie;
    public r = 50;
    public hurt = 50;
    public owner;

    public childrenCreated() {
        super.childrenCreated();

        this.mv.addEventListener('complete',this.onMVComplete,this)
        //this.addChild(this.mc)
        //this.addChild(this.mv)
    }

    private onMVComplete(){
        this.isDie = 2
    }

    public dataChanged(){
        MyTool.removeMC(this.mv);

        this.mv.setData(PKTool.getMVList(this.data.mv.url,this.data.mv.num),84)
        this.mv.anchorOffsetX = this.data.mv.anX;
        this.mv.anchorOffsetY = this.data.mv.anY;
        this.mv.stop();

        this.addChild(this.mc)
        this.onE();

        this.waitCD = 30;
        this.isDie = 0

        this.owner = this.data.owner;
        this.hurt = this.data.hurt;
    }

    public onE(){
        if(this.isDie)
            return;

        var playerData = PKC.playerData;
        var isHit = MyTool.getDis(playerData,this)
        this.scaleX = this.scaleY = isHit?1.5:1;

        this.waitCD --;
        if(this.waitCD <= 0)
        {
            this.isDie = 1
            MyTool.removeMC(this.mc);
            this.addChild(this.mv);
            this.mv.gotoAndPay(0,1)
            PKCodeUI.getInstance().roleCon.addChild(this);

            //hittest
            if(isHit)
            {
                playerData.addHp(-this.hurt,this.owner)
            }

        }

    }

    public remove(){
       MyTool.removeMC(this)
    }

}
class BombItem extends game.BaseItem{
    private static pool = [];

    public static createItem():BombItem {
        var item:BombItem = this.pool.pop();
        if (!item) {
            item = new BombItem();
        }
        return item;
    }

    public static freeItem(item:BombItem) {
        if (!item)
            return;
        item.remove();
        if (this.pool.indexOf(item) == -1)
            this.pool.push(item);
    }


    public isDie = 0
    public decHp = 100;

    private mv:MovieSimpleSpirMC;
    public constructor() {
        super();
    }

    public childrenCreated() {
        super.childrenCreated();
        this.mv = new MovieSimpleSpirMC();
        this.mv.addEventListener('complete',()=>{
             this.isDie = 2;
        },this)
        this.addChild(this.mv);
    }


    public dataChanged(){
        this.isDie = 0;
        this.mv.setData(['mine_png'])
        this.mv.gotoAndStop(0)
        this.mv.anchorOffsetX = 44/2
        this.mv.anchorOffsetY = 50/2
    }

    public remove(){
        this.mv && this.mv.stop();
        MyTool.removeMC(this);
    }

    public testHit(){
        if(this.isDie)
            return;
        var arr = PKC.monsterList;
        var len = arr.length;
        for(var i=0;i<len;i++)
        {
            var mData =  arr[i];
            if(mData.isDie)
                continue;
            if(Math.abs(this.x - mData.x) < 50 && Math.abs(this.y - mData.y) < 50)
            {
                this.playBoom();
                break;
            }
        }
    }

    public playBoom(){
        this.isDie = 1;
        this.mv.setData(PKTool.getMVList('ani25',5),84)
        this.mv.anchorOffsetX = 136/2
        this.mv.anchorOffsetY = 136/2
        this.mv.gotoAndPay(0,1)


        var arr = PKC.monsterList;
        var len = arr.length;
        for(var i=0;i<len;i++)
        {
            var mData =  arr[i];
            if(mData.isDie)
                continue;
            if(Math.abs(this.x - mData.x) < 100 && Math.abs(this.y - mData.y) < 100)
            {
                mData.addHp(-this.decHp);
            }
        }

    }
}
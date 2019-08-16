class BallMC extends game.BaseItem{
    private static pool = [];
    public static createItem():BallMC{
        var item:BallMC = this.pool.pop();
        if(!item)
        {
            item = new BallMC();
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

    public constructor() {
        super();
        this.skinName = "BallMCSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.anchorOffsetX = 74/2
        this.anchorOffsetY = 152

        this.touchChildren = this.touchEnabled = false;
    }

    private mc: eui.Image;
    private barGroup: eui.Group;
    private bar: eui.Rect;

    public hp = 0
    public maxHp = 0
    //public buffID = 0


    public dataChanged():void {
        this.barGroup.visible = false;
        this.maxHp = this.hp = Math.min(50,5 + Math.floor(UM_wx4.level/5));
        this.mc.source = 'buff_'+(this.data%1000)+'_png'
    }

    public move(){
        if(this.x < 395)
            var x = Math.random()*100 + 640-100;
        else
            var x = 150+Math.random()*100;

        var y = Math.random()*GameManager_wx4.uiHeight*0.25 + 160
        egret.Tween.get(this).to({x:x,y:y},MyTool.getDistance(x,y,this.x,this.y)*12).call(()=>{
            this.move()
        })
    }

    public addHp(){
        this.hp -= 1;
        if(this.hp < this.maxHp)
        {
            this.barGroup.visible = true;
        }
        this.bar.width = 40 * this.hp/this.maxHp
        if(this.hp<=0)
        {
            AniManager_wx3.getInstance().playOnItem(112,this);
            PKingUI.getInstance().removeBall(this);
            PKCode_wx4.getInstance().addBuff(this.data)
        }
    }

    public remove(){
         MyTool.removeMC(this);
        egret.Tween.removeTweens(this);
    }


}
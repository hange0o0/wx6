class PKMonsterItem_wx3 extends game.BaseItem {
    private static pool = [];
    private static index = 1
     public static createItem():PKMonsterItem_wx3{
         var item:PKMonsterItem_wx3 = this.pool.pop();
         if(!item)
         {
             item = new PKMonsterItem_wx3();
         }
         item.id = this.index;
         this.index++
         return item;
     }
     public static freeItem(item){
         if(!item)
             return;
         item.remove();
         if(this.pool.indexOf(item) == -1)
            this.pool.push(item);
     }

    private hpBar: HPBar;



    public id = 0;

    public stateMV =  new MovieSimpleSpirMC2();
    public iceMC:eui.Image
    public monsterMV:PKMonsterMV_wx3 = new PKMonsterMV_wx3();

    public constructor() {
        super();
        this.skinName = "PKMonsterItemSkin";
        this.monsterMV.addEventListener('mv_die',this.onDieFinish,this)
    }

    public childrenCreated() {
        super.childrenCreated();

        this.touchChildren = this.touchEnabled = false;
        this.hpBar.currentState = 's2';

        this.addChildAt(this.monsterMV,0)
        this.monsterMV.x = 50;
        this.monsterMV.y = 300;
        this.anchorOffsetX = 50;
        this.anchorOffsetY = 300;

        this.iceMC =  new eui.Image('effect_ice_png');
        this.iceMC.anchorOffsetX = 102
        this.iceMC.anchorOffsetY = 161
        this.iceMC.x = 50;
        this.iceMC.y = 300;


        this.stateMV.x =  50 -  154/4

        this.stateMV.setData('effect2_png',154,39,2)
        this.stateMV.stop()
    }

    public resetXY(x,y){

        var r = 40;
        if(x < r)
            x = r;
        else if(x > PKC.mapW - r)
            x = PKC.mapW - r;

        if(y < r)
            y = r
        else if(y > PKC.mapH - r)
            y = PKC.mapH - r


        this.x = this.data.x = x;
        this.y = this.data.y = y;
    }

    private onDieFinish(){
        this.data.isDie = 2;
    }

    //public setSlow(speedDec,cd){
    //    var step = Math.ceil(cd*1000*(30/1000))
    //    this.slowStep = Math.max(this.slowStep,step)
    //    this.speedDec = Math.max(this.speedDec,speedDec)
    //    this.onSpeedChange();
    //    this.addChild(this.iceMC);
    //    this.iceMC.scaleX = this.iceMC.scaleY = this.vo.height/140
    //}
    //
    //public onSpeedChange(){
    //    var speed = -this.speedDec + this.speedDec2;
    //    this.monsterMV.speed = speed
    //
    //    var speedAdd = (this.speed/20)/this.getSpeedRate();
    //    if(!speedAdd || speedAdd < 0) //防止一动不动
    //        speedAdd = 1;
    //    this.moveSpeed = speedAdd;
    //}
    //
    //
    //public setYun(cd){
    //    var step = Math.ceil(cd*1000*(30/1000))
    //    if(!this.yunStep)//表现晕
    //    {
    //        this.addChild(this.stateMV)
    //        this.stateMV.y = 300 - this.vo.height - 35;
    //        this.stateMV.play()
    //    }
    //    this.yunStep = Math.max(step,this.yunStep);
    //}

    public onE(){
        var myData = this.data;
        if(myData.isDie)
            return;
        var playerData = PKC.playerData;
        this.runBuff();

        if(PKC.actionStep < myData.stopEnd)
            return;
        if(PKC.actionStep < myData.atkEnd)
            return;
        if(playerData.isHide)
            return;

        this.monsterMV.scaleX = myData.x > playerData.x ?1:-1
        var dis = MyTool.getDis(playerData,this);
        //move
        if(dis > myData.atkDis){
            var speed = this.data.speed;
            var angle = Math.atan2(playerData.y-myData.y,playerData.x-myData.x)
            var x = Math.cos(angle)*speed
            var y = Math.sin(angle)*speed

            var targetX = this.x + x
            var targetY = this.y+y

            this.resetXY(targetX,targetY)
            this.run();
            return;
        }

        //atk
        if(dis <= myData.atkDis){
            this.atk()
            this.data.atkFun();

            myData.atkEnd = PKC.actionStep + myData.atkSpeed
            return
        }

    }

    private runBuff(){
        //if(this.yunStep)
        //{
        //    this.yunStep --;
        //    if(this.yunStep <= 0)
        //    {
        //        this.yunStep = 0;
        //        this.stateMV.stop()
        //        MyTool.removeMC(this.stateMV)
        //    }
        //}
        //
        //if(this.slowStep)
        //{
        //    this.slowStep --;
        //    if(this.slowStep <= 0)
        //    {
        //        this.speedDec = 0;
        //        this.monsterMV.speed = 0;
        //        //this.monsterMV.alpha = 1;
        //        MyTool.removeMC(this.iceMC)
        //        this.onSpeedChange();
        //    }
        //}
    }



    public dataChanged(){
        this.data.relateItem = this;
        this.monsterMV.load(this.data.mid)
        this.monsterMV.stand();
        this.monsterMV.alpha = 1;
        this.hpBar.y = 300 - this.data.getVO().height - 20

        MyTool.removeMC(this.iceMC)
        this.renewHp();
        this.stateMV.stop()
        MyTool.removeMC(this.stateMV)

    }



    public run(){
        if(this.monsterMV.state != MonsterMV.STAT_RUN )
            this.monsterMV.run();
    }

    public stand(){
        if(this.monsterMV.state != MonsterMV.STAT_STAND)
            this.monsterMV.stand();
    }

    public die(){
        this.monsterMV.die();
        //this.bar.width = 0;
        //this.barGroup.visible = false;
        //this.vo.playDieSound();
        //if(this.data.mid != 99)
        //    PlayManager.getInstance().showDropCoin(this)
    }

    public atk(){
        this.monsterMV.atk();
    }

    public renewHp(){
        this.hpBar.data = this.data;
        //this.hpBar.visible = this.data.hp < this.data.maxHp;
    }


    public remove(){
        egret.Tween.removeTweens(this);
        MyTool.removeMC(this);
        this.monsterMV.stop();
    }
}
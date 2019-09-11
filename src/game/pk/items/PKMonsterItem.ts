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
    public yunStep = 0;
    public iceStep = 0;
    public fireStep = 0;
    public poisonStep = 0;
    public fireHurt = 0;
    public poisonHurt = 0;
    public lastHurtTime = 0;

    public stateYunMV
    public stateFireMV
    public statePoisonMV
    public iceMC:eui.Image
    public monsterMV:PKMonsterMV_wx3 = new PKMonsterMV_wx3();

    public randomWalkRota = 0;
    public randomWalkTime = 0;
    public randomWalk = false;

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





    }
    public resetHpBarY(){
        this.hpBar.y = 300 - this.data.getVO().height*this.data.scale - 20
        this.monsterMV.scaleX = this.monsterMV.scaleY = this.data.scale

    }

    public dataChanged(){
        this.data.relateItem = this;
        this.monsterMV.load(this.data.mid)
        this.monsterMV.stand();
        this.monsterMV.alpha = 1;
        this.resetHpBarY();

        this.iceStep = 0;
        this.yunStep = 0;
        this.fireStep = 0;
        this.poisonStep = 0;
        this.fireHurt = 0;
        this.poisonHurt = 0;
        this.lastHurtTime = 0;

        MyTool.removeMC(this.iceMC)
        this.renewHp();

        if(this.stateYunMV) {
            this.stateYunMV.stop()
            MyTool.removeMC(this.stateYunMV)
        }
        if(this.stateFireMV) {
            this.stateFireMV.stop()
            MyTool.removeMC(this.stateFireMV)
        }
        if(this.statePoisonMV) {
            this.statePoisonMV.stop()
            MyTool.removeMC(this.statePoisonMV)
        }
    }

    public resetXY(x,y){

        //var r = 40;
        //if(x < r)
        //    x = r;
        //else if(x > PKC.mapW - r)
        //    x = PKC.mapW - r;
        //
        //if(y < r)
        //    y = r
        //else if(y > PKC.mapH - r)
        //    y = PKC.mapH - r


        this.x = this.data.x = x;
        this.y = this.data.y = y;
    }

    private onDieFinish(){
        this.data.onDie();
        if(this.data.isDie)
            this.data.isDie = 2;
    }

    public setIce(step){
        if(!step)
            return;
        if(!this.iceMC)
        {
            this.iceMC =  new eui.Image('effect_ice_png');
            this.iceMC.anchorOffsetX = 102
            this.iceMC.anchorOffsetY = 161
            this.iceMC.x = 50;
            this.iceMC.y = 300;
        }

        this.iceStep = Math.max(step,this.iceStep);
        this.addChild(this.iceMC);
        this.iceMC.scaleX = this.iceMC.scaleY = this.data.getVO().height/140*this.data.scale
    }

    public setYun(step){
        if(!step)
            return;
        if(!this.yunStep)//表现晕
        {
            if(!this.stateYunMV)
            {
                this.stateYunMV = new MovieSimpleSpirMC2()
                this.stateYunMV.x =  50 -  154/4
                this.stateYunMV.setData('effect2_png',154/2,39,2,1000/6)
                this.stateYunMV.stop()
            }
            this.addChild(this.stateYunMV)
            this.stateYunMV.y = 300 - this.data.getVO().height - 35;
            this.stateYunMV.play()
        }
        this.yunStep = Math.max(step,this.yunStep);
    }

    public setFire(step,hurt){
        if(!step)
            return;
        if(!this.fireStep)//表现晕
        {
            if(!this.stateFireMV)
            {
                this.stateFireMV = new MovieSimpleSpirMC2()
                this.stateFireMV.anchorOffsetX = 531/3/2
                this.stateFireMV.anchorOffsetY = 532/2*0.8
                this.stateFireMV.x = 50
                this.stateFireMV.y = 300
                this.stateFireMV.setData('effect18_png',531/3,532/2,5,84)
                this.stateFireMV.widthNum = 3
                this.stateFireMV.stop()
            }
            this.addChild(this.stateFireMV)
            this.stateFireMV.play()
        }
        this.fireStep = Math.max(step,this.fireStep);
        this.fireHurt = Math.max(hurt,this.fireHurt);
    }


    public setPoison(step,hurt){
        if(!step)
            return;
        if(!this.poisonStep)//表现晕
        {
            if(!this.statePoisonMV)
            {
                this.statePoisonMV = new MovieSimpleSpirMC2()
                this.statePoisonMV.anchorOffsetX = 560/4/2
                this.statePoisonMV.anchorOffsetY = 412/2*0.8
                this.statePoisonMV.x = 50
                this.statePoisonMV.y = 300
                this.statePoisonMV.setData('effect17_png',560/4,412/2,7,84)
                this.statePoisonMV.widthNum = 4
                this.statePoisonMV.stop()
            }
            this.addChild(this.statePoisonMV)
            this.statePoisonMV.play()
        }
        this.poisonStep = Math.max(step,this.poisonStep);
        this.poisonHurt = Math.max(hurt,this.poisonHurt);
    }

    public onE(){
        var myData = this.data;
        if(myData.isDie)
            return;
        var playerData = PKC.playerData;
        this.runBuff();
        if(myData.isDie)//buff会至死
            return;
        myData.onStep();
        myData.onDelay();
        var t = PKC.actionStep

        if(t  < myData.stopEnd)
            return;
        if(t  < myData.atkEnd)
            return;
        if(t  < myData.skillEnd)
            return;
        if(t  < myData.beAtkStop)
            return;

        if(this.yunStep)
            return;

        this.monsterMV.scaleX = (myData.x > playerData.x ?1:-1)*myData.scale

        //踩陷阱
        if(myData.mid == 8 && myData.targetTrap && !myData.targetTrap.isDie)
        {
            this.monsterMV.scaleX = (myData.x > myData.targetTrap.x ?1:-1)*myData.scale
            var dis = MyTool.getDis(myData.targetTrap,this);
            if(dis < 50)
            {
                this.atkMV()
                myData.atkEnd = t + myData.atkSpeed
                myData.targetTrap.isDie = 2
                myData.targetTrap = null;
                return;
            }


            var speed = this.data.speed;
            var angle = Math.atan2(myData.targetTrap.y-myData.y,myData.targetTrap.x-myData.x)
            var x = Math.cos(angle)*speed
            var y = Math.sin(angle)*speed

            var targetX = this.x + x
            var targetY = this.y+y

            this.resetXY(targetX,targetY)
            this.runMV();
            return;
        }


        this.monsterMV.scaleX = (myData.x > playerData.x ?1:-1)*myData.scale

        var dis = MyTool.getDis(playerData,this);
        if(dis < myData.skillDis && myData.canSkill())
        {
            myData.moveStartTime = 0;
            myData.skillFun();
            myData.lastSkillTime = t;
            this.randomWalkTime = 0;
            return;
        }

        var canAtkPlayer = !playerData.isHide && playerData.wudiStep <= 0 && playerData.hp > 0
        var canAtkDis = dis <= myData.atkDis
        var canAtkTime = myData.lastAtkTime + myData.atkSpeed < t

        //atk
        if(canAtkDis && canAtkTime && canAtkPlayer){
            this.atkMV()
            myData.atkFun();
            myData.atkEnd = t + myData.atkStop
            myData.lastAtkTime = t
            this.randomWalkTime = 0
            return
        }

        //move
        if(!this.iceStep && dis > myData.atkDis && canAtkTime && canAtkPlayer){
            var speed = this.data.speed;
            var atkPos = playerData
            var angle = Math.atan2(atkPos.y-myData.y,atkPos.x-myData.x)

            if(!myData.moveStartTime)
                myData.moveStartTime = t
            var noAtkTime = 10*30
            if(myData.isFarAtk)
                noAtkTime *= 1.5
            if(myData.moveStartTime && t - myData.moveStartTime > noAtkTime)//长时间移动
            {
                myData.changeRandomPos(dis,angle);
                return;
            }


            var x = Math.cos(angle)*speed
            var y = Math.sin(angle)*speed

            if(this.data.isFarAtk && dis < myData.atkDis/2)//远程离太近，要远离
            {
                x *= -1
                y *= -1
            }
            var targetX = this.x + x
            var targetY = this.y + y

            this.resetXY(targetX,targetY)
            this.runMV();

            return;
        }

        //随机走走
        if(t - this.randomWalkTime > 100)
        {
            this.randomWalk = Math.random() < 0.8
            this.randomWalkRota = Math.random()*Math.PI*2
            this.randomWalkTime = t
        }

        if(!this.iceStep && this.randomWalk)
        {
            var speed = this.data.speed;
            var x = Math.cos(this.randomWalkRota)*speed
            var y = Math.sin(this.randomWalkRota)*speed
            var targetX = this.x + x
            var targetY = this.y + y
            this.resetXY(targetX,targetY)
            this.runMV();
        }
        else
        {
            this.standMV()
        }
    }

    ////在可以攻击的位置
    //private canAttackPos(playerData){
    //    return true;
    //}
    //
    ////获得可以攻击的位置
    //private getAttackPos(playerData){
    //    return playerData;
    //}

    private runBuff(){
        if(this.yunStep)
        {
            this.yunStep --;
            if(this.yunStep <= 0)
            {
                this.yunStep = 0;
                this.stateYunMV.stop()
                MyTool.removeMC(this.stateYunMV)
            }
        }

        if(this.iceStep)
        {
            this.iceStep --;
            if(this.iceStep <= 0)
            {
                this.iceStep = 0;
                MyTool.removeMC(this.iceMC)
            }
        }

        if(this.fireStep)
        {
            this.fireStep --;
            if(this.fireStep <= 0)
            {
                this.fireStep = 0;
                this.stateFireMV.stop()
                MyTool.removeMC(this.stateFireMV)
            }
        }

        if(this.poisonStep)
        {
            this.poisonStep --;
            if(this.poisonStep <= 0)
            {
                this.poisonStep = 0;
                this.statePoisonMV.stop()
                MyTool.removeMC(this.statePoisonMV)
            }
        }

        if(!this.data.isDie && PKC.actionStep - this.lastHurtTime >= PKC.frameRate)
        {
            this.lastHurtTime = PKC.actionStep;
            var hurt = this.fireHurt + this.poisonHurt;
            if(hurt)
                this.data.addHp(-hurt)
        }
    }


    public runMV(){
        if(this.monsterMV.state != MonsterMV.STAT_RUN )
            this.monsterMV.run();
    }

    public standMV(){
        if(this.monsterMV.state != MonsterMV.STAT_STAND)
            this.monsterMV.stand();
    }

    public dieMV(){
        this.monsterMV.die();
        this.data.getVO().playDieSound()
        //this.bar.width = 0;
        //this.barGroup.visible = false;
        //this.vo.playDieSound();
        //if(this.data.mid != 99)
        //    PlayManager.getInstance().showDropCoin(this)
    }

    public atkMV(){
        this.monsterMV.atk();
    }

    public renewHp(){
        this.hpBar.data = this.data;
        this.hpBar.visible = this.data.hp > 0
        //this.hpBar.visible = this.data.hp < this.data.maxHp;
    }

    public stopMV(){
        this.monsterMV.stop();
    }

    public playMV(){
        this.monsterMV.play();
    }


    public remove(){
        egret.Tween.removeTweens(this);
        MyTool.removeMC(this);
        this.monsterMV.stop();

        if(this.statePoisonMV)
            this.statePoisonMV.stop()
        if(this.stateFireMV)
            this.stateFireMV.stop()
        if(this.stateYunMV)
            this.stateYunMV.stop()
    }
}
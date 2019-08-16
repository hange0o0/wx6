class PKingUI extends game.BaseUI_wx4 {

    private static _instance: PKingUI;
    public static getInstance(): PKingUI {
        if(!this._instance)
            this._instance = new PKingUI();
        return this._instance;
    }

    private bg1: eui.Image;
    private bg2: eui.Image;
    private con: eui.Group;
    private monsterGroup: eui.Group;
    private gunGroup: eui.Group;
    private barGroup: eui.Group;
    private bar: eui.Image;
    private hpText: eui.Label;
    private rateCon: eui.Group;
    private rateBar: eui.Rect;
    private rateMC: eui.Group;
    private rateText: eui.Label;
    private bossGroup: eui.Group;
    private buffGroup1: eui.Group;
    private buffGroup2: eui.Group;
    private guideMC: eui.Image;
    private blackBG: eui.Image;
    //private tipsGroup: eui.Group;
    //private tipsText: eui.Label;








    public ww = 630

    public bulletArr = [];
    public stateArr = [];
    public gunArr = [];
    public ballArr = [];
    public speed = 5
    public txtPool = []

    //private touchID = {}

    private touchID1:any = null
    private touchID2:any = null

    private stoping = true
    private begining = true
    private isFinish = true
    private isDie = false
    //private showWudi = false
    private isReborn = false

    public lastBallStep = 0
    //private lastNoMoveTime = 0;//进入怪攻击判断，保持
    public constructor() {
        super();
        this.skinName = "PKingUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.con.touchChildren = this.con.touchEnabled = false;

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin,this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove,this);
        this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchEnd,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd,this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd,this);
    }

    public getCon(){
        return this.con;
    }

    private onTouchBegin(e:egret.TouchEvent){
        if(!this.touchID1)
        {
            this.touchID1 = {
                id:e.touchPointID,
                touchY:e.stageY,
                gunY:this.gunGroup.y
            }
            return
        }
        if(!this.touchID2)
        {
            var gunItem;
            for(var i=0;i<this.gunArr.length;i++)
            {
                if(this.gunArr[i].role.hitTestPoint(e.stageX,e.stageY))
                {
                    gunItem = this.gunArr[i];
                    break;
                }
            }
            if(gunItem)
            {
                this.touchID2 = {
                    id:e.touchPointID,
                    touchY:e.stageY,
                    gunItemY:gunItem.y,
                    gunItem:gunItem,
                }
            }
        }
    }

    private onTouchMove(e){
        if(this.isDie)
            return
        if(this.touchID1 && e.touchPointID == this.touchID1.id)
        {
            var yy = this.touchID1.gunY - this.touchID1.touchY + e.stageY;
            var moveDis = this.gunGroup.y - yy
            this.gunGroup.y = yy
            if(this.guideMC.visible && this.guideMC.source == 'guide_png')
                this.guideMC.source = 'guide2_png'
            if(this.touchID2) //同时按下了2，2的位置保持不变
            {
                this.touchID2.gunItem.y += moveDis
                this.touchID2.gunItemY += moveDis
            }
            return;
        }
        if(this.touchID2 && e.touchPointID == this.touchID2.id)
        {
            this.touchID2.gunItem.y = this.touchID2.gunItemY - this.touchID2.touchY + e.stageY
            if(this.guideMC.visible && this.guideMC.source == 'guide2_png')
                this.guideMC.visible = false
        }
    }

    private onTouchEnd(e){
        if(this.touchID2 && e.touchPointID == this.touchID2.id)
        {
            this.touchID2 = null;
             return;
        }
        //其它手指，统一回弹
        if(this.touchID1 && e.touchPointID == this.touchID1.id)
        {
            this.touchID1 = null
            this.touchID2 = null
            for(var i=0;i<this.gunArr.length;i++)
            {
                this.moveGunBack(this.gunArr[i])
            }
        }
    }

    private moveGunBack(item){
        egret.Tween.removeTweens(item)
        egret.Tween.get(item).to({y:item.baseY},200);
    }



    public shoot(item:GunItem){
        if(this.isDie)
            return
        //SoundManager.getInstance().playEffect('shoot')
        //var vo = GunVO.getObject(item.data)
        var PC = PKCode_wx4.getInstance()
        var num = 1;
        var vos = GunManager.getInstance().getGunVOs(item.data);
        var vo1 = vos[1]
        var vo9 = vos[9]
        var double = 1;
        if(!PC.isInBuff(101))
        {
            if(vo1)//散射
                num = vo1.getLevelValue(1);

            if(vo9)//有$1%的机率造成@2倍伤害';
            {
                if(Math.random() < vo9.getLevelValue(1)/100)
                {
                    double = vo9.getLevelValue(2,null,false)
                    if(item)
                    {
                        this.playItemText(item, '爆击x ' +MyTool.toFixed(double,2))
                    }
                }
            }
        }


        var rota = Math.min(20,120/num);
        var total = (num - 1)*rota;
        var start = -total/2
        for(var i=0;i<num;i++)
        {
            this.createBullet(item.data,50,item.y + this.gunGroup.y,start + i*rota,double,item)
        }                                                                                                                                                         1
    }

    public createBullet(id,x,y,rota,double=1,item?){
        var mc = BulletMC.createItem();
        this.bulletArr.push(mc);
        this.con.addChild(mc);
        mc.x = x
        mc.y = y

        mc.data = {
            relateGun:item,
            id:id,
            rota:rota,
            disableSkill:PKCode_wx4.getInstance().isInBuff(101),
            double:double
        };
        return mc
    }

    //public removeBullet(mc:BulletMC){
    //    var index = this.bulletArr.indexOf(mc);
    //    this.bulletArr.splice(index,1);
    //    BulletMC.freeItem(mc);
    //}

    public playItemText(item:GunItem,value,color=0xFF0000){
        var txt = this.createTxt();
        txt.textColor = color;
        txt.text = value;
        var p = item.localToGlobal(item.width/2,item.height/2)
        txt.x = p.x;
        txt.y = p.y;
        this.addChild(txt)

        var tw = egret.Tween.get(txt);
        tw.to({y:txt.y - 50},800).call(function(){
            this.freeTxt(txt);
        },this)
    }

    private createTxt():eui.Label{
        var item:eui.Label = this.txtPool.pop();
        if(!item)
        {
            item = new eui.Label();
            item.size = 20;
            item.stroke = 2;
            item.width = 160;
            item.textAlign="center"
            item.anchorOffsetX = 80;
            item.strokeColor = 0x000000
            item.cacheAsBitmap = true;
        }

        item.alpha = 1;
        return item;
    }

    private freeTxt(item){
        if(!item)
            return;
        egret.Tween.removeTweens(item)
        MyTool.removeMC(item);
        this.txtPool.push(item);
    }


    public show(){
        super.show()
    }

    public hide() {
        super.hide();
        SoundManager.getInstance().playSound('bg')
    }

    public onShow(){
        SoundManager.getInstance().playSound('bg2')
        this.lastBallStep = 30*10;
        this.touchID1 = null;
        this.touchID2 = null;
        this.isDie = false
        this.isReborn = false
        this.isFinish = false
        this.stoping = true
        this.begining = true
        this.blackBG.visible = true
        this.blackBG.alpha = 1
        egret.Tween.get(this.blackBG).to({alpha:0},300).call(()=>{
            this.blackBG.visible = false
        })
        this.createMap();

        this.gunGroup.x = 0;
        this.guideMC.visible = false
        egret.Tween.get(this.gunGroup).to({x:280},500).to({x:196},100).to({x:0},400).wait(100).call(()=>{
            this.stoping = false
            this.begining = false
            this.guideMC.visible = UM_wx4.level <= 3;
            this.guideMC.source = 'guide_png'

            if(PlayManager.getInstance().isEndLess && PKCode_wx4.getInstance().endLessPassStep)
            {
                MyWindow.ShowTips('已自动跳过'+PKCode_wx4.getInstance().endLessPassStep*5+'秒')
            }
        })

        this.bg1.x = 0;
        egret.Tween.get(this.bg1).to({x:150-640},1000)
        this.bg2.x = 640;
        egret.Tween.get(this.bg2).to({x:150},1000)

        var wall = PKCode_wx4.getInstance().wallArr;
        var middleIndex = wall.length/2;
        for(var i=0;i<wall.length;i++)
        {
            var wallItem = wall[i];
            wallItem.stand();
            //wallItem.visible = false;
            this.wallMV(wallItem)
        }

        //this.tipsGroup.visible = false
        this.barGroup.y = -50;
        this.renewBar()
        egret.Tween.get(this.barGroup).wait(1000).to({y:10},200)

        if(PlayManager.getInstance().isEndLess)
        {
            this.rateCon.visible = false
            PlayManager.getInstance().sendGameStart(9999)
        }
        else
        {

            this.rateCon.visible = true
            this.rateCon.bottom = -100;
            egret.Tween.get(this.rateCon).wait(1000).to({bottom:0},200)
            PlayManager.getInstance().sendGameStart(UM_wx4.level)
        }

        this.bossGroup.visible = false


        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
        this.addPanelOpenEvent(GameEvent.client.HP_CHANGE,this.renewBar)
        this.addPanelOpenEvent(GameEvent.client.ADD_BOSS,this.onAddBoss)
        this.addPanelOpenEvent(GameEvent.client.REMOVE_BOSS,this.onRemoveBoss)
    }

    private onAddBoss(e){
        var id = e.data;
        if(id)
        {
            var item = PKStateItem.createItem();
            if(PKStateItem.isBuffLeft(id))
            {
                this.buffGroup1.addChild(item)
                //item.currentState = 's1'
            }
            else
            {
                this.buffGroup2.addChild(item)
                //item.currentState = 's2'
            }

            this.stateArr.push(item);
            item.data = id;
            item.showMV();
        }

        if(id < 1000)
        {
            this.bossGroup.visible = true;
            this.bossGroup.alpha = 1;
            egret.Tween.get(this.bossGroup).to({alpha:0},200).to({alpha:1},200).to({alpha:0},200).to({alpha:1},200).to({alpha:0},200).call(()=>{
                this.bossGroup.visible = false;
            })
        }


    }
    private onRemoveBoss(e){
        var id = e.data;
        for(var i=0;i<this.stateArr.length;i++)
        {
            if(this.stateArr[i].data == id)
            {
                this.stateArr[i].hideMV();
                this.stateArr.splice(i,1);
                break;
            }
        }

    }

    private wallMV(wallItem){
        wallItem.x = 640;
        egret.Tween.get(wallItem).to({x:150},1000)
    }

    private renewBar(){
        if(this.isDie)
            return;
        var rate = PKCode_wx4.getInstance().myHp/ PKCode_wx4.getInstance().myHpMax

        if( PKCode_wx4.getInstance().myHp <= 0)
        {
            this.hpText.text = '城墙血量：' + 0;
            this.isDie = true;
            this.bar.scrollRect = new egret.Rectangle(0,0,0,40)
            var wall = PKCode_wx4.getInstance().wallArr;
            for(var i=0;i<wall.length;i++)
            {
                var wallItem = wall[i];
                this.dieWall(wallItem);
            }
            var wall = PKCode_wx4.getInstance().monsterList;
            for(var i=0;i<wall.length;i++)
            {
                var wallItem = wall[i];
                if(!wallItem.isDie)
                    wallItem.stand()
            }
            egret.Tween.get(this.gunGroup).wait(500).to({x:-100},200).wait(500).call(()=>{
                this.stoping = true;
                while(this.bulletArr.length)
                {
                    BulletMC.freeItem(this.bulletArr.pop())
                }
                if(this.isReborn)
                    ResultUI.getInstance().show()
                else
                    RebornUI.getInstance().show();
            })
        }
        else
        {
            this.hpText.text = '城墙血量：' + PKCode_wx4.getInstance().myHp;
            this.bar.scrollRect = new egret.Rectangle(0,0,rate*630,40)
        }
    }


    private testGameOver(){
        if(!PlayManager.getInstance().isEndLess)
        {
            var PD =  PKCode_wx4.getInstance();
            var rate = PD.enemyHp / PD.enemyHpMax;
            this.rateText.text = MyTool.toFixed(rate*100,1) + '%'
            this.rateBar.width = 600*rate;
            this.rateMC.x = this.rateBar.width;
            if(rate > 0 && PD.autoList.length == 0)
            {
                var liveNum = 0
                var monsterList = PD.monsterList;
                var mlen = monsterList.length
                for(var i=0;i<mlen;i++)
                {
                    var enemy = monsterList[i];
                    if(enemy.isDie)
                        continue;
                    liveNum ++
                    break;
                }
                if(liveNum == 0)
                    rate = 0;
            }

            if(rate == 0)
            {
                this.isFinish = true;
                while(this.bulletArr.length)
                {
                    BulletMC.freeItem(this.bulletArr.pop())
                }
                setTimeout(()=>{
                    this.stoping = true;
                    ResultUI.getInstance().show()
                },1000)
            }
        }

    }

    private dieWall(wallItem){
        setTimeout(()=>{
            wallItem.die();
        },Math.random()*800)
    }

    public reborn(){
        SoundManager.getInstance().playEffect('reborn')
        PKCode_wx4.getInstance().addBuff(1110)
        //this.showWudi = true;
        this.isDie = false;
        this.isReborn = true
        PKCode_wx4.getInstance().resetHP();
        this.renewBar();
        var wall = PKCode_wx4.getInstance().wallArr;
        for(var i=0;i<wall.length;i++)
        {
            var wallItem = wall[i];
            wallItem.run()
        }
        egret.Tween.get(this.gunGroup).wait(500).to({x:50},200).to({x:0},200).wait(100).call(()=>{
            this.stoping = false
        })
    }

    private onE(){
        if(this.begining || this.isFinish)
        {
            var len = this.gunArr.length
            for(var i=0;i<len;i++)
            {
                this.gunArr[i].move2();
            }
        }
        var PD = PKCode_wx4.getInstance();
        var len = PD.monsterList.length
        for(var i=0;i<len;i++)
        {
            PD.monsterList[i].onE();
        }
        var len = PD.wallArr.length
        for(var i=0;i<len;i++)
        {
            PD.wallArr[i].onE();
        }


        if(this.stoping)
            return;


        PD.onStep();
        var len = this.stateArr.length
        for(var i=0;i<len;i++)
        {
            this.stateArr[i].onE();
        }

        if(this.isFinish)
            return;


        var len = this.bulletArr.length
        for(var i=0;i<len;i++)
        {
            var bullet = this.bulletArr[i];
            bullet.move();
            bullet.testHit(PD.monsterList,this.ballArr)
            if(bullet.isDie == 2)
            {
                this.bulletArr.splice(i,1);
                BulletMC.freeItem(bullet);
                i--;
                len --;
                continue;
            }
        }
        var len = this.gunArr.length
        for(var i=0;i<len;i++)
        {
            this.gunArr[i].move();
        }

        var len = this.ballArr.length
        for(var i=0;i<len;i++)
        {
            this.con.addChild(this.ballArr[i]);
        }

        this.lastBallStep ++;
        if(this.lastBallStep >= 30*15)
        {
            this.lastBallStep = 0;
            if(PlayManager.getInstance().isEndLess || PD.autoList.length >= 10)
            {
                var ball = BallMC.createItem();
                this.ballArr.push(ball);
                this.con.addChild(ball);
                if(UM_wx4.level <= 5 && Math.random() > 0.5)
                    ball.data = 1104;
                else
                    ball.data = ArrayUtil_wx4.randomOne([1102,1103,1104,1105,1106,1107,1108,1109,1110,1111])
                ball.x = 640
                ball.y = Math.random()*GameManager_wx4.uiHeight*0.25 + 160;
                ball.move();
            }
        }


        if(this.lastBallStep%15 == 0)
            this.testGameOver();
    }

    public removeBall(ball){
        var index = this.ballArr.indexOf(ball);
        this.ballArr.splice(index,1);
        BallMC.freeItem(ball);
    }

    private createMap(){
        while(this.gunArr.length)
        {
            GunItem.freeItem(this.gunArr.pop())
        }
        while(this.bulletArr.length)
        {
            BulletMC.freeItem(this.bulletArr.pop())
        }
        while(this.stateArr.length)
        {
            PKStateItem.freeItem(this.stateArr.pop())
        }
        while(this.ballArr.length)
        {
            BallMC.freeItem(this.ballArr.pop())
        }
        this.bg1.source = UM_wx4.getBG();
        this.bg2.source = UM_wx4.getBG(UM_wx4.level + 1);


        var num = UM_wx4.gunPosNum;
        for(var i=0;i<num;i++)
        {
            var gunid = GunManager.getInstance().getGunByPos(i+1);
            if(gunid)
            {
                var gun = GunItem.createItem();
                gun.data = gunid
                gun.y = (i+0.5)*80;
                gun.baseY = gun.y
                gun.x = 50;
                this.gunArr.push(gun);
                this.gunGroup.addChild(gun);
            }

        }
        this.gunGroup.y = (GameManager_wx4.uiHeight - num*80)/2

        PKCode_wx4.getInstance().initData();
    }

    public addMonster(item){
        this.con.addChild(item);
    }


}
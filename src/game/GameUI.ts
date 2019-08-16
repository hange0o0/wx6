class GameUI extends game.BaseUI_wx4 {

    private static _instance: GameUI;
    public static getInstance(): GameUI {
        if(!this._instance)
            this._instance = new GameUI();
        return this._instance;
    }


    private bg: eui.Image;
    private bulletGroup: eui.Group;
    private gunCon: eui.Group;
    private endLessBtn: eui.Button;
    private startBtn: eui.Button;
    private coinText: eui.Label;
    private soundBtn: eui.Image;
    private rankBtn: eui.Group;
    private gunBtn: eui.Group;
    private buildBtn: eui.Group;
    private buildLockMC: eui.Image;
    private friendBtn: eui.Group;
    private desText: eui.Label;
    private addForceBtn: eui.Group;
    private addForceText: eui.Label;
    private blackBG: eui.Image;
    private feedBackBtn: eui.Image;
    private ad1: eui.Image;
    private onLineCoinBtn: eui.Group;
    private addCoinMC: eui.Image;
    private addCoinText: eui.Label;








    private shape = new egret.Shape()

    private dragTarget = new MainGunItem()

    private adType
    private adValue


    public endLessLevel = 5;
    public gunArr = [];
    public lastShoot = 0
    public tipsTimer = 0
    public constructor() {
        super();
        this.skinName = "GameUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addBtnEvent(this.startBtn,()=>{
            PlayManager.getInstance().isEndLess = false
            this.startMV();
        })
        this.addBtnEvent(this.feedBackBtn,()=>{
           FeedBackUI.getInstance().show();
        })
        this.addBtnEvent(this.ad1,()=>{
           MyADManager.getInstance().showAD(this.ad1['adData'])
        })
        this.addBtnEvent(this.onLineCoinBtn,()=>{
             UM_wx4.collectCDCoin()
        })
        this.addBtnEvent(this.endLessBtn,()=>{
            if(UM_wx4.level <= this.endLessLevel)
            {
                MyWindow.ShowTips('通关第'+this.endLessLevel+'关后开启')
                return;
            }
            PlayManager.getInstance().isEndLess = true
            this.startMV();
        })
        this.addBtnEvent(this.soundBtn,()=>{
            SoundManager.getInstance().soundPlaying = !SoundManager.getInstance().soundPlaying
            SoundManager.getInstance().bgPlaying = !SoundManager.getInstance().bgPlaying
            //if(SoundManager.getInstance().bgPlaying)
            //    SoundManager.getInstance().playSound('bg')
            //else
            //    SoundManager.getInstance().stopBgSound()
            this.renewSound();
        },this,true)
        this.addBtnEvent(this.rankBtn,()=>{
            RankUI.getInstance().show();
        })
        this.addBtnEvent(this.gunBtn,()=>{
            GunListUI.getInstance().show();
        })
        this.addBtnEvent(this.friendBtn,()=>{
            BuffUI.getInstance().show();
        })
        this.addBtnEvent(this.addForceBtn,()=>{
            if(TM_wx4.now() < UM_wx4.addForceEnd)
            {
                return;
            }

            var str = this.adType == 'cd'?"在《别碰小广告》游戏中坚持"+this.adValue+"秒，即可获得20%战力加成":"在《别碰小广告》游戏中获得"+this.adValue+"分，即可获得20%战力加成"
            MyWindow.Alert(str,()=>{
                MyADManager.getInstance().openWX5({
                    key:this.adType,
                    value:this.adValue,
                    callBack:'addForce',
                })
            },'开始挑战')
        })
        this.addBtnEvent(this.buildBtn,()=>{
            if(UM_wx4.level <= 100)
            {
                MyWindow.ShowTips('双 刀 合 一\n武器改造 100关后 开启')
                return;
            }
            //MakeGunUI.getInstance().show();
        })

        for(var i=0;i<GunManager.getInstance().maxGunNum;i++)
        {
            var item = new MainGunItem();
            item.data = i+1;
            this.gunArr.push(item);
            this.gunCon.addChild(item);
        }

        MyTool.addLongTouch(this.coinText,()=>{
            if(egret.getTimer() - DebugUI.getInstance().debugTimer < 3000)
            {
                MyWindow.ShowTips('你作弊！')
                DebugUI.getInstance().debugOpen = true
            }
        },this)

        MyTool.addLongTouch(this.soundBtn,()=>{
            if(DEBUG)
            {
                DebugUI.getInstance().show();
                return;
            }
            if(DebugUI.getInstance().debugOpen && !SoundManager.getInstance().soundPlaying)
            {
                DebugUI.getInstance().show();
            }
        },this)

        this.gunCon.addEventListener('start_drag',this.onDragStart,this);
        this.gunCon.addEventListener('end_drag',this.onDragEnd,this);
        this.gunCon.addEventListener('move_drag',this.onDragMove,this);

        this.onLineCoinBtn.addChildAt(this.shape,1);
        this.shape.x = 90/2
        this.shape.y = 90/2
    }

    public resetAD(){
        this.adType = Math.random()>0.5?'cd':'score'
        var level =Math.floor((0.5 + Math.random()*0.5)*Math.min(UM_wx4.adLevel,10))
        this.adValue = 30 + level*5;
        if(this.adType == 'score')
            this.adValue *= 30;
    }

    private onDragStart(e){
        e.target.setChoose(true);
        this.dragTarget.data = e.target.data
        this.stage.addChild(this.dragTarget);
        this.dragTarget.x = e.data.x;
        this.dragTarget.y = e.data.y;
    }

    private onDragMove(e){
        if(!this.dragTarget.parent)
            return;
        this.dragTarget.x = e.data.x
        this.dragTarget.y = e.data.y

        var x = this.dragTarget.x //+ this.dragTarget.width/2
        var y = this.dragTarget.y //+ this.dragTarget.height/2
        for(var i=0;i<this.gunArr.length;i++)
        {
            var mc:any = this.gunArr[i];
            mc.showDragState(false)
        }
        for(var i=0;i<this.gunArr.length;i++)
        {
            var mc:any = this.gunArr[i];
            if(mc.currentState == 'normal' && mc.visible && mc.hitTestPoint(x,y))
            {
                if(mc.data != this.dragTarget.data)
                {
                    mc.showDragState(true)
                    break;
                }
            }
        }
    }

    private onDragEnd(e){
        if(!this.dragTarget.parent)
            return;
        MyTool.removeMC(this.dragTarget)
        var x = this.dragTarget.x
        var y = this.dragTarget.y
        for(var i=0;i<this.gunArr.length;i++)
        {
            var mc:any = this.gunArr[i];
            mc.showDragState(false);
            mc.setChoose(false);
            if(mc.currentState == 'normal' && mc.visible && mc.hitTestPoint(x,y))
            {
                if(mc.data != this.dragTarget.data)
                {
                    GunManager.getInstance().addGun(GunManager.getInstance().getGunByPos(this.dragTarget.data),mc.data)
                }
            }
        }
    }

    private renewSound(){
        this.soundBtn.source = SoundManager.getInstance().bgPlaying?'sound_btn1_png':'sound_btn2_png'
    }

    public show(){
        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
        if(_get['pos'])
            UM_wx4.gunPosNum = parseInt(_get['pos']);
        if(_get['level'])
            UM_wx4.level = parseInt(_get['level']);
        SoundManager.getInstance().playSound('bg')


        this.bg.height = GameManager_wx4.uiHeight + 250;
        this.bg.y = 0;
        GameTool.getInstance().preLoadMV();
        RES.loadGroup('hero');
        RES.loadGroup('monster');
        this.renewSound();
        this.renew();
        this.renewCoin();
        this.addPanelOpenEvent(GameEvent.client.COIN_CHANGE,this.renewCoin)
        this.addPanelOpenEvent(GameEvent.client.timerE,this.onE)
        this.addPanelOpenEvent(GameEvent.client.timer,this.onTimer)
        this.addPanelOpenEvent(GameEvent.client.GUN_CHANGE,this.renew)

        if(UM_wx4.pastDayCoin.coin)
        {
            PassDayAwardUI.getInstance().show();
        }
        this.showTips();

        this.resetAD();
        this.renewCoinCD();

        this.addChild(PKUI.getInstance())
        PKUI.getInstance().onShow()
    }

    private showTips(){
        this.setHtml(this.desText, '长按武器进行升级,拖动调整位置\n根据当前成绩，明天可获得金币 '+this.createHtml('x' + NumberUtil_wx4.addNumSeparator(UM_wx4.getPassDayCoin()),0xFFFF00))
        //clearTimeout(this.tipsTimer);
        //this.tipsTimer = setTimeout(()=>{
        //    this.desText.text = ''
        //},5000)

        var adArr = MyADManager.getInstance().getListByNum(10);

        var ad = ArrayUtil_wx4.randomOne(adArr,true);
        if(ad)
        {
            this.ad1['adData'] = ad;
            this.ad1.source = ad.logo
            this.ad1.visible = true;
        }
        else
        {
            this.ad1.visible = false;
        }


        this.onLineCoinBtn.visible = true;
        //var ad = ArrayUtil_wx4.randomOne(adArr,true);
        //if(ad)
        //{
        //    this.ad2['adData'] = ad;
        //    this.ad2.source = ad.logo
        //    this.ad2.visible = true;
        //}
        //else
        //{
        //    this.ad2.visible = false;
        //}

    }

    private onTimer(){
        this.renewForceText();
    }

    private renewCoinCD(){
        if(UM_wx4.cdCoinTime < UM_wx4.cdCoinGetTime + 8*3600)
        {
            var cd = (TM_wx4.nowMS() - UM_wx4.cdCoinTime*1000);
            if(cd >= UM_wx4.collectCD*1000)
            {
                cd -=  UM_wx4.collectCD*1000;
                UM_wx4.resetCDCoin();

                egret.Tween.get(this.addCoinText).to({bottom:-10},100).to({bottom:-20},100)
            }
            MyTool.getSector(44,-90,cd/( UM_wx4.collectCD*1000)*360,0xFCD766,1,this.shape)
            this.addCoinMC.rotation = 0
        }
        else
        {
            MyTool.getSector(44,-90,360,0xA9F966,1,this.shape)
            this.addCoinMC.rotation += 3
        }
        this.addCoinText.text = NumberUtil_wx4.addNumSeparator(UM_wx4.cdCoin,2);
    }

    private onE(){
        if(!this.visible)
            return;
        PKUI.getInstance().onE();
        //for(var i=0;i<this.gunArr.length;i++) {
        //    var item = this.gunArr[i];
        //    item.onE();
        //}
        //if(this.dragTarget.stage)
        //    this.dragTarget.onE();
        //
        //if(!this.startBtn.visible)
        //    return;
        ////this.gunCon.rotation += 0.1;
        ////for(var i=0;i<this.gunArr.length;i++) {
        ////    var item = this.gunArr[i];
        ////    item.rotation = -this.gunCon.rotation
        ////}
        //this.renewCoinCD();
        //
        //this.bg.y += 1;
        //if(this.bg.y > 0)
        //    this.bg.y -= 200;

        //if(egret.getTimer() - this.lastShoot > 500)
        //{
        //    this.lastShoot = egret.getTimer();
        //    var mc = BulletMC.createItem();
        //    this.bulletGroup.addChild(mc);
        //    mc.x = 10 + Math.random()*620
        //    mc.y = GameManager_wx4.uiHeight + 50;
        //    mc.data = {
        //        scale:1,
        //        id:ArrayUtil_wx4.randomOne(GunManager.getInstance().getMyGunList()),
        //    };
        //    egret.Tween.get(mc).to({y:-100},(GameManager_wx4.uiHeight+150)*1).call(()=>{
        //        BulletMC.freeItem(mc);
        //    })
        //    mc.rotation = 0
        //    egret.Tween.get(mc,{loop:true}).to({rotation:360},300)
        //
        //
        //
        //
        //}
    }

    private renewForceText(){
        var cd =  UM_wx4.addForceEnd - TM_wx4.now();
        if(cd<0)
        {
            this.addForceText.text = '挑战游戏，获得20%战力加成'
        }
        else
        {
            this.addForceText.text = '战力+20%     剩余时间：' + DateUtil_wx4.getStringBySecond(cd).substr(-5)
        }

    }

    public onVisibleChange(){
        if(this.visible)
        {
            this.renew();
            this.showTips();
            if(UM_wx4.pastDayCoin.coin)
            {
                PassDayAwardUI.getInstance().show();
            }
        }
    }

    private renewCoin(){
        this.coinText.text = NumberUtil_wx4.addNumSeparator(UM_wx4.coin);
    }

    public renew(){

        if(UM_wx4.level > 100)
            MyTool.removeMC(this.buildLockMC)

        this.blackBG.visible = false
        this.startBtn.label = '第 '+UM_wx4.level+' 关'
        this.bg.source = UM_wx4.getBG();
        var num = Math.min(UM_wx4.gunPosNum + 1,GunManager.getInstance().maxGunNum);
        //var r = 220;
        //var rotaAdd = 360/num;
        var lineObj = {
            4:[2,2],
            5:[2,3],
            6:[1,2,3],
            7:[1,3,3],
            8:[2,3,3],
            9:[3,3,3]
        }
        var pos = lineObj[num];
        for(var i=0;i<this.gunArr.length;i++)
        {
            var item = this.gunArr[i];
            if(i < num)
            {
                this.gunCon.addChild(item);
                //var rota = rotaAdd*i - 90;
                item.scaleX = item.scaleY = 1;
                var xy = this.getPos(i+1,pos)
                item.y = xy.y
                item.x = xy.x
                item.dataChanged();
            }
            else
            {
                 MyTool.removeMC(item);
            }
        }

        this.startBtn.visible = true
        this.endLessBtn.visible = true
        this.addForceBtn.visible = true;
        this.renewForceText();
        if(UM_wx4.level > this.endLessLevel)
            this.endLessBtn.icon = ''
    }

    private getPos(index,pos){
        var count = 0;
        for(var i=0;i<pos.length;i++)
        {
            var num = pos[i];
            if(index <= count + num)//在这一行
            {
                index = index - count
                var width = 540;
                if(num < 3)
                    width = width - width/3
                var des = width/num;
                return {
                    x:des*(index-1) + des/2 + (540-width)/2,
                    y:60 + 180*i
                }
            }
            count += pos[i];
        }
    }

    public startMV(){
        this.startBtn.visible = false
        this.endLessBtn.visible = false
        this.addForceBtn.visible = false;
        this.ad1.visible = false;
        this.onLineCoinBtn.visible = false;
        this.desText.text = ''
        clearTimeout(this.tipsTimer);
        var num =  Math.min(UM_wx4.gunPosNum + 1,GunManager.getInstance().maxGunNum);
        var r = 220;
        var rotaAdd = 360/num;

        var hh = this.gunCon.height/2
        for(var i=0;i<num;i++)
        {
            var item = this.gunArr[i];
            if(GunManager.getInstance().getGunByPos(item.data))
            {
                var lastX = item.x
                var lastY = item.y
                var p = item.localToGlobal(60,60)
                this.globalToLocal(p.x,p.y,p);
                this.addChild(item);
                item.x = p.x
                item.y = p.y
                //this.moveItem(item,i,Math.atan2(lastY - hh,lastX - 250)*180/Math.PI+90,true);
                this.moveItem(item,i,Math.atan2(lastY - hh,lastX - 250)*180/Math.PI+90,(lastY - hh==0 && lastX - 250 == 0));
                //this.moveItem(item,i,i*rotaAdd + this.gunCon.rotation);
            }
            else
            {
                egret.Tween.get(item).to({scaleX:0,scaleY:0},300);
            }
        }

        this.blackBG.visible = true
        this.blackBG.alpha = 0
        this.addChild(this.blackBG);
        egret.Tween.get(this.blackBG).wait(700).to({alpha:1},200)



        setTimeout(()=>{
            PKingUI.getInstance().show()
        },1000)
    }

    private moveItem(item,index,rota,isMiddle?){
        //var unlockNum = 10;
        //var des = 80;
        //var toy = (GameManager.uiHeight - unlockNum*des)/2 + des/2 + (item.data-1)*80
        //egret.Tween.get(item).to({x:320,y:toy,scaleX:0.7,scaleY:0.7},200).wait(300).to({x:250},200).to({x:800},200)

        //var rota = 360*Math.random();
        var r0 = 120
        var r = 700
        var y0 = Math.sin(rota/180*Math.PI)*r0 + GameManager_wx4.uiHeight/2-50;
        var x0 = Math.cos(rota/180*Math.PI)*r0 + 320;
        var y = Math.sin(rota/180*Math.PI)*r + GameManager_wx4.uiHeight/2-50;
        var x = Math.cos(rota/180*Math.PI)*r + 320;

        var tw = egret.Tween.get(item)
        for(var i=0;i<8;i++)
        {
            tw.to({x:-10+20*Math.random() + item.x,y:-10+20*Math.random() + item.y},50)
        }
        if(isMiddle)
            tw.to({scaleX:1.2,scaleY:1.2},100).to({scaleX:0,scaleY:0},100)
        else
            tw.to({x:x,y:y},300)
    }



}
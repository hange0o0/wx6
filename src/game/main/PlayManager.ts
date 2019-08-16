class PlayManager extends egret.EventDispatcher {
    private static _instance:PlayManager;
    public static getInstance() {
        if (!this._instance) this._instance = new PlayManager();
        return this._instance;
    }

    public isEndLess = false;


    public randomSeed;
    public random(seedIn?){
        var seed = seedIn || this.randomSeed;
        seed = ( seed * 9301 + 49297 ) % 233280;
        var rd = seed / ( 233280.0 );
        if(!seedIn)
            this.randomSeed = rd * 100000000;
        return rd;
    }

    public getLevelMonster(level){
        this.randomSeed = level*1234567890;

        var maxCost = 50 + level*Math.pow(1.012,level)*50;  //每一关增加的花费
        var stepCost = maxCost/Math.min(120,20 + level)/30;//每一关增加的时间
        var nowCost = 0;
        var step = 0;
        var monsterCost = -10;
        var monsterList = [];
        var mlv = Math.ceil(level/3);
        for(var s in MonsterVO.data)
        {
             if(MonsterVO.data[s].level <= mlv)
             {
                 monsterList.push(MonsterVO.data[s])
             }
        }
        if(monsterList.length > 16)//同一次最多出场16种怪物
        {
            ArrayUtil_wx4.sortByField(monsterList,['level'],[1]);
            monsterList.length = 16;
        }


        ArrayUtil_wx4.sortByField(monsterList,['cost','id'],[0,0]);
        var minRate = this.random()*0.8;//出现小怪的机率
        var minRateAdd = 0.2 + this.random()*0.3;//出现小怪的机率
        var list = [];
        //list.push(103+'|' + step + '|' +50)

        var needAddBoss = level%5 == 0
        var bossRate = Math.max(0.5,1-level/50);
        while(nowCost < maxCost)
        {
            while(monsterCost < nowCost)
            {
                if(this.random() < minRate)
                    var vo = monsterList[Math.floor(monsterList.length*this.random()*minRateAdd)]
                else
                    var vo = monsterList[Math.floor(monsterList.length*this.random())]
                list.push(vo.id+'|' + step + '|' + Math.floor(this.random()*100))
                monsterCost += vo.cost;
            }
            step++;
            nowCost += stepCost


            if(needAddBoss && nowCost/maxCost > bossRate)
            {
                needAddBoss = false;
                nowCost += 10;//固定10费
                var bossNum = Math.ceil(level/50)
                if(bossNum == 1)
                    list.push((100 + Math.ceil(level/5))+'|' + step + '|' +50)
                else
                {
                    var bossObj = {};
                    var hh = (100/bossNum);
                    for(var i=0;i<bossNum;i++)
                    {
                        var bossid =  Math.ceil(Math.random()*10)
                        if(!bossObj[bossid])
                        {
                            list.push((100 + bossid)+'|' + step + '|' +Math.floor(this.random()*hh +hh*i))
                            bossObj[bossid] = true
                        }
                        else
                            i--;
                    }
                }
            }
        }
        return list.join(',')
    }


    public sendKey
    public sendKeyName
    public sendGameStart(key){
        var wx = window['wx']
        if(!wx)
            return;
        this.sendKey = key
        this.sendKeyName = key == 9999?'无尽':'第'+key+'关'
        wx.aldStage.onStart({
            stageId : this.sendKey, //关卡ID， 必须是1 || 2 || 1.1 || 12.2 格式  该字段必传
            stageName : this.sendKeyName,//关卡名称，该字段必传
            userId  : UM_wx4.gameid//用户ID
        })
    }

    public sendGameReborn(type){
        var wx = window['wx']
        if(!wx)
            return;
        wx.aldStage.onRunning({
            stageId : this.sendKey,    //关卡ID 该字段必传
            stageName : this.sendKeyName, //关卡名称  该字段必传
            userId : UM_wx4.gameid,//用户ID
            event : "revive",  //支付成功 关卡进行中，用户触发的操作    该字段必传
            params : {    //参数
                itemName : type,  //购买商品名称  该字段必传
            }
        })
    }

    public sendGameEnd(isSuccess,info?){
        var wx = window['wx']
        if(!wx)
            return;
        wx.aldStage.onEnd({
            stageId : this.sendKey,    //关卡ID 该字段必传
            stageName : this.sendKeyName, //关卡名称  该字段必传
            userId : UM_wx4.gameid,  //用户ID 可选
            event : isSuccess?"complete":"fail",   //关卡完成  关卡进行中，用户触发的操作    该字段必传
            params : {
                desc :info   //描述
            }
        })
    }


    public sendUseGun(){
        var wx = window['wx']
        if(!wx)
            return;
        if(UM_wx4.level <= 5)
            return;
        for(var s in UM_wx4.gunPos)
        {
            if(UM_wx4.gunPos[s])
            {
                wx.aldSendEvent("使用武器",{'gunid' : UM_wx4.gunPos[s]})
            }
        }
    }


    public coinMVList = []
    public coinMVing = []
    private getCoinMV(){
        var oo = this.coinMVList.pop();
        if(!oo)
        {
            var coinMC = new eui.Image();
            coinMC.anchorOffsetX = 21/2
            coinMC.anchorOffsetY = 23/2

            var imgs = [];
            for(var i=1;i<=8;i++)
            {
                imgs.push('coin_mv'+i+'_png')
            }
            var mv = new SimpleMovieClip(coinMC,imgs)
            oo =  {
                mc:coinMC,
                mv:mv,
            }
        }
        this.coinMVing.push(oo)
        return oo
    }

    private freeCoinMV(oo){
        this.coinMVList.push(oo);
        var index = this.coinMVing.indexOf(oo);
        if(index != -1)
            this.coinMVing.splice(index,1)
    }

    public showDropCoin(mc){
        this.showOneDropCoin(mc,-10 - Math.random()*10,-10 + 20*Math.random())
        this.showOneDropCoin(mc,10 + Math.random()*10,-10 + 20*Math.random())
        this.showOneDropCoin(mc,-20 + Math.random()*40,-10 + 20*Math.random())
    }

    public showOneDropCoin(mc,decX = 0,decY = 0){
        var oo = this.getCoinMV();
        var mv = oo.mv;
        var coinMC = oo.mc;

        var index = mc.parent.getChildIndex(mc);
        mc.parent.addChildAt(coinMC,index+1);
        coinMC.x = mc.x + decX;
        coinMC.y = mc.y + decY


        mv.gotoAndPay()
        egret.Tween.get(coinMC).to({y:coinMC.y - 50},200).to({y:coinMC.y},200).call(()=>{
            mv.stop();
            coinMC.rotation = Math.random()*360
            coinMC.source ='coin_mv0_png'
        }).wait(50).call(()=>{
            coinMC.source ='coin_mv0_png'
        }).wait(500).call(()=>{
            mv.gotoAndPay()
            if(coinMC.parent)
                coinMC.parent.addChild(coinMC)
        }).to({y:300 + Math.random()*(GameManager_wx4.uiHeight - 600),x:-20},500).call(()=>{
            mv.stop()
            MyTool.removeMC(coinMC);
            this.freeCoinMV(oo)
        })
    }

    public onE(){
        var len = this.coinMVing.length
        for(var i=0;i<len;i++)
        {
            this.coinMVing[i].mv.onE();
        }
    }

}
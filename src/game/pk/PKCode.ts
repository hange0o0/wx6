class PKCode_wx4 {
    private static instance:PKCode_wx4;

    public static getInstance() {
        if (!this.instance) this.instance = new PKCode_wx4();
        return this.instance;
    }

    public frameRate = 30   //PKTool.getStepByTime 也要改
    //public mapW = 640
    //public mapH = 640

    public maxMonster = 20

    public playerData = new PlayerData()
    public actionStep = 0;
    public monsterList = [];

    public monsterAddAtk = 0
    public monsterAddSpeed = 0



    public autoMonster = [];

    public maxStep = 0
    public randomSeed = 99999999;
    public random(seedIn?){
        var seed = seedIn || this.randomSeed;
        seed = ( seed * 9301 + 49297 ) % 233280;
        var rd = seed / ( 233280.0 );
        if(!seedIn)
            this.randomSeed = rd * 100000000;
        return rd;
    }




    //每一步执行
    public onStep(){
        this.actionStep ++;
        this.autoAction();//上怪
        //this.monsterAction();
        //this.monsterMove();
        PKMonsterAction_wx3.getInstance().actionAtk();//攻击落实
        //PKBulletManager_wx3.getInstance().actionAll();//攻击落实
        //this.actionFinish();
        //PlayManager.getInstance().onE();

        var len = this.monsterList.length;
        for(var i=0;i<len;i++)
        {
            var monster = this.monsterList[i];
            monster.onStep();
        }
    }

    //自动出战上怪
    public autoAction(){

        while(this.autoMonster[0] && this.autoMonster[0].step <= this.actionStep)// && this.monsterList.length == 0
        {
            var data = this.autoMonster.shift()
            var mid = _get['mid'] || data.id;
            this.monsterList.push(PKCodeUI.getInstance().addMonster(mid,this.playerData.x + data.x,this.playerData.y + data.y))
        }
    }



    public initData(){
        this.actionStep = 0;
        this.monsterList.length = 0;
        PKMonsterAction_wx3.getInstance().init();
        this.autoMonster = this.getLevelMonster(1);
        this.maxStep = this.autoMonster[this.autoMonster.length-1].step;
        //PKBulletManager_wx3.getInstance().freeAll();
    }

    public getLevelMonster(level){
        //this.randomSeed = level*1234567890;
        this.randomSeed = Math.random()*1234567890;

        var maxCost = 50 + level*Math.pow(1.012,level)*50;  //每一关增加的花费
        var stepCost = maxCost/Math.min(300,27 + level*3)/30;//每一关增加的时间
        var nowCost = 0;
        var step = 50;
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
        if(monsterList.length > 10)//同一次最多出场10种怪物
        {
            var temp = [];
            for(var i=0;i<10;i++)
            {
                var index = Math.floor(this.random()*monsterList.length)
                temp.push(monsterList[index])
                monsterList.splice(index,1);
            }
            monsterList = temp;
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
                list.push({
                    id:vo.id,
                    step:step,
                    x:-500 + PKC.random()*1000,
                    y:-500 + PKC.random()*1000
                })
                monsterCost += vo.cost;
            }
            step++;
            nowCost += stepCost


            if(needAddBoss && nowCost/maxCost > bossRate)
            {
                var boss = [101,102,104,105,106,107,108,109,110]
                needAddBoss = false;
                nowCost += 10;//固定10费
                var bossNum = Math.ceil(level/(9*5))
                if(bossNum == 1)
                    list.push(boss[Math.floor(level/5)] + '|' + step)
                else
                {
                    for(var i=0;i<bossNum;i++)
                    {
                        var index = Math.floor(Math.random() * boss.length)
                        var bossid =  boss[index]
                        boss.splice(index,1)
                        list.push({
                            id:bossid,
                            step:step,
                            x:-500 + PKC.random()*1000,
                            y:-500 + PKC.random()*1000
                        })
                    }
                }
            }
        }
        return list
    }
}
class PKCode_wx4 {
    private static instance:PKCode_wx4;

    public static getInstance() {
        if (!this.instance) this.instance = new PKCode_wx4();
        return this.instance;
    }

    public mapW = 640
    public mapH = 640

    public playerData = new PlayerData()
    public actionStep = 0;
    public monsterList = [];




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
    }

    //自动出战上怪
    public autoAction(){
        if(this.actionStep > 50 && this.monsterList.length < 10)
        {
            var x = 50 + PKC.random()*(PKC.mapW - 50)
            var y = 50 + PKC.random()*(PKC.mapH - 50)
            this.monsterList.push(PKUI.getInstance().addMonster(4,x,y))
        }
    }











    public myHp = 1000;
    public myHpMax = 1000;
    public hpAdd = 0;
    public coinAdd = 0;
    //public wudiTime = 1000;

    public wallArr = [];
    public autoList = [];
    public enemyHp = 0//
    public enemyHpMax = 0//
    public endLessStep = 0//无尽的步数
    public endLessPassStep = 0//无尽的开始跳过的步数

    public atkList = {}
    public buffList = {}

    public isWDing(){
        return this.isInBuff(1110)
    }

    public getBulletAtk(bid,noBuff?){
        var hp = this.atkList[bid].base + this.atkList[bid].add
        var add = 1;
        if(!noBuff)
        {
            if(this.isInBuff(109))
                add -= 0.2
            if(this.isInBuff(106))
                add -= 0.2
        }
        return Math.ceil(hp*add);
    }

    public isInBuff(id){
        return this.buffList[id];
    }


    public getItemByID(id):PKMonsterItem_wx3{
        var mlen = this.monsterList.length
        for(var i=0;i<mlen;i++)
        {
            var item = this.monsterList[i];
            if(item.id == id)
                return item;
        }

        var mlen = this.wallArr.length
        for(var i=0;i<mlen;i++)
        {
            var item = this.wallArr[i];
            if(item.id == id)
                return item;
        }
    }

    public randomEnemy(){
        var arr = []
        var mlen = this.monsterList.length
        for(var i=0;i<mlen;i++)
        {
            var item = this.monsterList[i];
            if(!item.isDie && !item.isWuDi())
                arr.push(item)
        }
        return ArrayUtil_wx4.randomOne(arr);
    }

    public playAniOn(a,mvID){
        var atker = this.getItemByID(a)
        if(!atker)
        {
            throw new Error('XXX')
            return;
        }
        var scale = Math.max(1,(atker.vo.height)/70);
        var AM = AniManager_wx3.getInstance();
        var mv = AM.playOnItem(mvID,atker);
        if(mv)
            mv.scaleX = mv.scaleY = scale
        return  mv;
    }

    public resetHP(){
        this.myHp = this.myHpMax = 500+BuffManager.getInstance().getHpAdd() + this.hpAdd;
    }

    //对一定范围内的敌人造成伤害
    public hitEnemyAround(x,y,range,hurt){
        var mlen = this.monsterList.length
        for(var i=0;i<mlen;i++)
        {
            var item = this.monsterList[i];
            if(item.isDie || item.isWuDi())
                continue;
            if(Math.abs(item.x - x) <= range &&  Math.abs(item.y - y) <= range)
            {
                item.addHp(-hurt);
            }
        }
    }


    public initData(){

        this.buffList = {};
        this.atkList = {};
        var addAtk = 0;
        this.hpAdd = 0
        this.coinAdd = 0
        for(var s in UM_wx4.gunPos)
        {
            var gunid = UM_wx4.gunPos[s];
            if(gunid)
            {
                var vos = GunManager.getInstance().getGunVOs(gunid);
                this.atkList[gunid] = {
                    base:GunManager.getInstance().getGunAtk(gunid),
                    add:0,
                }
                if(vos[6])
                {
                    addAtk += vos[6].getLevelValue(1)
                }
                if(vos[10])
                {
                   this.coinAdd = vos[10].getLevelValue(1)
                }
                if(vos[11])
                {
                    this.hpAdd = vos[11].getLevelValue(1)
                }
            }
        }
        if(UM_wx4.addForceEnd > TM_wx4.now())
            addAtk += 20;
        if(addAtk)
        {
            for(var s in this.atkList)
            {
                this.atkList[s].add += this.atkList[s].base*(1+addAtk/100);
            }
        }
        this.resetHP();

        PKMonsterAction_wx3.getInstance().init();
        PKBulletManager_wx3.getInstance().freeAll();
        while(this.wallArr.length)
        {
            PKMonsterItem_wx3.freeItem(this.wallArr.pop())
        }
        while(this.monsterList.length)
        {
            PKMonsterItem_wx3.freeItem(this.monsterList.pop())
        }

        var wallDec = 70;
        var len = Math.ceil(GameManager_wx4.uiHeight/wallDec)
        for(var i=0;i<len;i++)
        {
            var wall = PKMonsterItem_wx3.createItem();
            PKingUI.getInstance().getCon().addChild(wall);
            wall.data = {mid:99};
            wall.y =i*wallDec+80
            wall.x =150
            this.wallArr.push(wall);
        }

        this.actionStep = 0;
        this.enemyHp = 0;
        if(PlayManager.getInstance().isEndLess)
        {
            this.endLessPassStep = Math.max(0,Math.floor((UM_wx4.endLess - 60)/5))
            this.endLessStep =  this.endLessPassStep + 1;
            this.autoList = [];
            this.createEndLess();
        }
        else
        {
            var level = UM_wx4.level;
            var list = PlayManager.getInstance().getLevelMonster(level)
            var height = Math.min(300 + level*5,960)
            var startY = this.getStartY(height);
            var hpRate = 1 + (level - 1)*0.11;
            var bossHpRate = Math.pow(1.15,level/2);

            this.autoList = list.split(',');
            for(var i=0;i<this.autoList.length;i++)
            {
                var temp = this.autoList[i].split('|')
                var mid = parseInt(temp[0]);
                var vo =  MonsterVO.getObject(mid);
                if(vo.isHero())
                    var hp = Math.floor(vo.hp * bossHpRate)
                else
                    var hp = Math.floor(vo.hp * hpRate)
                this.autoList[i] = {
                    mid:mid,
                    hp:hp,
                    step:parseInt(temp[1]),
                    y:parseInt(temp[2])/100*height + startY
                }
                this.enemyHp += hp;
            }
            this.enemyHpMax = this.enemyHp;
        }

    }

    private getStartY(height){
        var yy = (GameManager_wx4.uiHeight - height)/2 + 80/2 //上移怪物身高
        if(yy < 120) //不能太高
            yy = 120;
        if(yy > GameManager_wx4.uiHeight - height - 20) //也不能太低
            yy = GameManager_wx4.uiHeight - height - 20
        return yy
    }

    private createEndLess(){
        var maxCost = 30 + this.endLessStep * 5
        var stepCost = maxCost/(5)/30; //每一帧增加的花费
        var nowCost = 0;
        var step = this.actionStep;
        var monsterCost = -10;
        var monsterList = [];
        var mlv = Math.ceil(this.endLessStep/3);
        for(var s in MonsterVO.data)
        {
            if(MonsterVO.data[s].level <= mlv)
            {
                monsterList.push(MonsterVO.data[s])
            }
        }
        if(monsterList.length > 16)//同一次最多出场10种怪物
        {
            ArrayUtil_wx4.sortByField(monsterList,['level'],[1]);
            monsterList.length = 16;
        }

        ArrayUtil_wx4.sortByField(monsterList,['cost','id'],[0,0]);

        var minRate = Math.random()*0.8;//出现小怪的机率
        var minRateAdd = 0.2 + Math.random()*0.3;//出现小怪的机率
        var hpRate = 1 + (this.endLessStep - 1)*0.12;
        var height = Math.min(300 + this.endLessStep*5,960)
        var startY = this.getStartY(height);
        var needAddBoss = this.endLessStep%5 == 0
        while(nowCost < maxCost)
        {
            while(monsterCost < nowCost)
            {
                if(minRate > Math.random())
                    var vo = monsterList[Math.floor(monsterList.length*Math.random()*minRateAdd)]
                else
                    var vo = monsterList[Math.floor(monsterList.length*Math.random())]
                monsterCost += vo.cost;
                this.autoList.push({
                    mid:vo.id,
                    hp:Math.floor(vo.hp * hpRate),
                    step:step,
                    y:Math.random()*height + startY
                })
            }
            step++;
            nowCost += stepCost

            if(needAddBoss && nowCost/maxCost > 0.75)
            {
                nowCost += 10;//固定10费
                var bossHpRate =  Math.pow(1.15,this.endLessStep/3);
                needAddBoss = false;
                var bossNum = Math.ceil(this.endLessStep/50)
                if(bossNum == 1)
                    var bvo = MonsterVO.getObject(100 + Math.ceil(this.endLessStep/5))
                else
                {
                    while(true)
                    {
                        var bossid = 100 + Math.ceil(Math.random()*10);
                        if(!this.isInBuff(bossid))
                            break;
                    }
                    var bvo = MonsterVO.getObject(bossid)
                }
                this.autoList.push({
                    mid:bvo.id,
                    hp:Math.floor(bvo.hp * bossHpRate),
                    step:step,
                    y:0.5*height + startY
                })
            }
        }
        this.endLessStep ++;
    }



    public addBuff(id){
        var noBuff = !this.buffList[id]
        this.buffList[id] = {step:PKStateItem.buffcd[id]};
        if(id == 111)
        {
            var mlen = this.monsterList.length
            for(var i=0;i<mlen;i++)
            {
                var target = this.monsterList[i]
                if(!target.isDie) //死的
                {
                    target.setYun(1.1)
                }
            }
        }
        if(noBuff)
        {
            if(id == 1103)
                this.speedBuffChange()
            EventManager_wx4.getInstance().dispatch(GameEvent.client.ADD_BOSS,id)
        }
    }



    //怪出手
    public monsterAction(){
        if(this.myHp <= 0)
            return;
        var mlen = this.monsterList.length
        for(var i=0;i<mlen;i++)
        {
            var target:PKMonsterItem_wx3 = this.monsterList[i]
            if(target.isDie)
                continue;
            target.onE();

            if(target.stop)
                continue;
            if(target.yunStep)
                continue;


            if(target.x < target.vo.getAtkDis() + 200)//普攻
            {
                  this.targetAtk(target);
            }
        }
    }

    private targetAtk(target){
        target.atk();
        target.stop = 1;
        //前摇结束
        var id = target.id;
        PKMonsterAction_wx3.getInstance().addList({
            step:Math.floor(PKTool.getStepByTime(target.vo.mv_atk)*target.getSpeedRate()),
            id:id,
            target:target,
            fun:()=>{
                if(target.isDie)
                    return;
                var step = PKTool.getStepByTime(target.vo.atkrage*5);
                var delay10 = [103,61,62,63,70,76]
                if(delay10.indexOf(Math.floor(target.mid)) != -1)
                    step = 10;
                else if(target.mid == 64)
                    step = Math.floor(step/2);
                step = Math.floor(step*target.getSpeedRate());
                AtkMVCtrl_wx3.getInstance().mAtkMV(target.mid,target,step);//飞行动画

                PKMonsterAction_wx3.getInstance().addList({  //攻击生效
                    step:step,
                    id:id,
                    target:target,
                    fun:()=>{
                        if([61,62,63,70,76].indexOf(target.mid) != -1)
                            target.setDie();
                        if(!this.isWDing())
                            this.addHp(-target.getAtk())
                        if(this.myHp > 0)
                            target.target.atk();
                        //console.log(this.myHp)

                    }
                })
            }
        })

        //僵直结束
        PKMonsterAction_wx3.getInstance().addList({
            step:Math.floor(PKTool.getStepByTime(target.vo.atkcd)*target.getSpeedRate()),
            id:id,
            target:target,
            fun:()=>{
                target.stop=0;
            }
        })
    }

    public addHp(v){
        this.myHp += v
        if(this.myHp > this.myHpMax)
            this.myHp = this.myHpMax
        EM_wx4.dispatch(GameEvent.client.HP_CHANGE)
    }
    public addAtk(id,v){
        this.atkList[id].add += v;
    }

    //怪移动
    public monsterMove(){
        if(this.myHp <= 0)
            return;
        var mlen = this.monsterList.length
        for(var i=0;i<mlen;i++)
        {
            var target:PKMonsterItem_wx3 = this.monsterList[i]
            if(target.isDie)
                continue;
            if(target.stop)
                continue;
            if(target.yunStep)
                continue;
            target.run();
        }
    }

    public speedBuffChange(){
        var mlen = this.monsterList.length
        for(var i=0;i<mlen;i++)
        {
            var target:PKMonsterItem_wx3 = this.monsterList[i]
            target.onSpeedChange();
        }
    }

    //一轮操作结束,移队死，过线的，结算,清除BUFF
    public actionFinish(){
        //BUFF效果
        var mlen = this.monsterList.length
        if(this.actionStep%30 == 0)
        {
            var buff107 =  this.isInBuff(107)
            var buff1111 =  this.isInBuff(1111)
            var buff1108 =  this.isInBuff(1108)
            if(buff107 || buff1111 || buff1108)
            {
                for(var i=0;i<mlen;i++)
                {
                    var target = this.monsterList[i]
                    if(!target.isDie) //死的
                    {
                        if(buff107)
                            target.addHp(Math.ceil(target.maxHp*0.05))
                        if(buff1108)
                            target.addHp(-Math.ceil(target.maxHp*0.05))
                        if(buff1111)
                            target.setYun(1.1)
                    }
                }
            }
            if(this.isInBuff(108))
            {
                if(!this.isWDing())
                    this.addHp(-Math.ceil(this.myHpMax*0.03))
            }
            if(this.isInBuff(1107))
            {
                this.addHp(Math.ceil(this.myHpMax*0.03))
            }
        }

        var sbc = false
        for(var s in this.buffList)
        {
            var buff = this.buffList[s];
            if(!buff.isHero)
            {
                buff.step --;
                if(!buff.step || buff.step< 0)
                {
                    delete this.buffList[s];
                    EventManager_wx4.getInstance().dispatch(GameEvent.client.REMOVE_BOSS,parseInt(s))
                    if(s == '1103' || s == '104')
                        sbc = true;
                }
            }
        }
        if(sbc)
            this.speedBuffChange();



        for(var i=0;i<mlen;i++)
        {
            var target = this.monsterList[i]
            if(target.isDie==2) //死的
            {

                if(MonsterVO.getObject(target.data.mid).isHero())
                {
                    if(this.buffList[target.data.mid])
                    {
                        delete this.buffList[target.data.mid];
                        EventManager_wx4.getInstance().dispatch(GameEvent.client.REMOVE_BOSS,target.data.mid)
                    }
                }


                this.monsterList.splice(i,1);
                i--;
                mlen--;
                PKMonsterItem_wx3.freeItem(target);
            }
        }
    }


}
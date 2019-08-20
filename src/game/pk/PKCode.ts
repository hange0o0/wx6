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
            this.monsterList.push(PKCodeUI.getInstance().addMonster(4,x,y))
        }
    }


    public getItemByID(id):MBase{
        var mlen = this.monsterList.length
        for(var i=0;i<mlen;i++)
        {
            var item = this.monsterList[i];
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
        var scale = Math.max(1,(atker.getVO().height)/70);
        var AM = AniManager_wx3.getInstance();
        var mv = AM.playOnItem(mvID,atker);
        if(mv)
            mv.scaleX = mv.scaleY = scale
        return  mv;
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
        PKMonsterAction_wx3.getInstance().init();
        //PKBulletManager_wx3.getInstance().freeAll();

    }
}
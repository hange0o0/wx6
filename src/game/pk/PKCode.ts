class PKCode_wx4 {
    private static instance:PKCode_wx4;

    public static getInstance() {
        if (!this.instance) this.instance = new PKCode_wx4();
        return this.instance;
    }

    public frameRate = 30   //PKTool.getStepByTime 也要改
    public mapW = 640
    public mapH = 640

    public maxMonster = 20

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



    public initData(){
        PKMonsterAction_wx3.getInstance().init();
        //PKBulletManager_wx3.getInstance().freeAll();

    }
}
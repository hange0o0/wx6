class S2 extends SBase{
    constructor() {
        super();
    }

    public atkRate = 1.5
    public disRate = 1
    public totalStep = 60

    public endStep
    public lastHitMonsterTime = {}
    public onCreate(){

    }

    public onUse(){
        var playerData = PKC.playerData;
        playerData.isSkilling = this.sid
        this.endStep = PKC.actionStep + this.totalStep




        var item = playerData.relateItem;
        item.cleanTween();

        item.leftCon.scaleX = -1;
        item.leftCon.rotation = -90
        item.leftCon.x = -20;
        item.leftCon.y = 40;

        item.leftCon.scaleX = 1;
        item.rightCon.rotation =  90
        item.rightCon.x = 100;
        item.rightCon.y = 40;


        item.body.x = 40
        item.body.y = 40
    }

    public onStep(){
        var playerData = PKC.playerData;
        if(playerData.isSkilling != this.sid)
            return;
        var actionStep = PKC.actionStep;
        if(this.endStep <= PKC.actionStep)
        {
            playerData.isSkilling = 0;
            playerData.relateItem.showStandMV();
            return;
        }
        playerData.relateItem.roleCon.rotation += 50

        var monsterList = PKC.monsterList;
        var len = monsterList.length;
        var atk = Math.ceil(playerData.getAtk()*this.atkRate);
        var atkDis = Math.ceil(playerData.atkDis*this.disRate)
        var hitBack = playerData.hitBack
        for(var i=0;i<len;i++)
        {
            var monster = monsterList[i];
            if(monster.isDie)
                continue;
            if(this.lastHitMonsterTime[monster.onlyID] && actionStep - this.lastHitMonsterTime[monster.onlyID] < 5)
                continue;

            var dis = MyTool.getDis(monster,playerData)
            if(dis < atkDis)
            {
                this.lastHitMonsterTime[monster.onlyID] = actionStep
                monster.addHp(-atk);
                if(hitBack)//可击退
                {
                    var rotaBase = PKTool.getRota(playerData,monster);
                    var x = Math.cos(rotaBase)*hitBack
                    var y = Math.sin(rotaBase)*hitBack
                    monster.relateItem.resetXY(monster.x+x,monster.y+y)
                }
            }
        }
    }



}
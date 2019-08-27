class S14 extends SBase{
    constructor() {
        super();
    }

    public hurt = 100
    public maxNum = 5
    public minDis = 200


    public onCreate(){

    }

    public onUse(){

        var playerData = PKC.playerData;


        var monsterList = PKC.monsterList;
        var len = monsterList.length;
        var nearMonster = [];
        var rota1 = PKTool.resetAngle(playerData.relateItem.ctrlRota);
        var atkRota = 120
        var atkRota1 = atkRota/2
        var atkRota2 = 360 - atkRota1
        for(var i=0;i<len;i++)
        {
            var monster = monsterList[i];
            var dis = MyTool.getDis(monster,playerData)
            if(dis > this.minDis)
                continue;

            var rotaBase = PKTool.getRota(playerData,monster);
            var rota2 = PKTool.resetAngle(rotaBase/Math.PI*180);
            var rotaDes = Math.abs(rota2 - rota1)
            if(rotaDes > atkRota1 && rotaDes < atkRota2)
            {
                continue;
            }
            nearMonster.push(monster)
        }

        if(nearMonster.length > this.maxNum)
        {
            ArrayUtil_wx4.random(nearMonster)
            nearMonster.length = this.maxNum
        }

        len = nearMonster.length;
        for(var i=0;i<len;i++)
        {
            var monster = nearMonster[i];
            monster.addHp(-this.hurt)
            PKTool.showLight(playerData,monster)
        }

        return true;
    }
}
class S23 extends SBase{
    constructor() {
        super();
    }

    public dis = 200
    public hitBack = 200

    public onCreate(){

    }

    public onUse(){
        var playerData = PKC.playerData

        var monsterList = PKC.monsterList;
        var len = monsterList.length;
        var atkDis = this.dis
        var hitBack = this.hitBack
        for(var i=0;i<len;i++)
        {
            var monster = monsterList[i];
            if(monster.isDie)
                continue;

            var dis = MyTool.getDis(monster,playerData)
            if(dis < atkDis)
            {
                var rotaBase = PKTool.getRota(playerData,monster);
                var x = Math.cos(rotaBase)*hitBack
                var y = Math.sin(rotaBase)*hitBack
                monster.relateItem.resetXY(monster.x+x,monster.y+y)
            }
        }
        return true;
    }
}
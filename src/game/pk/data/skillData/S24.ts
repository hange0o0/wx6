class S24 extends SBase{
    constructor() {
        super();
    }
    public atkDis = 120
    public hitBack = 200

    public onCreate(){

    }

    public onUse(){
        var playerData = PKC.playerData
        var monsterList = PKC.monsterList;
        var len = monsterList.length;
        var rota1 = PKC.playerData.relateItem.ctrlRota
        var atkRota = 120
        var atkRota1 = atkRota/2
        var atkRota2 = 360 - atkRota1
        for(var i=0;i<len;i++)
        {
            var monster = monsterList[i];
            if(monster.isDie)
                continue;
            if(!monster.beSkillAble)
                continue;
            var dis = MyTool.getDis(monster,playerData)
            if(dis < this.atkDis)
            {
                var rotaBase = PKTool.getRota(playerData,monster);
                var rota2 = PKTool.resetAngle(rotaBase/Math.PI*180);
                var rotaDes = Math.abs(rota2 - rota1)
                if(rotaDes > atkRota1 && rotaDes < atkRota2)
                    continue;
                //在攻击范围内，可造成伤害

                var hitBack = this.hitBack
                var x = Math.cos(rotaBase)*hitBack
                var y = Math.sin(rotaBase)*hitBack
                monster.relateItem.resetXY(monster.x+x,monster.y+y)
            }
        }

        var moveRota = rota1/180*Math.PI
        var xx = playerData.x + 100 * Math.cos(moveRota)
        var yy = playerData.y + 100 * Math.sin(moveRota)
        var mv = PKTool.playMV({
            mvType:1,
            num:4,
            key:'zhen',
            type:'on',
            anX:167/2,
            anY:145/2,
            item:playerData.relateItem,
            once:true,
            xy:{x:xx,y:yy}
        })
        mv.scaleX = mv.scaleY = 0.7

        return true;
    }
}
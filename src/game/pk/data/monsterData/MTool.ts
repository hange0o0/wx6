class MTool {
    public static getDistance(){

    }

    public static nearAtkFun(itemData,fun?,fun2?){
        PKMonsterAction_wx3.getInstance().addList({
            target:itemData,
            onlyID:itemData.onlyID,
            step:PKTool.getStepByTime(itemData.getVO().mv_atk),
            fun:()=>{
                fun2 && fun2();
                if(MyTool.getDis(itemData,PKC.playerData) <= itemData.atkDis)
                {
                    var playerData = PKC.playerData
                    playerData.addHp(-itemData.atk,itemData);
                    fun && fun();
                }
            }
        })
    }

    private static getXYKey(x,y,r){
        x = Math.round(x/r);
        y = Math.round(y/r);
        return x + '_' + y;
    }


    //
    public static markAtkFun(r,num,markData){

        var playerData = PKC.playerData;
        var middle = {x:playerData.x,y:playerData.y};
        var markArr = []
        var keyObj = {}
        var itemWidth = 100
        var testNum = 100

        if(middle.x-r < 0)
            middle.x = r;
        else if(middle.x + r > PKC.mapW)
            middle.x = PKC.mapW - r;

        if(middle.y-r < 0)
            middle.y = r;
        else if(middle.y + r > PKC.mapH)
            middle.y = PKC.mapH - r;

        markArr.push({x:playerData.x + Math.random()*20-10,y:playerData.y + Math.random()*20-10})
        keyObj[this.getXYKey(playerData.x,playerData.y,itemWidth)] = 1;
        num --;

        while(num > 0 && testNum > 0)
        {

            testNum --;
            var x = middle.x - r + Math.random()*r*2;
            var y = middle.y - r + Math.random()*r*2;
            var key = this.getXYKey(x,y,itemWidth)
            if(keyObj[key])
                continue;
            num --;
            keyObj[key] = 1;
            markArr.push({x:x,y:y})
        }

        var len = markArr.length
        for(var i=0;i<len;i++)
        {
            var oo = markArr[i];
            PKCodeUI.getInstance().addMark(oo.x,oo.y,markData)
        }
    }

    public static moveSkillFun(monster,skillData){
        var playerData = PKC.playerData
        if(skillData.isFootPos)
            var hitPoint = monster
        else
            var hitPoint = monster.getHitPos();
        var rota = Math.atan2(playerData.y - hitPoint.y,playerData.x-hitPoint.x)/Math.PI*180 - 90
        PKCodeUI.getInstance().addLine(monster.x,monster.y,rota,{
            isFollow:skillData.isFollow,
            isFootPos:skillData.isFootPos,
            owner:monster,
            len:1000,
            type:'mark',
            endFun:skillData.endFun
        })
    }

    public static addNewMonster(data){
        var mData = PKCodeUI.getInstance().addMonster(data.mid,data.x,data.y);
        if(data.hp)
        {
            mData.hp = data.hp;
            mData.relateItem.renewHp();
        }
        PKC.monsterList.push(mData)
        return mData
    }

}
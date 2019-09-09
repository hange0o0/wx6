class M63 extends MBase{
    //绿泥怪   自爆 定时分裂
    constructor() {
        super();
    }

    private moveStep = 0

    private lastSplitTime
    private splitCD = 10*PKC.frameRate
    public onCreate(){
        this.lastSplitTime = PKC.actionStep
    }
    public atkFun(){
        this.moveStep = 15
        MTool.nearAtkFun(this,null,()=>{
            this.hp = 0
            this.isDie = 1;
            this.relateItem.dieMV();
            this.relateItem.renewHp();
        })
    }

    public onStep(){
        if(this.moveStep > 0)
        {
            this.moveStep --;
            var playerData = PKC.playerData
            var rota = Math.atan2(playerData.y - this.y,playerData.x-this.x)

            var x = this.x + 7*Math.cos(rota)
            var y = this.y + 7*Math.sin(rota)
            this.relateItem.resetXY(x,y)
        }
        else
        {
            if(PKC.actionStep - this.lastSplitTime > this.splitCD)
            {
                this.lastSplitTime = PKC.actionStep;
                if(PKC.monsterList.length > PKC.maxMonsterNum)
                    return;

                var rota = Math.random()*Math.PI*2
                var r = this.size + this.size
                var x = this.x + Math.cos(rota) * r
                var y = this.y + Math.sin(rota) * r
                MTool.addNewMonster({mid:63,x:x,y:y})
            }
        }
    }
}
class M62 extends MBase{
    //橙泥怪   自爆 血
    constructor() {
        super();
    }

    private moveStep = 0
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
    }
}
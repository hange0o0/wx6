class M3 extends MBase{
    constructor() {
        super();
    }
    public atkFun(){
        MTool.nearAtkFun(this)
    }

    public canSkill(){
        return Math.random()< 0.5 && this.nextSkillBeign < PKC.actionStep
    }

    public skillFun(){
        this.skillEnd = Number.MAX_VALUE
        MTool.moveSkillFun(this,{
            isFollow:true,
            isFootPos:true,
            endFun:this.skillEndFun,

        })
    }


    private moving = false
    private moveRota = 0
    private lastDis = 0
    private skillEndFun(rota){
        this.moving = true;
        this.moveRota = rota/180*Math.PI
        this.lastDis = MyTool.getDis(this,PKC.playerData)
        this.relateItem.run()
    }

    public onStep(){
        if(this.moving)
        {
            var x = this.x + 50*Math.cos(this.moveRota);
            var y = this.y + 50*Math.sin(this.moveRota);
            this.relateItem.resetXY(x,y)

            var dis = MyTool.getDis(this,PKC.playerData)
            if(dis < this.atkDis || dis > this.lastDis)
            {
                this.moving = false;
                this.skillEnd = 0;
                this.nextSkillBeign = PKC.actionStep + 30*5;
                return;
            }
            this.lastDis = dis;
        }
    }
}
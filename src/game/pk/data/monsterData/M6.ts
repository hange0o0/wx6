class M6 extends MBase{
    //狂战士   冲过去，过程会造成伤害
    constructor() {
        super();
    }

    public skillDis = 500//技能距离
    public skillCD = PKTool.getStepByTime(5000)//技能间隔

    public canSkill(){
        return super.canSkill() && MyTool.getDis(this,PKC.playerData)>300
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
    private moveDis = 600
    private skillEndFun(rota){
        this.moving = true;
        this.moveRota = rota/180*Math.PI
        this.moveDis = 800
        this.relateItem.runMV()
    }

    public onStep(){
        if(this.moving)
        {
            var x = this.x + 50*Math.cos(this.moveRota);
            var y = this.y + 50*Math.sin(this.moveRota);
            this.relateItem.resetXY(x,y)
            this.moveDis -= 50

            if(this.moveDis <= 0)
            {
                this.moving = false;
                this.skillEnd = 0;
                return;
            }
        }
    }
}
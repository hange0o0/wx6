class M2 extends MBase{
    constructor() {
        super();
    }


    public atkFun(){
        MTool.nearAtkFun(this)
    }

    public canSkill(){
        return Math.random()< 0.5
    }

    public skillFun(){
        MTool.moveSkillFun(this,{
            isFollow:true,
            endFun:this.skillEndFun,

        })

    }

    private skillEndFun(rota){
        rota = rota/180*Math.PI
        var bullet = PKCodeUI.getInstance().shoot(this,rota);
        bullet.setImage( 'bullet9_png');
        bullet.endTime = PKC.actionStep + 60
        bullet.speed = 10
        bullet.atk = this.atk
    }
}
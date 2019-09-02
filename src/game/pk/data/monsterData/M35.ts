class M35 extends MBase{
    //炽红花菇  扇形8
    constructor() {
        super();
    }

    public atkFun(){
        this.runDelay(this.shootFun,3)
    }

    private shootFun(){
        var playerData = PKC.playerData
        var hitPoint = this.getHitPos();
        var rota = Math.atan2(playerData.y - hitPoint.y,playerData.x-hitPoint.x)



        rota -= Math.PI*150/180/2
        var step = Math.PI*150/180/7

        for(var i = 0;i<8;i++)
        {
            var bullet = PKCodeUI.getInstance().shoot(this,rota + step*i,hitPoint);
            bullet.setImage( 'bullet2_png');
            bullet.endTime = PKC.actionStep + 150
            bullet.speed = 7
            bullet.atk = this.atk
        }
    }
}
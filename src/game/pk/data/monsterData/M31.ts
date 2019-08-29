class M31 extends MBase{
    constructor() {
        super();
    }


    public atkFun(){
        var playerData = PKC.playerData
        var hitPoint = this.getHitPos();
        var rota = Math.atan2(playerData.y - hitPoint.y,playerData.x-hitPoint.x)/Math.PI*180 - 90
        PKCodeUI.getInstance().addLine(hitPoint.x,hitPoint.y,rota,{
            type:'atk',
            isFollow:true,
            owner:this,
            hurt:100,
            len:1000
        })
    }
}
class S15 extends SBase{
    constructor() {
        super();
    }

    public hurt = 100
    public hurtDis = 100


    public onCreate(){

    }

    public onUse(){
        PKCodeUI.getInstance().addBomb(PKC.playerData,this.hurt,this.hurtDis)
    }
}
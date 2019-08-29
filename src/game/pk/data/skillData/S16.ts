class S16 extends SBase{
    constructor() {
        super();
    }

    public data = {
        id:16,
        hp:300,
        hurtDis:100,
        hurt:50,
    }


    public onCreate(){

    }

    public onUse(){
        this.data.hurt = PKC.playerData.atk;

        PKCodeUI.getInstance().addTrap(this.data)
        return true;
    }
}
class S17 extends SBase{
    constructor() {
        super();
    }

    public data = {
        id:17,
        hp:300,
        hurtDis:100,
        hurt:10,
    }


    public onCreate(){

    }

    public onUse(){
        PKCodeUI.getInstance().addTrap(this.data)
    }
}
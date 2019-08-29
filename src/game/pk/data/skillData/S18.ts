class S18 extends SBase{
    constructor() {
        super();
    }

    public data = {
        id:18,
        hp:300,
        hurtDis:100,
        hurt:10,
        step:30*5
    }


    public onCreate(){

    }

    public onUse(){
        PKCodeUI.getInstance().addTrap(this.data)
        return true;
    }
}
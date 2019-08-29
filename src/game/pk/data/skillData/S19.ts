class S19 extends SBase{
    constructor() {
        super();
    }

    public data = {
        id:19,
        hp:300,
        hurtDis:100,
        hurt:10,
    }


    public onCreate(){

    }

    public onUse(){
        PKCodeUI.getInstance().addTrap(this.data)
        return true;
    }
}
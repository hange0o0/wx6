class S41 extends SBase{
    constructor() {
        super();
    }

    public addHp = 200
    public hitBack = 200

    public onCreate(){
        this.addHp = this.getValue(1)
    }
    public onStep(){
        if(PKC.actionStep%30 == 0)
        {
            PKC.playerData.addHp(this.addHp)
        }
    }
}
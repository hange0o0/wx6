class S21 extends SBase{
    constructor() {
        super();
    }

    public totalTime = 100

    public onCreate(){
    }

    public onUse(){
        PKC.playerData.wudiStep = this.totalTime
        return true;
    }


}
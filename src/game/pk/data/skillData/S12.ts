class S12 extends SBase{
    constructor() {
        super();
    }

    public addHp = 100
    public onCreate(){
        this.addHp = this.getValue(1)
    }

    public onUse(){
        PKC.playerData.addHp(this.addHp)
        AniManager_wx3.getInstance().playInItem(128,PKC.playerData.relateItem,{x:40,y:40})
        return true;
    }
}
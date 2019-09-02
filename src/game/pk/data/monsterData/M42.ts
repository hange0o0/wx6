class M42 extends MBase{
    //红石守卫  攻击范围大
    constructor() {
        super();
    }

    public atkFun(){
        MTool.nearAtkFun(this,()=>{
            PKC.playerData.stopEnd = PKC.actionStep + 10
        })
    }
}
class M41 extends MBase{
    //蓝石守卫  攻击范围大
    constructor() {
        super();
    }

    public atkFun(){
        MTool.nearAtkFun(this,()=>{
            PKC.playerData.stopEnd = PKC.actionStep + 10
        })
    }
}
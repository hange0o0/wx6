class M1 extends MBase{
    constructor() {
        super();
    }

    public atkFun(){
        MTool.markAtkFun(200,5,{
            owner:this,
            hurt:50,
            mv:{
                url:'monster1_mv',
                num:3,
                anX:91/2,
                anY:208*0.8,
            }
        })

    }
}
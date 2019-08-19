class MTool {
    public static getDistance(){

    }

    public static nearAtkFun(itemData){
        PKMonsterAction_wx3.getInstance().addList({
            target:itemData,
            onlyID:itemData.onlyID,
            step:PKTool.getStepByTime(itemData.getVO().mv_atk),
            fun:()=>{
                if(MyTool.getDis(itemData,PKC.playerData) <= itemData.atkDis)
                {
                    PKC.playerData.addHp(-itemData.atk);
                }
            }
        })
    }
}
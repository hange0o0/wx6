class PKManager {
    private static instance:PKManager;

    public static getInstance():PKManager {
        if (!this.instance)
            this.instance = new PKManager();
        return this.instance;
    }

    public maxEnergy = 30;
    public energyCD = 30*60;

    public energy = 1;
    public lastEnergyTime = 1;

    public lastChooseData

    public playerLevel = 1
    public atkAdd = 10
    public hpAdd = 100
    public initData(data) {
        var energyData = data.energy;
        this.energy = energyData.v;
        this.lastEnergyTime = energyData.t;
        this.lastChooseData = data.choose || [];
        this.playerLevel = data.playerLevel || 1;
    }

    public getSave(){
        return {
            energy:{v:this.energy,t:this.lastEnergyTime},
            choose:this.lastChooseData,
            playerLevel:this.playerLevel,
        }
    }

    public getPlayerValue(){
        var atk = 50 + this.playerLevel*this.atkAdd
        var hp = 500 + this.playerLevel*this.hpAdd
        if(UM_wx4.addForceEnd > TM_wx4.now())
        {
            atk = Math.ceil(atk*1.2);
            hp = Math.ceil(hp*1.2)
        }
        return {
            atk:atk,
            hp:hp
        }
    }

    public resetEnergy(){
        var num = Math.floor((TM_wx4.now() - this.lastEnergyTime)/this.energyCD)
        if(num)
        {
            this.energy += num;
            if(this.energy > this.maxEnergy)
                this.energy = this.maxEnergy;
            this.lastEnergyTime += num*this.energyCD;
        }
    }

    public getEnergy(){
        this.resetEnergy();
        return this.energy
    }

    public addEnergy(v){
        this.resetEnergy();
        this.energy += v;
    }

    public getEnergyCost(){
        return Math.min(Math.ceil(UM_wx4.level/5),8)
    }

    public startGame(){
        this.addEnergy(-this.getEnergy())
        this.lastChooseData = [];
        var mySkill = SkillManager.getInstance().mySkill.concat();
        if(mySkill.length > 12)
        {
            ArrayUtil_wx4.random(mySkill,3);
            mySkill.length = 12;
        }

        for(var i=0;i<mySkill.length;i++)
        {
            this.lastChooseData.push(mySkill[i].id)
        }

    }

    public endGame(result){
        var SM = SkillManager.getInstance();
        for(var s in result.skill)
        {
            SM.addSkill(s,result.skill[s])
        }
        this.lastChooseData = null;

        UM_wx4.addCoin(result.coin)//save
    }

    public getWinResult(){
        var skillArr = SkillManager.getInstance().getNewSkill(5 + UM_wx4.level)
        var coin = 50 + Math.floor(Math.pow(UM_wx4.level,1.5))*50
        return {
            skill:skillArr,
            coin:coin
        }
    }

    public getFailResult(rate){
        var skillArr = SkillManager.getInstance().getNewSkill(Math.ceil(UM_wx4.level*0.5*rate))
        var coin = Math.ceil(Math.pow(UM_wx4.level,1.5)*rate*20)
        return {
            skill:skillArr,
            coin:coin
        }
    }

    public sendKey
    public sendKeyName
    public sendGameStart(key){
        var wx = window['wx']
        if(!wx)
            return;
        this.sendKey = key
        this.sendKeyName = key == 9999?'无尽':'第'+key+'关'
        wx.aldStage.onStart({
            stageId : this.sendKey, //关卡ID， 必须是1 || 2 || 1.1 || 12.2 格式  该字段必传
            stageName : this.sendKeyName,//关卡名称，该字段必传
            userId  : UM_wx4.gameid//用户ID
        })
    }

    public sendGameReborn(type){
        var wx = window['wx']
        if(!wx)
            return;
        wx.aldStage.onRunning({
            stageId : this.sendKey,    //关卡ID 该字段必传
            stageName : this.sendKeyName, //关卡名称  该字段必传
            userId : UM_wx4.gameid,//用户ID
            event : "revive",  //支付成功 关卡进行中，用户触发的操作    该字段必传
            params : {    //参数
                itemName : type || 'unknow',  //购买商品名称  该字段必传
            }
        })
    }

    public sendGameEnd(isSuccess,info?){
        var wx = window['wx']
        if(!wx)
            return;
        wx.aldStage.onEnd({
            stageId : this.sendKey,    //关卡ID 该字段必传
            stageName : this.sendKeyName, //关卡名称  该字段必传
            userId : UM_wx4.gameid,  //用户ID 可选
            event : isSuccess?"complete":"fail",   //关卡完成  关卡进行中，用户触发的操作    该字段必传
            params : {
                desc :info  || 'unknow'  //描述
            }
        })
    }
}
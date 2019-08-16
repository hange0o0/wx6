class GunManager extends egret.EventDispatcher {
    private static _instance:GunManager;
    public static getInstance() {
        if (!this._instance) this._instance = new GunManager();
        return this._instance;
    }

    public maxGunNum = 9
    public maxGunLevel = 8

    public disableGun = {}//已合成的枪

    public initData(){
        var list = this.getMakeGuns();
        for(var i=0;i<list.length;i++)
        {
            var gunid = list[i];
            var gun1 = Math.floor(gunid/100)
            var gun2 = gunid%100;
            this.disableGun[gun1] = gunid;
            this.disableGun[gun2] = gunid;
        }
    }

    public getGunVOs(id){
        var typeObj = {};
        //if(id < 100)
        //{
        //    var vo = GunVO.getObject(id)
        //    typeObj[vo.type] = vo;
        //}
        //else
        //{
        //     var vos = this.getVOs(id);
        //    typeObj[vos.vo1.type] = vos.vo1;
        //    typeObj[vos.vo2.type] = vos.vo2;
        //}
        return typeObj
    }

    public getMakeGuns(){
        var list = []
        for(var s in UM_wx4.gunLevel)
        {
            if(parseInt(s) > 100)
                list.push(parseInt(s));
        }
        return list;
    }
    public getNormalGuns(){
        var list = ObjectUtil_wx4.objToArray(GunVO.data);
        for(var i=0;i<list.length;i++)
        {
            var id = list[i].id;
            if(GunManager.getInstance().disableGun[id])
            {
                list.splice(i,1);
                i--;
            }
            else
            {
                list[i] = id;
            }
        }
        return list;
    }

    public getGunByPos(index){
        return UM_wx4.gunPos[index];
    }

    public getPosByGun(gunid){
        for(var s in UM_wx4.gunPos)
        {
            if(UM_wx4.gunPos[s] == gunid)
                return parseInt(s);
        }
        return 0
    }

    public addGun(gunid,pos){
        var lastPos = this.getPosByGun(gunid);
        if(lastPos)
            UM_wx4.gunPos[lastPos] = UM_wx4.gunPos[pos];
        this.removeGun(gunid);
        UM_wx4.gunPos[pos] = gunid;
        EM_wx4.dispatch(GameEvent.client.GUN_CHANGE)
        UM_wx4.needUpUser = true;
    }

    public removeGun(gunid){
       var pos = this.getPosByGun(gunid);
        if(pos)
        {
            UM_wx4.gunPos[pos] = 0;
            EM_wx4.dispatch(GameEvent.client.GUN_CHANGE)
            UM_wx4.needUpUser = true;
        }
    }

    public makeGun(gunid){
        var gun1 = Math.floor(gunid/100)
        var gun2 = gunid%100;
        this.removeGun(gun1)
        this.removeGun(gun2)

        this.levelUpGun(gunid)
        var index = UM_wx4.makeList.indexOf(gunid);
        UM_wx4.makeList.splice(index,1);
        EM_wx4.dispatch(GameEvent.client.MAKE_CHANGE)
    }

    public splitGun(gunid){
        this.removeGun(gunid)
        var gun1 = Math.floor(gunid/100)
        var gun2 = gunid%100;
        delete this.disableGun[gun1]
        delete this.disableGun[gun2]
        delete UM_wx4.gunLevel[gunid]
        EM_wx4.dispatch(GameEvent.client.GUN_UNLOCK)
        MyWindow.ShowTips('获得武器：'+MyTool.createHtml(GunVO.getObject(gun1).name,0xA4E1FC),1000)
        MyWindow.ShowTips('获得武器：'+MyTool.createHtml(GunVO.getObject(gun2).name,0xA4E1FC),1000)
    }

    public getGunLevel(gunid){
         return UM_wx4.gunLevel[gunid] || (GunVO.getObject(gunid) && GunVO.getObject(gunid).open == 0?1:0);
    }

    public getGunCost(gunid,level = -1){
        if(level == -1)
            level = this.getGunLevel(gunid);
        if(gunid < 100)
        {
            var vo = GunVO.getObject(gunid);
            return Math.floor(Math.pow(level+2.3,1.8 + (vo.open/100))*(vo.open*0.8+3)*5/10)*10
        }
        return Math.floor(Math.pow(level+2.7565,3.2)*(100*0.8+3)*5/10)*10
    }

    //解锁位置花费
    public getPosCost(){
        var pos = UM_wx4.gunPosNum + 1;
        return 600*Math.floor(Math.pow(pos-3,3))
    }

    public unlockPos(){
        UM_wx4.addCoin(-this.getPosCost())
        UM_wx4.gunPosNum ++;
        EM_wx4.dispatch(GameEvent.client.GUN_CHANGE)
        SoundManager.getInstance().playEffect('upgrade')
        UM_wx4.needUpUser = true;
    }

    public levelUpGun(gunid){
        UM_wx4.addCoin(-this.getGunCost(gunid))
        var isNew = !this.getGunLevel(gunid);;
        UM_wx4.gunLevel[gunid] = this.getGunLevel(gunid) + 1;
        if(isNew)
            EM_wx4.dispatch(GameEvent.client.GUN_UNLOCK)
        else
            EM_wx4.dispatch(GameEvent.client.GUN_CHANGE)
        SoundManager.getInstance().playEffect('buy')
        UM_wx4.needUpUser = true;
    }

    public getUnlockGun(){
        for(var s in GunVO.data)
        {
            if(GunVO.data[s].open < UM_wx4.level && !this.getGunLevel(s))
            {
                return s;
            }
        }
        return false;
    }

    public getMyGunList(){
        var arr = this.getMakeGuns();
        for(var s in GunVO.data)
        {
            if(!this.disableGun[s] && this.getGunLevel(s))
            {
                arr.push(GunVO.data[s].id)
            }
        }
        return arr;
    }

    public getVOs(gunid){
        if(gunid < 100)
            return {vo1:GunVO.getObject(gunid),vo2:null}
        var gun1 = Math.floor(gunid/100)
        var gun2 = gunid%100;
        return {
            vo1: GunVO.getObject(gun1),
            vo2: GunVO.getObject(gun2),
        }
    }


    public getGunName(gunid){
        if(gunid < 100)
            return GunVO.getObject(gunid).name
        var gun2 = gunid%100;
        return GunVO.getObject(gun2).name + '·改'
    }

    public getGunTitle(gunid){
        //if(gunid < 100)
        //    return GunVO.getObject(gunid).getTitle()
        //var gun1 = Math.floor(gunid/100)
        //var gun2 = gunid%100;
        //var vo1 = GunVO.getObject(gun1)
        //var vo2 = GunVO.getObject(gun2)
        //return vo1.getTitle()  + '·' + vo2.getTitle();
    }

    public getGunBaseAtk(gunid){
        //if(gunid < 100)
        //    return GunVO.getObject(gunid).atk
        //var gun1 = Math.floor(gunid/100)
        //var gun2 = gunid%100;
        //var vo1 = GunVO.getObject(gun1)
        //var vo2 = GunVO.getObject(gun2)
        //return Math.round(2000*Math.pow(this.getGunSpeed(gunid)*1000/500,1.5)*vo1.atkrate*vo2.atkrate);
    }

    public getGunAtk(gunid,lv?){
        //lv = lv || this.getGunLevel(gunid) || 1;
        //return Math.floor(this.getGunBaseAtk(gunid) *(1 + (lv-1)*0.3))
    }
    public getGunSpeed(gunid){
        //if(gunid < 100)
        //    return GunVO.getObject(gunid).speed
        //
        //var gun1 = Math.floor(gunid/100)
        //var gun2 = gunid%100;
        //return  (GunVO.getObject(gun1).speed + GunVO.getObject(gun2).speed)/2
    }
}
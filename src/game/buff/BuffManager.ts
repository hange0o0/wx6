class BuffManager {
    private static _instance:BuffManager;
    public static getInstance():BuffManager {
        if (!this._instance)
            this._instance = new BuffManager();
        return this._instance;
    }

    public buffHp = 200
    public buffWork = 25

    public getUserNum(){
        return Math.min(20,UM_wx4.shareUser.length)
    }

    public getHpAdd(){
        return this.getUserNum()*this.buffHp
    }

    public getCoinAdd(){
        return this.getUserNum()*this.buffWork
    }


}
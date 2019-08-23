class SkillManager extends egret.EventDispatcher {
    private static _instance:SkillManager;

    public static getInstance() {
        if (!this._instance) this._instance = new SkillManager();
        return this._instance;
    }

    public maxGunNum = 9
    public maxGunLevel = 8

    public disableGun = {}//已合成的枪

    public initData() {

    }
}
class SkillUnlockUI extends game.BaseWindow_wx4 {

    private static _instance: SkillUnlockUI;
    public static getInstance(): SkillUnlockUI {
        if(!this._instance)
            this._instance = new SkillUnlockUI();
        return this._instance;
    }

    private refreshBtn: eui.Button;
    private inviteBtn: eui.Button;



    public data;
    public constructor() {
        super();
        this.skinName = "SkillUnlockUISkin";
        this.canBGClose = false
    }

    public childrenCreated() {
        super.childrenCreated();
        this.setTitle('问题与建议')

    }

    public show(){
        super.show()
    }

    public hide() {
        super.hide();
    }

    public onShow(){
    }

}
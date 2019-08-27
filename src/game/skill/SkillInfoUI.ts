class SkillInfoUI extends game.BaseWindow_wx4 {

    private static _instance: SkillInfoUI;
    public static getInstance(): SkillInfoUI {
        if(!this._instance)
            this._instance = new SkillInfoUI();
        return this._instance;
    }

    private atkText: eui.Label;
    private rateText: eui.Label;
    private closeBtn: eui.Button;


    public data;
    public constructor() {
        super();
        this.skinName = "SkillInfoUISkin";
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
class SkillChooseUI extends game.BaseWindow_wx4 {

    private static _instance: SkillChooseUI;
    public static getInstance(): SkillChooseUI {
        if(!this._instance)
            this._instance = new SkillChooseUI();
        return this._instance;
    }

    private list2: eui.List;
    private list1: eui.List;
    private refreshBtn: eui.Button;
    private startBtn: eui.Button;

    public data;
    public constructor() {
        super();
        this.skinName = "SkillChooseUISkin";
        this.canBGClose = false
    }

    public childrenCreated() {
        super.childrenCreated();
        this.setTitle('问题与建议')
        this.addBtnEvent(this.refreshBtn,()=>{

        })
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
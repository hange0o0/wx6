class MonsterItem extends game.BaseItem{
    private static pool = [];
    public static createItem():MonsterItem{
        var item:MonsterItem = this.pool.pop();
        if(!item)
        {
            item = new MonsterItem();
        }
        return item;
    }
    public static freeItem(item){
        if(!item)
            return;
        item.remove();
        if(this.pool.indexOf(item) == -1)
            this.pool.push(item);
    }


    public constructor() {
        super();
        this.skinName = "MonsterItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
        this.anchorOffsetX = 50
        this.anchorOffsetY = 50
    }

    public dataChanged():void {

    }

    public remove():void {
        MyTool.removeMC(this);
    }


}
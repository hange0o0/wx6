class MonsterVO {
    public static dataKey = 'monster';
    public static key = 'id';
    public static getObject(id): MonsterVO{ //id有可能带\n or \r
        return CM_wx4.table[this.dataKey][Math.floor(id)];
    }
    public static get data(){
        return CM_wx4.table[this.dataKey]
    }


    public width: number;
    public height: number;
    public atk: number;
    public headoff: number;
    public heightoff: number;
    public atkcd: number;
    public atkrage: number;
    public level: number;
    public mcheight: number;
    public mcnum: number;
    public name: string;
    public speed: number;
    public hp: number;
    public def: number;//对刀的攻击力
    public id: number;
    public mcwidth: number;
    public mv_atk: number;
    public atkx: number;
    public atky: number;
    public mvid: number;
    public diesound: number;

    public constructor() {

    }

    public reInit(){
        this.atkcd = this.atkcd * 1000
        this.mv_atk = this.mv_atk * 1000
    }

    public getAtkDis(){
        return this.width/2 + this.atkrage
    }

    public isHero(){
        return this.id > 100;
    }

    public playDieSound(){
        if(this.id == 99)
            SoundManager.getInstance().playEffect('die')
        else if(this.isHero())
            SoundManager.getInstance().playEffect('enemy_dead4')
        else
            SoundManager.getInstance().playEffect('enemy_dead' + this.diesound)
    }

}
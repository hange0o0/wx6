class SkillVO {
    public static dataKey = 'skill';
    public static key = 'id';
    public static getObject(id): GunVO{ //id有可能带\n or \r
        return CM_wx4.table[this.dataKey][Math.floor(id)];
    }
    public static get data(){
        return CM_wx4.table[this.dataKey]
    }


    public id: number;
    public name: string;
    public level: number;
    public atk: number;
    public atkspeed: number;
    public atkdis: number;
    public atkback: number;
    public doublerate: number;
    public doublevalue: number;
    public missvalue: number;
    public anx: number;
    public any: number;



    public constructor() {

    }

    public reInit(){

    }

    public getThumb(){
        return 'thum_'+this.id+'_png'
    }

    public getUrl(){
        return 'knife_'+this.id+'_png'
    }


}